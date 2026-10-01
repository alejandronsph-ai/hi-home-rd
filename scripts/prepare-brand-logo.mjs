import sharp from "sharp";
import { resolve } from "node:path";
const source = process.argv[2];
if (!source)
  throw new Error("Pass the restored logo on its solid black matte.");
const { data, info } = await sharp(source)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
// Remove the known black export matte, retaining antialiased edges and flat brand colors.
for (let pixel = 0; pixel < info.width * info.height; pixel++) {
  const [r, g, b] = data.subarray(pixel * 3, pixel * 3 + 3);
  const cyan = g - r > 15;
  const color = cyan ? [92, 225, 230] : [217, 217, 217];
  const intensity = Math.max(r, g, b);
  const alpha =
    intensity < 30
      ? 0
      : Math.min(255, Math.round((intensity / (cyan ? 220 : 210)) * 255));
  rgba.set([...color, alpha], pixel * 4);
}
await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .resize(3072, 3840, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(resolve("public/brand/hi-home-logo-4k.png"));
const metadata = await sharp("public/brand/hi-home-logo-4k.png").metadata();
console.log({
  width: metadata.width,
  height: metadata.height,
  alpha: metadata.hasAlpha,
});
