// Voidchrome — chrome surfboard hero (React + R3F).
//
// Loads /silver_surfer.glb (pruned/board-only, ~37 KB after build-time strip)
// and renders ONLY the `board_low` sub-tree. The original `ss_board` material
// (textures) is discarded; we override with a pure chrome PBR material lit
// by a studio environment map so the void and the overhead key light show as
// real specular reflections.
//
// Source asset: 24.7 MB silver_surfer.glb (Sketchfab, CC-BY-4.0 by
// "alexlashko"). The build step at site/scripts/build-surfboard-glb.mjs
// strips everything except the board geometry; the chrome treatment is
// applied here.
//
// TODO(brand-launch): if a custom-modeled original board is produced, swap
// the asset path. See /credits for the provenance decision.

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Stars } from "@react-three/drei";
import * as THREE from "three";

const ASSET_URL = "/silver_surfer.glb";

useGLTF.preload(ASSET_URL);

// Shared window-level pointer ref — normalized -1..1, updated by a single
// window pointermove listener mounted on first use. Reading window events
// means the board tracks the cursor even when it's over the headline text,
// which sits on top of the canvas in the DOM.
const windowPointer = { x: 0, y: 0 };
let pointerListenerBound = false;
function ensureWindowPointer() {
  if (pointerListenerBound || typeof window === "undefined") return;
  pointerListenerBound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      windowPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      windowPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

function Board({ isMobile, reduced }: { isMobile: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    ensureWindowPointer();
  }, []);

  const { scene } = useGLTF(ASSET_URL) as unknown as { scene: THREE.Group };

  // Single chrome material — overrides whatever shipped in the GLB.
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8cad0"),
        metalness: 1,
        roughness: 0.12,
        envMapIntensity: 1.5,
      }),
    [],
  );

  // Traverse the loaded scene and grab the first Mesh. The asset has many
  // wrapper nodes (Sketchfab_model > ... > board_low > board_low_ss_board_0);
  // walking the tree avoids brittle name lookups. Build-time prune leaves
  // exactly one mesh in the file. Re-center the geometry so rotation
  // pivots around the board's middle rather than a Sketchfab origin.
  const boardMesh = useMemo(() => {
    let found: THREE.Mesh | null = null;
    scene.traverse((obj) => {
      if (!found && (obj as THREE.Mesh).isMesh) {
        found = obj as THREE.Mesh;
      }
    });
    if (!found) return null;
    const src: THREE.Mesh = found;
    const geom = src.geometry.clone();
    geom.computeBoundingBox();
    const bbox = geom.boundingBox!;
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    geom.translate(-center.x, -center.y, -center.z);
    const clone = new THREE.Mesh(geom, chromeMaterial);
    clone.castShadow = true;
    clone.receiveShadow = false;
    return clone;
  }, [scene, chromeMaterial]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    if (reduced) {
      // Frozen beauty angle — strong forward tilt + slight Y so the top
      // face dominates; never an edge-on horizontal line.
      group.current.rotation.set(-0.85, 0.55, 0.22);
      return;
    }

    if (!isMobile) {
      target.current.x = THREE.MathUtils.lerp(
        target.current.x,
        windowPointer.y * 0.25,
        delta * 1.4,
      );
      target.current.y = THREE.MathUtils.lerp(
        target.current.y,
        windowPointer.x * 0.35,
        delta * 1.4,
      );
    } else {
      target.current.x = 0;
      target.current.y = 0;
    }

    // Strong forward X tilt (~-0.85 rad ≈ -49°) so the top face of the
    // board is always presented — it never goes edge-on. Y is a slow sway
    // around a fixed offset instead of a continuous rotation, so the board
    // reads as a board, not a propeller. Z wobble adds subtle character.
    group.current.rotation.x = -0.85 + target.current.x * 0.6;
    group.current.rotation.y =
      0.55 + Math.sin(t * 0.28) * 0.32 + target.current.y;
    group.current.rotation.z = 0.22 + Math.sin(t * 0.4) * 0.05;
    group.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  if (!boardMesh) return null;

  return (
    <group ref={group} scale={1.15}>
      <primitive object={boardMesh} />
    </group>
  );
}

export default function SurfboardHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduced.matches);
    };
    sync();
    mqMobile.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);
    return () => {
      mqMobile.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 7.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Dense starfield behind the chrome object — Morphic-style depth */}
        <Stars
          radius={50}
          depth={50}
          count={2400}
          factor={3}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.4}
        />

        {/* Single key light, top-center — the brand's one-light motif */}
        <spotLight
          position={[0, 6, 3]}
          angle={0.6}
          penumbra={1}
          intensity={2.4}
          castShadow
        />
        <ambientLight intensity={0.15} />

        {/* Studio HDRI for real chrome reflections */}
        <Environment preset="studio" environmentIntensity={0.7} />

        <Suspense fallback={null}>
          <Board isMobile={isMobile} reduced={reduced} />
        </Suspense>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.55}
          scale={12}
          blur={2.8}
          far={3.5}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
