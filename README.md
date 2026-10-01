# HI HOME RD — propuesta de rediseño

Web de presentación desarrollada con Next.js, React y TypeScript. Incluye un recorrido arquitectónico controlado por scroll, mensajes publicitarios alternados, superficies de cristal, diez idiomas y un catálogo con fotografías y fichas procedentes de la web original de HI HOME RD.

## Desarrollo

```sh
npm ci
npm run dev
```

Para producción: `npm run build` y `npm start`. Comprobaciones: `npm test` y `npm run typecheck`.

## Presentación

- La animación usa 480 imágenes Full HD interpoladas a 60 fps a partir del video aportado para el proyecto. No es una grabación nativa de 60 fps; la fluidez efectiva depende del equipo y la conexión.
- Las imágenes se cargan progresivamente y se decodifica una ventana limitada alrededor del scroll.
- El modo de movimiento reducido muestra una imagen estática y el mensaje completo.
- Español, inglés, francés, italiano, portugués, alemán, ruso, chino, japonés y coreano.
- Precios en otras monedas son conversiones orientativas, no cotizaciones en tiempo real.
- Las fichas descargables son documentos HTML imprimibles.
- La calculadora financiera anterior no se muestra: no se publican las proyecciones sin respaldo.

## Fuentes y documentación

[Contenido y procedencia](docs/content-provenance.md) · [Activos](docs/assets.md) · [Revisión del sitio original](docs/auditoria-hihome.md) · [Verificación de UX](docs/ui-ux-review.md)

Las propiedades, fotografías y marca pertenecen a sus respectivos titulares. Este repositorio contiene una propuesta de rediseño para presentación, no sustituye la web oficial ni acredita disponibilidad comercial actual de las propiedades.

## Configuración

Copiar `.env.example` solo si se necesita cambiar el enlace de Calendly o el manifiesto de fotogramas. Las variables son opcionales; no se requieren credenciales para ejecutar la web.

El proyecto usa una ruta de servidor (`/api/brochure`) y optimización de imágenes de Next.js. Debe alojarse en un servicio compatible con Next.js, como Vercel, para conservar esas funciones.
