# HI HOME RD: revisión del sitio existente

Revisión: 30 de septiembre de 2026. Fuentes: navegación y contenido público de hihomerd.com. No se accedió a cuentas privadas ni se enviaron formularios.

## Hallazgo principal

La primera propuesta local priorizaba una experiencia aspiracional de compra. La web de la empresa tiene un alcance mayor: compradores, vendedores, alquileres, propietarios e inversores internacionales. La mejora debe preservar esas rutas comerciales y hacerlas más fáciles de encontrar.

## Inventario y decisiones

| Sección original       | Observación                                                                                               | Mejora en la versión local                                                                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicio                 | Cabecera con numerosos accesos y formulario emergente que se superpone al contenido.                      | Navegación agrupada y llamadas a la acción voluntarias, sin formulario automático.                                                                                                                      |
| Buscador               | Ubicación, tipo y precio mínimo/máximo.                                                                   | Filtros combinados por ubicación, tipo y presupuesto máximo sobre la selección local; estado vacío, restablecimiento y enlace al catálogo completo. No se presenta como búsqueda de todo el inventario. |
| Propiedades destacadas | Fichas con precios, habitaciones, baños y contacto.                                                       | Colección editorial, precios legibles y fichas descargables. El inventario local sigue siendo una selección de tres publicaciones verificadas.                                                          |
| Ubicaciones populares  | Punta Cana, Santo Domingo, Cap Cana, Bávaro y Samaná.                                                     | Se conservan las ubicaciones ya diseñadas; Santo Domingo y Samaná vuelven a aparecer en la cobertura del pie de página. La página de empresa también menciona Las Terrenas.                             |
| Quiénes somos          | Origen en Punta Cana, misión, valores y expansión a Las Terrenas y Santo Domingo.                         | Resumen propio, visible en inicio, y acceso a la página institucional completa.                                                                                                                         |
| Vende                  | Estudio de mercado, comercialización, selección de compradores, negociación y asesoramiento legal.        | Entrada específica para vendedores y consulta contextual por WhatsApp.                                                                                                                                  |
| Alquiler               | Ruta independiente del catálogo.                                                                          | Acceso visible en servicios y pie de página al catálogo de alquiler original.                                                                                                                           |
| Administración         | La ruta pública muestra inicio de sesión para propietarios.                                               | Separación entre consultar gestión hotelera y entrar al portal existente. No se simula autenticación local.                                                                                             |
| Préstamos hipotecarios | Bancos aliados y formulario con datos personales.                                                         | Introducción clara y enlace al formulario original. No se duplican datos ni se prometen aprobaciones o tipos de interés.                                                                                |
| Vuela y Compra         | Programa de visitas con crédito de viaje y condiciones.                                                   | Bloque propio para compradores internacionales, remitiendo a condiciones y proyectos elegibles. No se presenta el crédito como automático.                                                              |
| Blog                   | Ruta editorial presente; no aparecieron artículos en la vista consultada. Sí existen artículos indexados. | Acceso editorial visible; no se inventan noticias ni fechas.                                                                                                                                            |
| Testimonios            | Encabezado presente en inicio; no se recuperaron citas verificables en la vista examinada.                | Pendiente de contenido verificable; no se fabrican reseñas.                                                                                                                                             |
| Boletín                | Formulario de suscripción existente.                                                                      | No se añade un formulario local sin proveedor conectado. La integración del boletín queda pendiente si se migra el sitio completo.                                                                      |
| Contacto               | WhatsApp, Calendly, info@ y ventas@; dirección general en Bávaro.                                         | Se conserva contacto directo y se recupera ventas@.                                                                                                                                                     |
| Privacidad             | Política enlazada en el aviso de cookies original.                                                        | Acceso a la política publicada desde el pie. Debe revisarse para cualquier despliegue con nuevas integraciones.                                                                                         |

## Fuentes consultadas

- [Inicio](https://hihomerd.com/)
- [Quiénes somos](https://hihomerd.com/quienes-somos/)
- [Vende](https://hihomerd.com/vende/)
- [Administración / portal de propietarios](https://hihomerd.com/administracion/)
- [Préstamos hipotecarios](https://hihomerd.com/prestamos-hipotecarios/)
- [Vuela y Compra](https://hihomerd.com/vuela-y-compra/)
- [Blog](https://hihomerd.com/blog/)

## Alcance técnico

Los cambios están en el prototipo local, no en el sitio público. Se amplía la portada dentro de Next.js, sin cambiar el motor de idiomas, el canvas ni la calculadora. Los servicios disponen de llamadas a la acción reales. Catálogo completo, alquileres, portal, blog, condiciones y financiación siguen enlazados al sitio original. Los filtros locales operan sobre valores base USD y muestran los importes en la moneda elegida con los tipos ilustrativos existentes.

## Siguiente fase de una migración completa

Conectar el inventario real y sus fichas mediante una fuente administrable; trasladar las páginas interiores conservando sus URL o redirecciones; integrar el boletín y los formularios con sus destinos de datos; importar testimonios verificados y activos corporativos aprobados. Esto requiere información del CMS y sus integraciones, ausente en este espacio de trabajo.
