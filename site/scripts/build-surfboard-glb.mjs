#!/usr/bin/env node
// Builds a tiny board-only GLB from the source silver_surfer.glb.
// We override the material in the React component with a pure chrome material,
// so we can strip all textures and discard the figure + eyes meshes entirely.
//
// Input:  /Users/alimalik/Downloads/silver_surfer.glb  (24.7 MB)
// Output: site/public/silver_surfer.glb                (target <3 MB; in
//         practice the board alone is ~80 KB of geometry)
//
// Run as part of `pnpm --filter ./site run prepare:assets`.

import { NodeIO } from "@gltf-transform/core";
import { prune, draco } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, mkdirSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(HERE, "..");

const INPUT =
  process.env.SURFBOARD_INPUT ??
  "/Users/alimalik/Downloads/silver_surfer.glb";
const OUTDIR = resolve(SITE_ROOT, "public");
const OUTPUT = resolve(OUTDIR, "silver_surfer.glb");

if (!existsSync(INPUT)) {
  console.error(`source not found: ${INPUT}`);
  console.error(
    "set SURFBOARD_INPUT or place the source GLB at the expected path",
  );
  process.exit(1);
}
mkdirSync(OUTDIR, { recursive: true });

const io = new NodeIO().registerExtensions([]).registerDependencies({
  "draco3d.encoder": await draco3d.createEncoderModule(),
  "draco3d.decoder": await draco3d.createDecoderModule(),
});

const doc = await io.read(INPUT);
const root = doc.getRoot();

// 1. Remove the figure + eyes nodes. Keep ONLY the board sub-tree.
const REMOVE_NAMES = new Set(["silver_surfer_01_pose", "eyes1"]);
for (const node of root.listNodes()) {
  if (REMOVE_NAMES.has(node.getName())) {
    node.dispose();
  }
}

// 2. Strip every material's textures — we override in code.
for (const mat of root.listMaterials()) {
  if (mat.getBaseColorTexture()) mat.setBaseColorTexture(null);
  if (mat.getNormalTexture()) mat.setNormalTexture(null);
  if (mat.getMetallicRoughnessTexture()) mat.setMetallicRoughnessTexture(null);
  if (mat.getEmissiveTexture()) mat.setEmissiveTexture(null);
  if (mat.getOcclusionTexture()) mat.setOcclusionTexture(null);
}

// 3. Prune all unreferenced resources (textures, materials, accessors, etc.)
await doc.transform(prune());

// 4. Compress geometry with Draco. Lossy quantization, big size win.
await doc.transform(
  draco({
    method: "edgebreaker",
    encodeSpeed: 5,
    decodeSpeed: 5,
    quantizePosition: 14,
    quantizeNormal: 10,
    quantizeTexcoord: 12,
    quantizeColor: 8,
    quantizeGeneric: 12,
  }),
);

await io.write(OUTPUT, doc);

const { statSync } = await import("node:fs");
const size = statSync(OUTPUT).size;
console.log(
  `surfboard GLB built: ${OUTPUT} — ${(size / 1024).toFixed(1)} KB`,
);
