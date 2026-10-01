"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  WhatsappLogo,
  List,
  X,
  ArrowLeft,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import {
  ServicesSection,
  AboutSection,
  BuyerResources,
} from "./BusinessSections";
import LanguageCapsule from "./LanguageCapsule";
import CinematicHero from "./CinematicHero";
import CuratedPortfolio from "./CuratedPortfolio";

import { calendlyUrl, whatsappUrl } from "@/lib/finance";
const destinations = ["Punta Cana", "Cap Cana"];
export default function Flagship() {
  const { t } = useLocale();
  const [menu, setMenu] = useState(false);
  const [destination, setDestination] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduced ? 0 : 0.35 },
  };
  const privateMessage = `${t.whatsappMessage} ${destinations[destination]}. ${t.advisory}.`;
  useEffect(() => {
    if (!menu) return;
    navigation.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navigation.current?.contains(event.target) &&
        !menuButton.current?.contains(event.target)
      )
        setMenu(false);
    };
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [menu]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="HI HOME RD">
          <Image
            className="brand-logo"
            src={assetPath("/brand/hi-home-logo-4k.png")}
            alt="HI HOME Real Estate"
            width={3072}
            height={3840}
            sizes="120px"
            quality={90}
          />
        </a>
        <nav
          className={`main-nav ${menu ? "menu-open" : ""}`}
          aria-label={t.collection}
          id="main-navigation"
          ref={navigation}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== menuButton.current
            )
              setMenu(false);
          }}
        >
          <a onClick={() => setMenu(false)} href="#collection">
            {t.collection}
          </a>
          <a onClick={() => setMenu(false)} href="#services">
            {t.services}
          </a>
          <a onClick={() => setMenu(false)} href="#about">
            {t.about}
          </a>
          <a onClick={() => setMenu(false)} href="#resources">
            {t.resources}
          </a>
          <a onClick={() => setMenu(false)} href="#contact">
            {t.contact}
            <ArrowUpRight size={13} />
          </a>
        </nav>
        <button
          ref={menuButton}
          className="mobile-menu icon-button"
          aria-expanded={menu}
          aria-controls="main-navigation"
          aria-label={menu ? t.close : t.collection}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={24} /> : <List size={24} />}
        </button>
      </header>
      <LanguageCapsule />
      <main id="main">
        <CinematicHero />
        <div className="authority-strip">
          <div className="authority-intro">
            HI HOME RD<span>{t.advisory}</span>
          </div>
          <div>
            <strong>
              92<span>+</span>
            </strong>
            <span>{t.sold}</span>
          </div>
          <div>
            <strong>
              98<span>+</span>
            </strong>
            <span>{t.managed}</span>
          </div>
          <div>
            <strong>
              10<span>+</span>
            </strong>
            <span>{t.years}</span>
          </div>
        </div>
        <CuratedPortfolio />
        <ServicesSection />
        <AboutSection />
        <section
          id="investment"
          className="investment-editorial section-shell"
          aria-labelledby="investment-title"
        >
          <span className="section-kicker">HI HOME RD</span>
          <h2 id="investment-title">{t.filmInvestment}</h2>
          <p>{t.investmentEditorial}</p>
          <a
            className="text-link"
            href="https://hihomerd.com/las-oportunidades-de-inversion-inmobiliaria-que-ofrece-republica-dominicana/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.learnMore}
            <ArrowUpRight size={20} />
          </a>
        </section>
        <section
          className="destinations-section section-shell"
          aria-labelledby="destinations-title"
        >
          <div className="destination-photo">
            <Image
              src={assetPath(
                destination === 1
                  ? "/images/cap-cana.webp"
                  : "/images/corales.webp"
              )}
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <div className="destination-photo-shade" />
            <span className="destination-caption">REPÚBLICA DOMINICANA</span>
          </div>
          <div className="destination-content">
            <span className="section-kicker">{t.privateSearch}</span>
            <h2 id="destinations-title">{destinations[destination]}</h2>
            <p>{t.portfolioDescription}</p>
            <div className="destination-navigation">
              <button
                className="round-icon"
                onClick={() =>
                  setDestination(
                    (destination + destinations.length - 1) %
                      destinations.length,
                  )
                }
                aria-label={t.previousDestination}
              >
                <ArrowLeft size={18} />
              </button>
              <span>
                0{destination + 1} <i>/ 0{destinations.length}</i>
              </span>
              <button
                className="round-icon"
                onClick={() =>
                  setDestination((destination + 1) % destinations.length)
                }
                aria-label={t.nextDestination}
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <a
              className="text-link"
              href={whatsappUrl(privateMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.privateSearch}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <BuyerResources />
        <section
          className="contact-section section-shell"
          id="contact"
          aria-labelledby="contact-title"
        >
          <motion.div className="reveal" {...reveal}>
            <span className="section-kicker">
              HI HOME RD · {t.conciergeLabel}
            </span>
            <h2 id="contact-title">
              {t.closingTitle}
              <br />
              <span className="headline-accent">{t.closingAccent}</span>
            </h2>
            <p>{t.closingText}</p>
            <div className="contact-actions">
              <a
                className="button button-primary"
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.book}
                <ArrowUpRight size={18} />
              </a>
              <a
                className="button button-outline"
                href={whatsappUrl(privateMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo size={20} />
                WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <div className="footer-top">
          <a className="wordmark" href="#home" aria-label="HI HOME RD">
            <Image
              className="brand-logo"
              src={assetPath("/brand/hi-home-logo-4k.png")}
              alt="HI HOME Real Estate"
              width={3072}
              height={3840}
              sizes="120px"
              quality={90}
            />
          </a>
          <div className="footer-contacts">
            <a href="mailto:info@hihomerd.com">
              info@hihomerd.com
              <ArrowUpRight size={14} />
            </a>
            <a href={whatsappUrl(privateMessage)}>+1 829 638 3262</a>
            <a href={whatsappUrl(privateMessage, "18492074802")}>
              +1 849 207 4802
            </a>
          </div>
          <p>
            Punta Cana · Cap Cana
            <br />
            Bávaro · Los Corales · Las Terrenas
            <br />
            Santo Domingo · Samaná
          </p>
        </div>
        <nav className="footer-service-nav" aria-label={t.services}>
          <a href="#collection">{t.buy}</a>
          <a href="#services">{t.sell}</a>
          <a
            href="https://hihomerd.com/alquiler/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.rent}
          </a>
          <a
            href="https://hihomerd.com/administracion/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.ownerPortal}
          </a>
          <a href="#investment">{t.resources}</a>
          <a href="mailto:ventas@hihomerd.com">ventas@hihomerd.com</a>
          <a
            href="https://hihomerd.com/politica-privacidad/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.privacy}
          </a>
        </nav>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} HI HOME RD. {t.rights}
          </span>
          <span>{t.advisory}</span>
          <a href="#home">
            HI HOME RD
            <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </>
  );
}
