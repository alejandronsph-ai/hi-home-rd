# UI/UX Pro Max review — HI HOME RD

Applied the explicitly requested skill and its design-system search to the existing Next.js site. The generic output suggested minimal hierarchy, generous type and glass. The user's brand direction takes precedence: retain HI HOME turquoise, white and charcoal; glass stays limited to the language control. No React Native migration or new decorative overlays.

Implemented larger language controls and supporting text, 44px control heights, 8px language/currency spacing, safe-area offsets, short landscape support, natural keyboard dismissal for the nonmodal locale flyout, mobile navigation focus/dismissal, translated destination button names, and zero-duration locale transitions for reduced motion.

## Film correction

The supplied original is 1920×1080, 24fps, 8 seconds. Previous assets were 1600×900 WebP at quality 78. The new `/frames-hd` sequence retains 1920×1080 with WebP quality 94; 192 frames total (~44MB compressed). This improves fidelity but increases download size. It does not create 4K source detail or new temporal samples.

Compressed frames are retained once per visit. A bounded directional decode window prepares upcoming frames and four reverse neighbors; decoded memory is capped at 16 frames on narrow screens and 24 by default on larger screens. Canvas painting reads ready bitmaps synchronously. Animation requests are coalesced rather than canceled at every GSAP update, preventing starvation during continuous scrolling. Old async completions never paint stale targets.

The original `/frames` sequence remains available as a fallback asset set. Poster and reduced-motion behavior remain supported. Native 24fps sampling and portrait cropping remain source limitations.

## Verification

- Production build and all eight unit tests passed.
- Browser sweep over the entire pinned region in both directions reached frames 191 and 0 and exceeded 100 displayed frame changes. The initial failing run showed only two changes; coalescing animation requests fixed that regression.
- Checked 1440×900 desktop, 375×812 phone, and 812×375 landscape.
- Phone language controls meet 44px height and the page has no horizontal overflow.
- Reduced-motion reload correctly selects the poster mode.

## Relato y cristal — 1 de octubre

- Una frase dividida en tres fragmentos, sincronizada con el progreso realmente dibujado del canvas.
- Se sustituyen los intervalos vacíos ligados al scroll por un relevo temporal interrumpible de 1,15 s. Las pruebas de avance, retroceso y permanencia al detenerse pasan.
- Paneles de cristal localizados, bordes especulares y superficies translúcidas en navegación, cápsula, tarjetas y secciones. La foto de fondo de estas superficies procede del sitio original.
- La frase completa está disponible en modo de movimiento reducido; se incluye un modo opaco para `prefers-reduced-transparency`.
- Comprobados escritorio 1440×900 y móvil 375×812 sin desbordamiento horizontal.

## Prueba final de fluidez

La secuencia de 480 imágenes interpoladas a 60 fps se validó con dos barridos de scroll de seis segundos (adelante y atrás), a 1440×900, después de la carga. La versión que esperaba el índice exacto mostró 65 cambios de imagen y ocho intervalos superiores a 150 ms. La versión que conserva el bitmap recién decodificado y avanza con el más cercano disponible mostró 409 cambios, mediana de 33 ms y un intervalo superior a 150 ms (la prueba incluye una pausa entre sentidos). Alcanzó exactamente los extremos 479 y 0. Esto demuestra la mejora bajo esta prueba local; no es una garantía de reproducción a 60 fps en todos los equipos.

La compilación de producción y las ocho pruebas unitarias pasaron. Las comprobaciones de relato, permanencia y retroceso se ejecutaron además en navegador; movimiento reducido presenta la frase completa.
