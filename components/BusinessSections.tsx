"use client";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { useLocale } from "./LocaleProvider";
import { whatsappUrl } from "@/lib/finance";

export function ServicesSection() {
  const { t } = useLocale();
  const services = [
    { title: t.buy, text: t.buyText, href: "#collection", external: false },
    {
      title: t.sell,
      text: t.sellText,
      href: whatsappUrl(`${t.whatsappMessage} ${t.sell}: ${t.sellText}`),
      external: true,
    },
    {
      title: t.rent,
      text: t.rentText,
      href: "https://hihomerd.com/alquiler/",
      external: true,
    },
    {
      title: t.manage,
      text: t.manageText,
      href: whatsappUrl(`${t.whatsappMessage} ${t.manage}: ${t.manageText}`),
      external: true,
    },
  ];
  return (
    <section
      id="services"
      className="services-section section-shell"
      aria-labelledby="services-title"
    >
      <div className="services-heading">
        <span className="section-kicker">HI HOME RD · {t.services}</span>
        <h2 id="services-title">{t.serviceTitle}</h2>
        <a
          className="text-link owner-access"
          href="https://hihomerd.com/administracion/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.ownerPortal}
          <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <a
            className="service-row"
            key={index}
            href={service.href}
            target={service.external ? "_blank" : undefined}
            rel={service.external ? "noopener noreferrer" : undefined}
          >
            <span className="service-number">0{index + 1}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
            <ArrowUpRight
              className="service-arrow"
              size={27}
              weight="light"
              aria-hidden
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const { t } = useLocale();
  return (
    <section
      id="about"
      className="about-section section-shell"
      aria-labelledby="about-title"
    >
      <span className="section-kicker">{t.about}</span>
      <div className="about-layout">
        <h2 id="about-title">{t.aboutTitle}</h2>
        <div>
          <p>{t.aboutText}</p>
          <a
            className="text-link"
            href="https://hihomerd.com/quienes-somos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.learnMore}
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
      <div className="about-destinations" aria-label="HI HOME RD">
        Punta Cana <span> / </span> Las Terrenas <span> / </span> Santo Domingo
      </div>
    </section>
  );
}

export function BuyerResources() {
  const { t } = useLocale();
  return (
    <section
      id="resources"
      className="resources-section section-shell"
      aria-labelledby="resources-title"
    >
      <span className="section-kicker">HI HOME RD</span>
      <h2 id="resources-title">{t.resources}</h2>
      <div className="resources-layout">
        <article className="fly-buy-panel">
          <span className="resource-index">01 / FLY & BUY</span>
          <h3>{t.flyBuy}</h3>
          <p>{t.flyText}</p>
          <a
            className="button button-primary"
            href="https://hihomerd.com/vuela-y-compra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.learnMore}
            <ArrowUpRight size={20} />
          </a>
        </article>
        <div className="resource-list">
          <article>
            <span className="resource-index">02</span>
            <h3>{t.mortgage}</h3>
            <p>{t.mortgageText}</p>
            <a
              className="text-link"
              href="https://hihomerd.com/prestamos-hipotecarios/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.consult}
              <ArrowUpRight size={20} />
            </a>
          </article>
          <article>
            <span className="resource-index">03 / BLOG</span>
            <h3>{t.journal}</h3>
            <p>{t.journalText}</p>
            <a
              className="text-link"
              href="https://hihomerd.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.learnMore}
              <ArrowRight size={20} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
