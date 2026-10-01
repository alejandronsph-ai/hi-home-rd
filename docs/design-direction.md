# Current direction: HI HOME brand and cinematic opening

The video is the subject of a dedicated pinned opening, not a global background hidden behind content. The complete 192-frame sequence plays across 430svh on desktop and 380svh on mobile, with 0.4s scroll damping. Three brief captions enter and leave; intervals between them leave the building unobstructed. A persistent catalogue link allows users to skip the sequence. Reduced-motion users receive a single viewport poster and access to the same catalogue.

The palette is now HI HOME turquoise (#5CE1E6), white, silver and neutral charcoal. The catalogue uses a white surface and a darker turquoise (#007A82) for readable text. Warm green and champagne gold have been removed from UI styles. Syne and Manrope remain, preserving the readable scale from the typography revision.

Reference direction: Apple-style product storytelling, interpreted as a pinned media stage, restrained timed text and separate product information. This is an original implementation using the client's supplied villa footage.

## Earlier typography rationale

The initial proposal set much of the interface at 7–12px and relied on Playfair Display with repeated italic second lines. This revision establishes a more contemporary architectural identity and a readable scale throughout the site.

## Type pairing

**Syne / Manrope.** Syne's broad, distinctive display forms give the headings character; Manrope is reserved for reading and interaction. No simulated italics, no ornamental script, no hairline display weights. Financial figures use Manrope's tabular numerals rather than a third decorative font.

Exploration: [Fontpair catalogue](https://fontpair.co/all), [Syne](https://fontpair.co/fonts/google/syne), [Manrope](https://fontpair.co/fonts/google/manrope). This is a deliberate pairing selected for this project; it is not presented as a Fontpair-endorsed combination.

Both fonts are provided through Next.js's self-hosted Google Fonts integration, with font-display swap. Language-appropriate system fallbacks cover scripts the display face does not contain.

## Readability contract

- Body: 18px desktop, 17px mobile, line-height 1.65–1.7.
- Navigation and buttons: 15–16px, minimum 48px touch area.
- Supporting labels: 13–14px. No 7–10px functional text.
- Property titles: 28–40px. Prices: 24–30px.
- Hero: fluid 52–112px; section headings 36–64px.
- Financial notes: 14px, readable contrast and wrapping.
- Prefer rem-based sizes; 200% text scaling must reflow.

## Composition

A photographic hero with a confident upright headline, quieter supporting elements and a readable concierge panel. An asymmetric property catalogue gives the first villa a large photograph with its information alongside; the next two properties form a spacious pair. The calculator gets generous line spacing, stronger numbers and a clear total. The palette retains the brand's champagne and travertine against a deep tropical charcoal.

## Skill review

Applied: web-typography (scale/pairing/readability), redesign-existing-projects (audit-first changes), frontend-design (brand-specific direction), high-end-visual-design (spacing and interaction polish, where compatible with the brief), ui-ux-pro-max (accessibility/responsive guidance), and existing design-taste-frontend principles.

Reviewed for relevance: claude-design, design-motion-principles, image-to-code, imagegen-frontend-web, gpt-taste, minimalist-ui, industrial-brutalist-ui, stitch-design-taste, brandkit, 10k-web-design and the alternate design-system skills. These are not combined indiscriminately: image creation, deployment, Figma/Stitch imports and incompatible retro/cartoon systems are not needed to correct the existing site's typography. The user's current request for readable, more distinctive type takes priority over skill recipes that prescribe microscopic labels or a different visual identity.
