export const currencies = ["USD", "EUR", "GBP", "CNY", "JPY"] as const;
export type Currency = (typeof currencies)[number];
// Fixed illustrative rates, intentionally not presented as live FX quotes.
export const indicativeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.9,
  GBP: 0.77,
  CNY: 7.1,
  JPY: 145,
};
export const MIN_INVESTMENT = 500_000;
export const MAX_INVESTMENT = 10_000_000;
export function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === "string" &&
    currencies.some((currency) => currency === value)
  );
}
export function calculateConfotur(value: number) {
  const principal = Math.min(
    MAX_INVESTMENT,
    Math.max(MIN_INVESTMENT, Number.isFinite(value) ? value : MIN_INVESTMENT),
  );
  const transfer = Math.round(principal * 0.03);
  const ipi = Math.round(principal * 0.01 * 15);
  return {
    principal,
    transfer,
    ipi,
    total: transfer + ipi,
    rentalLow: Math.round(principal * 0.12),
    rentalHigh: Math.round(principal * 0.18),
  };
}
export function formatMoney(usd: number, currency: Currency, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(usd * indicativeRates[currency]);
}
export function whatsappUrl(
  message: string,
  phone: "18296383262" | "18492074802" = "18296383262",
) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
export const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/hihomerd/hihomerd";
