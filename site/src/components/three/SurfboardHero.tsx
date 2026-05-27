// Voidchrome — chrome surfboard hero (React + R3F).
//
// PROTOTYPE: the board is generated procedurally (no GLB download). The
// original brief specified a Sketchfab-sourced `silver_surfer.glb`
// (CC-BY-4.0 by "alexlashko"); we shifted to procedural geometry to ship
// without a 24MB asset on the hero. The single-light, slow-tracking, heavy-
// easing motion language is preserved per the brief.
//
// TODO(brand-launch): if a final original board model becomes available,
// swap this Board() body for a useGLTF-loaded mesh. Update /credits if any
// third-party asset is introduced. See mogkit's brand provenance principle.

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function useBoardGeometry() {
  return useMemo(() => {
    const length = 5.2;
    const segs = 120;
    const positions: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];

    const widthAt = (t: number) => {
      const w = Math.sin(Math.PI * t);
      return 0.42 * Math.pow(w, 0.65);
    };
    const thickAt = (t: number) => 0.16 * Math.pow(Math.sin(Math.PI * t), 0.5);
    const rockerAt = (t: number) => 0.55 * Math.pow(t - 0.5, 2);

    const ring = 16;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const x = (t - 0.5) * length;
      const w = widthAt(t);
      const th = thickAt(t);
      const y0 = rockerAt(t);
      for (let j = 0; j < ring; j++) {
        const a = (j / ring) * Math.PI * 2;
        const py = y0 + Math.sin(a) * th;
        const pz = Math.cos(a) * w;
        positions.push(x, py, pz);
        normals.push(0, Math.sin(a), Math.cos(a));
      }
    }
    for (let i = 0; i < segs; i++) {
      for (let j = 0; j < ring; j++) {
        const a = i * ring + j;
        const b = i * ring + ((j + 1) % ring);
        const c = (i + 1) * ring + j;
        const d = (i + 1) * ring + ((j + 1) % ring);
        indices.push(a, c, b, b, c, d);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, []);
}

function Board({ isMobile, reduced }: { isMobile: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useBoardGeometry();
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    if (reduced) {
      // Frozen beauty angle — no motion when prefers-reduced-motion
      group.current.rotation.set(-0.5, 0.7, 0.18);
      return;
    }

    if (!isMobile) {
      // Damped cursor tracking — heavy, weighty easing
      target.current.x = THREE.MathUtils.lerp(
        target.current.x,
        pointer.y * 0.45,
        delta * 1.6,
      );
      target.current.y = THREE.MathUtils.lerp(
        target.current.y,
        pointer.x * 0.6,
        delta * 1.6,
      );
    } else {
      // Mobile: idle rotation only
      target.current.x = 0;
      target.current.y = 0;
    }

    group.current.rotation.x = -0.5 + target.current.x;
    group.current.rotation.y = t * 0.25 + target.current.y;
    group.current.rotation.z = 0.16;
    group.current.position.y = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color={"#c8cad0"}
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.4}
        />
      </mesh>
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
        <spotLight
          position={[0, 6, 3]}
          angle={0.6}
          penumbra={1}
          intensity={2.2}
          castShadow
        />
        <ambientLight intensity={0.15} />
        <Environment preset="studio" environmentIntensity={0.6} />
        <Board isMobile={isMobile} reduced={reduced} />
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.45}
          scale={10}
          blur={2.6}
          far={3}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
