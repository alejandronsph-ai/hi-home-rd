import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
const source = process.argv[2];
if (!source) throw Error("Pass the 8-second, 24fps source video");
const out = path.resolve("public/frames-smooth");
await mkdir(out, { recursive: true });
if ((await readdir(out)).length) throw Error("Output directory must be empty");
const temp = await mkdtemp(path.join(tmpdir(), "hihome-smooth-"));
const run = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(Error(`ffmpeg exited ${code}`)),
    );
  });
try {
  // Overlap gives optical flow context on both sides of every one-second boundary.
  await Promise.all(
    Array.from({ length: 8 }, async (_, segment) => {
      const dir = path.join(temp, String(segment));
      await mkdir(dir);
      const offset = segment === 0 ? 0 : 0.25;
      await run([
        "-hide_banner",
        "-loglevel",
        "error",
        "-threads",
        "1",
        "-ss",
        String(segment - offset),
        "-t",
        "1.5",
        "-i",
        path.resolve(source),
        "-an",
        "-filter_threads",
        "1",
        "-vf",
        `tpad=stop_mode=clone:stop_duration=0.15,minterpolate=fps=60:mi_mode=mci:mc_mode=obmc:me_mode=bidir:me=epzs:search_param=8,trim=start=${offset}:duration=1,setpts=PTS-STARTPTS`,
        "-frames:v",
        "60",
        path.join(dir, "%05d.png"),
      ]);
      const names = (await readdir(dir))
        .filter((x) => x.endsWith(".png"))
        .sort();
      if (names.length !== 60)
        throw Error(`Segment ${segment}: ${names.length} frames`);
      for (let i = 0; i < names.length; i++)
        await sharp(path.join(dir, names[i]))
          .webp({ quality: 90, effort: 4 })
          .toFile(
            path.join(
              out,
              String(segment * 60 + i + 1).padStart(5, "0") + ".webp",
            ),
          );
      console.log(`Segment ${segment + 1}/8 ready`);
    }),
  );
  const frames = Array.from(
    { length: 480 },
    (_, i) => `/frames-smooth/${String(i + 1).padStart(5, "0")}.webp`,
  );
  await writeFile(
    path.join(out, "manifest.json"),
    JSON.stringify(
      {
        fps: 60,
        interpolated: true,
        sourceFps: 24,
        width: 1920,
        height: 1080,
        frames,
      },
      null,
      2,
    ),
  );
  console.log("480 Full HD motion-interpolated frames ready.");
} finally {
  await rm(temp, { recursive: true, force: true });
}
