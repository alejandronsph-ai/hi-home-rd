# Asset provenance

Created 2026-09-30 with the built-in image_gen tool (not the CLI).

## Architectural hero

Saved application asset: `public/images/hero.webp` (1920px wide, optimized from the generated PNG). This is a concept visualization, not a claim that the depicted villa is an active HI HOME RD listing.

Prompt:

> Use case: photorealistic-natural. Asset type: luxury real estate website full-bleed hero architectural photography. Create a stunning ultra-wide 16:9 photograph of a contemporary beachfront villa in Cap Cana Dominican Republic at warm late afternoon. View from across a tranquil long turquoise infinity swimming pool towards a grand two-story modernist pavilion with pale travertine walls, slim dark bronze frames, glowing floor to ceiling windows, a deep flat overhang. Tall palms on far left and far right, a mature tropical garden. Caribbean ocean visible on far right behind the villa. Warm sand limestone pool deck and sophisticated lounge furniture, no people. Architecture occupies right two thirds, left third has lush dark palm silhouettes and garden with relatively low detail for white text overlay. Quiet Aman-level luxury, shot with architectural tilt shift lens, cinematic desaturated earth tones with rich natural blue-green water, physically plausible professional real estate photograph. Wide landscape 1792x1024 or higher. No text no logo no watermark no montage.

## Brand listing photography

- `villa.webp`: https://hihomerd.com/wp-content/uploads/2025/02/PHOTO-2025-02-23-11-44-294-1024x681.jpg
- `corales.webp`: https://hihomerd.com/wp-content/uploads/2025/02/PHOTO-2025-02-19-20-21-193-1024x671.jpg
- `penthouse.webp`: https://hihomerd.com/wp-content/uploads/2022/12/lJxOtrBQ.jpg
- `cap-cana.webp`: https://hihomerd.com/wp-content/uploads/2022/12/Cap-Cana-1024x1024.jpg

No AI modifications were made to the property photos. Sharp was used only for web format/size optimization.

## User-supplied villa film — 2026-09-30

Source: `/Users/alejandronieves/Downloads/Architectural_villa_tour_in_Cap_20260930140159.mp4`. 1920×1080 H.264, 24 fps, 8 seconds. Extracted 192 frames at 1600×900, WebP quality 78 using Sharp. The original remains untouched. This sequence replaces the generated hero still as the live background. `public/frames/manifest.json` orders the complete sequence; frame 00001 is the poster. Canvas rendering is pinned in the opening section, controlled by its own scroll range with 0.4s damping. The sequence finishes before the catalogue, so content panels never cover the moving scene.

## Smooth scroll derivative — 2026-10-01

`public/frames-smooth/manifest.json`: 480 WebP frames, 1920×1080, motion-compensated interpolation to 60 fps from the user's original 24 fps video. WebP quality 90; approximately 75 MB for the complete sequence. Generated with `scripts/prepare-smooth-frames.mjs`; overlapping source intervals preserve temporal context at the eight processing boundaries. Boundary pixel differences were consistent with adjacent frame differences, and an interpolated interior frame was visually inspected. The original file and 24 fps derivative remain unchanged. This is interpolation, not native 60 fps footage or a 4K upgrade.

The canvas decodes only a small directional window and limits its backing resolution to the source's native detail. Actual displayed frame rate depends on browser, device, download speed and scrolling speed.
