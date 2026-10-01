import { spawnSync } from "node:child_process";
import {
  mkdir,
  readdir,
  writeFile,
  access,
  mkdtemp,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
const source = process.argv[2];
const fps = Number(process.argv[4] || 24);
if (![24, 60].includes(fps)) throw new Error("Supported export rates: 24, 60");
if (!source)
  throw new Error("Usage: node scripts/prepare-frames.mjs /path/to/video.mp4");
await access(source);
const out = path.resolve(process.argv[3] || "public/frames-hd");
await mkdir(out, { recursive: true });
if ((await readdir(out)).some((name) => /^\d{5}\.webp$/.test(name)))
  throw new Error(
    "Frames already exist; move them to a backup before exporting.",
  );
const temporary = await mkdtemp(path.join(tmpdir(), "hihome-frames-"));
try {
  // PNG decoding works with FFmpeg installations lacking the optional libwebp encoder.
  const result = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      path.resolve(source),
      "-an",
      "-vf",
      fps === 60
        ? "minterpolate=fps=60:mi_mode=mci:mc_mode=obmc:me_mode=bidir:me=hexbs:search_param=16"
        : "fps=24",
      "-frames:v",
      "2000",
      path.join(temporary, "%05d.png"),
    ],
    { stdio: "inherit" },
  );
  if (result.error || result.status !== 0)
    throw result.error || new Error("FFmpeg extraction failed");
  const names = (await readdir(temporary))
    .filter((name) => /^\d{5}\.png$/.test(name))
    .sort();
  if (!names.length) throw new Error("No video frames found");
  let next = 0;
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (next < names.length) {
        const name = names[next++];
        await sharp(path.join(temporary, name))
          .webp({ quality: fps === 60 ? 90 : 94, effort: 5 })
          .toFile(path.join(out, name.replace(".png", ".webp")));
      }
    }),
  );
  const frames = names.map(
    (name) => `/${path.basename(out)}/${name.replace(".png", ".webp")}`,
  );
  await writeFile(
    path.join(out, "manifest.json"),
    JSON.stringify({ fps, interpolated: fps === 60, frames }, null, 2),
  );
  console.log(`Exported ${frames.length} frames to ${out}.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
