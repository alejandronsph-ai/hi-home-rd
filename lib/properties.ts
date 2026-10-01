import type { MessageKey } from "./i18n";
export type PropertyStatus =
  | "available"
  | "oceanView"
  | "privateSearch"
  | "approved"
  | "offMarket"
  | "beachfront";
export interface Property {
  id: string;
  name: MessageKey;
  location: "Punta Cana" | "Cap Cana";
  area: string;
  image: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: PropertyStatus;
  source: string;
  type: "villa" | "residence" | "penthouse" | "search";
}
// Public brand listings checked 2026-09-30. Do not infer CONFOTUR or off-market status.
export const properties: readonly Property[] = [
  {
    id: "punta-cana-villa",
    name: "villa",
    location: "Punta Cana",
    area: "Punta Cana · República Dominicana",
    image: "/images/villa.webp",
    price: 1200000,
    bedrooms: 5,
    bathrooms: 5,
    status: "available",
    source:
      "https://hihomerd.com/propiedad/lujosa-propiedad-de-5-habitaciones/",
    type: "villa",
  },
  {
    id: "los-corales",
    name: "oceanHome",
    location: "Punta Cana",
    area: "Los Corales · Bávaro",
    image: "/images/corales.webp",
    price: 620000,
    bedrooms: 3,
    bathrooms: 3,
    status: "oceanView",
    source:
      "https://hihomerd.com/propiedad/impresionantes-vistas-al-mar-en-los-corales-una-oportunidad-unica/",
    type: "residence",
  },
  {
    id: "wave-garden",
    name: "penthouse",
    location: "Cap Cana",
    area: "Cap Cana · Wave Garden",
    image: "/images/penthouse.webp",
    price: 402000,
    bedrooms: 3,
    bathrooms: 3,
    status: "available",
    source:
      "https://hihomerd.com/propiedad/wave-garden-increible-proyecto-penthouse-de-3-dormitorios-cap-cana-punta-cana/",
    type: "penthouse",
  },
];
