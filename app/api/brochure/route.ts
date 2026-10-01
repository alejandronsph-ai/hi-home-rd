import { NextRequest } from "next/server";
import { properties } from "@/lib/properties";
import { dictionaries, intlLocales, isLocale } from "@/lib/i18n";
import { isCurrency, formatMoney, whatsappUrl } from "@/lib/finance";
function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}
export function GET(request: NextRequest) {
  const property = properties.find(
    (item) => item.id === request.nextUrl.searchParams.get("id"),
  );
  if (!property || property.type === "search")
    return new Response("Property not found", { status: 404 });
  const localeParam = request.nextUrl.searchParams.get("locale"),
    currencyParam = request.nextUrl.searchParams.get("currency");
  const locale = isLocale(localeParam) ? localeParam : "es",
    currency = isCurrency(currencyParam) ? currencyParam : "USD";
  const t = dictionaries[locale];
  const price = property.price
    ? `${formatMoney(property.price, currency, intlLocales[locale])} ${currency}`
    : t.onRequest;
  // Use the configured public origin, never an untrusted Host header in a downloaded document.
  const image = `https://hihomerd.com/wp-content/uploads/${property.id === "wave-garden" ? "2022/12/lJxOtrBQ.jpg" : property.id === "punta-cana-villa" ? "2025/02/PHOTO-2025-02-23-11-44-294-1024x681.jpg" : "2025/02/PHOTO-2025-02-19-20-21-193-1024x671.jpg"}`;
  const html = `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HI HOME RD · ${escape(t[property.name])}</title><style>*{box-sizing:border-box}body{margin:0;background:#ede8df;color:#182022;font:16px/1.7 Georgia,serif}main{max-width:900px;margin:auto;padding:50px}header{border-bottom:1px solid #b6a987;padding-bottom:20px;letter-spacing:4px}img{width:100%;margin:30px 0;max-height:460px;object-fit:cover}h1{font-size:40px;font-weight:400;line-height:1.2}h2{font-size:28px}a{color:#735820}footer{font:12px/1.7 Arial,sans-serif;border-top:1px solid #b6a987;margin-top:35px;padding-top:20px}@media print{main{padding:0}img{max-height:320px}}</style><main><header>HI HOME RD</header><p>${escape(property.area)}</p><h1>${escape(t[property.name])}</h1><img src="${image}" alt="${escape(t[property.name])}"><h2>${escape(price)}</h2><p>${property.bedrooms} ${escape(t.bedrooms)} · ${property.bathrooms} ${escape(t.bathrooms)} · ${escape(t[property.status])}</p><p><a href="${escape(whatsappUrl(`${t.whatsappMessage} ${t[property.name]} (${property.id}).`))}">${escape(t.inquire)} ↗</a></p><p><a href="${escape(property.source)}">${escape(t.sourceListing)} ↗</a></p><footer><p>${escape(t.availabilityNote)}</p><p>${escape(t.fxNote)}</p><p>${escape(t.advisory)}<br>+1 829 638 3262 · info@hihomerd.com</p></footer></main></html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="hi-home-${property.id}-${locale}.html"`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        "default-src 'none'; img-src https://hihomerd.com; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
    },
  });
}
