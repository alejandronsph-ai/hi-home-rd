import type { Property } from "./properties";
import { dictionaries, intlLocales, type Locale } from "./i18n";
import { formatMoney, whatsappUrl, type Currency } from "./finance";
function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}
export function renderBrochure(property: Property, locale: Locale, currency: Currency): string {
  const t = dictionaries[locale];
  const price = property.price
    ? `${formatMoney(property.price, currency, intlLocales[locale])} ${currency}`
    : t.onRequest;
  // Use the configured public origin, never an untrusted Host header in a downloaded document.
  const image = `https://hihomerd.com/wp-content/uploads/${property.id === "wave-garden" ? "2022/12/lJxOtrBQ.jpg" : property.id === "punta-cana-villa" ? "2025/02/PHOTO-2025-02-23-11-44-294-1024x681.jpg" : "2025/02/PHOTO-2025-02-19-20-21-193-1024x671.jpg"}`;
  const html = `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HI HOME RD · ${escape(t[property.name])}</title><style>*{box-sizing:border-box}body{margin:0;background:#ede8df;color:#182022;font:16px/1.7 Georgia,serif}main{max-width:900px;margin:auto;padding:50px}header{border-bottom:1px solid #b6a987;padding-bottom:20px;letter-spacing:4px}img{width:100%;margin:30px 0;max-height:460px;object-fit:cover}h1{font-size:40px;font-weight:400;line-height:1.2}h2{font-size:28px}a{color:#735820}footer{font:12px/1.7 Arial,sans-serif;border-top:1px solid #b6a987;margin-top:35px;padding-top:20px}@media print{main{padding:0}img{max-height:320px}}</style><main><header>HI HOME RD</header><p>${escape(property.area)}</p><h1>${escape(t[property.name])}</h1><img src="${image}" alt="${escape(t[property.name])}"><h2>${escape(price)}</h2><p>${property.bedrooms} ${escape(t.bedrooms)} · ${property.bathrooms} ${escape(t.bathrooms)} · ${escape(t[property.status])}</p><p><a href="${escape(whatsappUrl(`${t.whatsappMessage} ${t[property.name]} (${property.id}).`))}">${escape(t.inquire)} ↗</a></p><p><a href="${escape(property.source)}">${escape(t.sourceListing)} ↗</a></p><footer><p>${escape(t.availabilityNote)}</p><p>${escape(t.fxNote)}</p><p>${escape(t.advisory)}<br>+1 829 638 3262 · info@hihomerd.com</p></footer></main></html>`;
  return html;
}

export function downloadBrochure(property: Property, locale: Locale, currency: Currency) {
  const url = URL.createObjectURL(new Blob([renderBrochure(property, locale, currency)], { type: "text/html;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `hi-home-${property.id}-${locale}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}
