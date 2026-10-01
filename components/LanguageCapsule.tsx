"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  GlobeHemisphereWest,
  CaretDown,
  Check,
  X,
} from "@phosphor-icons/react";
import { locales, localeNames } from "@/lib/i18n";
import { currencies } from "@/lib/finance";
import { useLocale } from "./LocaleProvider";
export default function LanguageCapsule() {
  const { locale, currency, setLocale, setCurrency, t } = useLocale();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLButtonElement>(
      `[data-locale="${locale}"]`,
    );
    first?.focus({ preventScroll: true });
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", keyboard);
    };
  }, [open, locale]);
  return (
    <div
      className="language-capsule"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className={`capsule-trigger ${open ? "is-open" : ""}`}
        ref={trigger}
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="locale-dialog"
        aria-label={`${t.language} / ${t.currency}`}
      >
        <GlobeHemisphereWest size={17} aria-hidden />
        <span>{locale.toUpperCase()}</span>
        <span className="capsule-divider" />
        <span>{currency}</span>
        <CaretDown size={11} aria-hidden className={open ? "rotated" : ""} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="locale-dialog"
            role="dialog"
            aria-label={`${t.language} / ${t.currency}`}
            className="capsule-panel glass"
            data-lenis-prevent
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 28 }
            }
          >
            <div className="panel-heading">
              <span>{t.language}</span>
              <button
                className="icon-button"
                aria-label={t.close}
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus({ preventScroll: true });
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="language-grid">
              {locales.map((code) => (
                <button
                  key={code}
                  data-locale={code}
                  lang={code}
                  aria-pressed={locale === code}
                  onClick={() => setLocale(code)}
                >
                  <span>
                    <small>{code.toUpperCase()}</small>
                    {localeNames[code]}
                  </span>
                  {locale === code && <Check size={14} weight="bold" />}
                </button>
              ))}
            </div>
            <div className="panel-heading currency-heading">{t.currency}</div>
            <div className="currency-grid">
              {currencies.map((code) => (
                <button
                  key={code}
                  aria-pressed={currency === code}
                  onClick={() => setCurrency(code)}
                >
                  <span>
                    {{ USD: "$", EUR: "€", GBP: "£", CNY: "¥", JPY: "¥" }[code]}
                  </span>
                  {code}
                </button>
              ))}
            </div>
            <p className="fx-note">{t.fxNote}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
