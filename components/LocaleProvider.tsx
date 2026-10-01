"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  intlLocales,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { formatMoney, isCurrency, type Currency } from "@/lib/finance";
import { MotionConfig } from "motion/react";
interface LocaleContextValue {
  locale: Locale;
  currency: Currency;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  money: (usd: number) => string;
}
const LocaleContext = createContext<LocaleContextValue | null>(null);
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("es");
  const [currency, updateCurrency] = useState<Currency>("USD");
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("hihome.locale");
      const savedCurrency = localStorage.getItem("hihome.currency");
      if (isLocale(savedLocale)) updateLocale(savedLocale);
      if (isCurrency(savedCurrency)) updateCurrency(savedCurrency);
    } catch {
      /* Storage is optional in private browsing. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale;
  }, [locale]);
  const setLocale = useCallback((next: Locale) => {
    // Avoid native scroll anchoring when translated text changes its line count.
    const x = window.scrollX,
      y = window.scrollY;
    document.documentElement.style.overflowAnchor = "none";
    updateLocale(next);
    try {
      localStorage.setItem("hihome.locale", next);
    } catch {
      /* optional */
    }
    requestAnimationFrame(() => {
      window.scrollTo({ left: x, top: y, behavior: "instant" });
      requestAnimationFrame(() => {
        document.documentElement.style.overflowAnchor = "";
      });
    });
  }, []);
  const setCurrency = useCallback((next: Currency) => {
    updateCurrency(next);
    try {
      localStorage.setItem("hihome.currency", next);
    } catch {
      /* optional */
    }
  }, []);
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      currency,
      t: dictionaries[locale],
      setLocale,
      setCurrency,
      money: (usd) => formatMoney(usd, currency, intlLocales[locale]),
    }),
    [locale, currency, setLocale, setCurrency],
  );
  return (
    <LocaleContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
