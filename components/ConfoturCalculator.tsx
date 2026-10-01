"use client";
import { useState, type CSSProperties } from "react";
import { ArrowUpRight, WhatsappLogo, ShieldCheck } from "@phosphor-icons/react";
import {
  calculateConfotur,
  MIN_INVESTMENT,
  MAX_INVESTMENT,
  whatsappUrl,
} from "@/lib/finance";
import { useLocale } from "./LocaleProvider";
export default function ConfoturCalculator() {
  const [investment, setInvestment] = useState(1_500_000);
  const { t, money, currency, locale } = useLocale();
  const result = calculateConfotur(investment);
  const share = `${t.whatsappMessage} CONFOTUR. ${t.propertyValue}: USD ${result.principal.toLocaleString("en-US")}. ${t.transfer}: USD ${result.transfer.toLocaleString("en-US")}. ${t.ipi}: USD ${result.ipi.toLocaleString("en-US")}. ${t.protected}: USD ${result.total.toLocaleString("en-US")}. ${t.yield}: USD ${result.rentalLow.toLocaleString("en-US")}–${result.rentalHigh.toLocaleString("en-US")}. ${t.illustrative}. ${t.language}: ${locale.toUpperCase()}.`;
  return (
    <section
      className="investment-section section-shell"
      id="investment"
      aria-labelledby="investment-title"
    >
      <div className="investment-copy">
        <div className="section-kicker">
          <span className="small-rule" />
          CONFOTUR · LEY 158-01
        </div>
        <h2 id="investment-title">
          {t.calculatorTitle}
          <br />
          <span className="headline-accent">{t.calculatorAccent}</span>
        </h2>
        <p>{t.calculatorDescription}</p>
        <div className="tax-benefit">
          <ShieldCheck size={29} weight="light" />
          <div>
            <strong>0%</strong>
            <span>
              {t.transfer}
              <br />
              {t.ipi}
            </span>
          </div>
        </div>
      </div>
      <div className="calculator glass">
        <div className="calculator-top">
          <span className="eyebrow">{t.simulator}</span>
          <span className="calculator-currency">{currency}</span>
        </div>
        <label htmlFor="investment-value">{t.propertyValue}</label>
        <output htmlFor="investment-value" className="investment-amount">
          {money(investment)}
        </output>
        <input
          id="investment-value"
          type="range"
          min={MIN_INVESTMENT}
          max={MAX_INVESTMENT}
          step={50_000}
          value={investment}
          onChange={(event) => setInvestment(Number(event.target.value))}
          aria-valuetext={`${money(investment)} ${currency}`}
          style={
            {
              "--range-progress": `${((investment - MIN_INVESTMENT) / (MAX_INVESTMENT - MIN_INVESTMENT)) * 100}%`,
            } as CSSProperties
          }
        />
        <div className="range-limits">
          <span>{money(MIN_INVESTMENT)}</span>
          <span>{money(MAX_INVESTMENT)}</span>
        </div>
        <dl className="calculation-lines">
          <div>
            <dt>
              {t.transfer}
              <small>3%</small>
            </dt>
            <dd>{money(result.transfer)}</dd>
          </div>
          <div>
            <dt>
              {t.ipi}
              <small>1% × 15</small>
            </dt>
            <dd>{money(result.ipi)}</dd>
          </div>
        </dl>
        <div className="protected-total" aria-live="polite" aria-atomic="true">
          <span>{t.protected}</span>
          <strong data-testid="protected-total">{money(result.total)}</strong>
        </div>
        <div className="rental-yield">
          <div>
            <span>{t.yield}</span>
            <strong>
              {money(result.rentalLow)} – {money(result.rentalHigh)}
            </strong>
          </div>
          <small>{t.illustrative}</small>
        </div>
        <a
          className="button button-primary calculator-cta"
          href={whatsappUrl(share)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={20} />
          <span>{t.taxCta}</span>
          <ArrowUpRight size={17} />
        </a>
        <details className="financial-notes">
          <summary>{t.sources}</summary>
          <p>{t.taxNote}</p>
          <p>{t.fxNote}</p>
          <a
            href="https://ayuda.dgii.gov.do/conversations/discusiones/exencin-impuesto-transferencia-inmueble-confotur/672ce2ccde334e46a64b15d5"
            target="_blank"
            rel="noopener noreferrer"
          >
            DGII · CONFOTUR <ArrowUpRight size={12} />
          </a>
        </details>
      </div>
    </section>
  );
}
