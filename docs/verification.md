# Verification — 2026-09-30

## Automated domain checks

Six Node/TypeScript tests pass (`npm test`): calculator boundaries and invalid inputs; dictionary completeness; formatting for every locale and currency; Unicode-safe WhatsApp context; canvas aspect-ratio/scroll indexing; frame manifest validation.

## Browser checks

Executed with the Playwright CLI against local production and development servers:

- Desktop visual inspection at 1440px and mobile inspection at 390px.
- All ten languages at 390px: no horizontal overflow and scroll movement no greater than two pixels during switching.
- All ten languages at 320px: hero actions and concierge panel remain separated.
- Five currency controls update the calculator while preserving its principal.
- Native keyboard End sets the principal to USD 10,000,000, producing USD 1,800,000 illustrative protected wealth; WhatsApp contains the same principal.
- Location filters select one Cap Cana property and restore the full collection.
- English Wave Garden brochure downloads as `hi-home-wave-garden-en.html`.
- Escape dismisses the capsule; keyboard focus wraps inside the flyout; a pointer outside dismisses it.
- Mobile navigation closes after choosing an anchor.
- A temporary 12-frame fixture exercises the actual canvas sequence path. One deliberately missing image tests resilience. The fixture uses repeated stills for engineering checks, not claimed flythrough footage, and is removed from the delivered app.
- Scroll advances to later canvas frames. A locale change preserves the active frame.
- Missing manifest falls back to the architectural still.
- Reduced motion on initial load fetches no sequence frames. Live preference changes hide/resume the canvas, with scroll playback continuing afterward.

Expected 404 errors occurred only for the deliberately missing test manifest/frame and an early favicon request, subsequently resolved by `app/icon.svg`. Temporary playback data is not included in the production build.

Final validation: production build and TypeScript passed; all six tests passed; production dependency audit reported zero vulnerabilities. A fresh production browser load under both reduced-motion and normal preferences produced no console errors or hydration errors.

A reduced-motion hydration mismatch found during development was fixed by keeping initial server/client animation markup identical and applying the static reduced-motion presentation through CSS.

## Limits

The final continuous villa flythrough and production infrastructure are not supplied. Neither a 120fps frame rate nor sub-second LCP is asserted. The preview uses the generated architectural still; the actual sequence path was exercised using test assets. Real property availability, project tax approvals, rental results and live FX rates require external business data.

## Typography revision — 2026-09-30

Production build and TypeScript pass; six existing domain tests pass. Browser checks covered all ten locales at 320, 390, 768, 1280 and 1440px widths, all five currencies at 320px with the maximum investment value, and 200% text scaling at 720px after fonts settled. No horizontal page overflow. Inspected desktop hero, loaded property collection, mobile hero and calculator screenshots. Footer contact grid now reflows with enlarged text.

## Existing-site architecture review — 2026-09-30

Production build and all six domain checks pass. Verified combined type/budget empty state and reset to three cards in the browser; mobile menu navigation reaches the resources section. All ten locales fit at 390px and 1280px; header links do not overlap the logo or capsule at 1280px. Inspected services on desktop and buyer resources on mobile. Full migration limitations and source inventory are recorded in auditoria-hihome.md.

## Cinematic opening and brand correction

Checked desktop frames 0 → 58 → 174 with the stage fixed at viewport top; at frame 58 all captions were hidden. Checked mobile viewport 390px, no horizontal overflow, active frame 136 with all captions hidden. Browser test with reduced-motion emulation confirmed poster mode, a single-screen hero and visible introduction. Production build and six domain tests pass. Brand accents now match HI HOME turquoise; white catalogue is outside the film stage.
