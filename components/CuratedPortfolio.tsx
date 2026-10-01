"use client";
import { useState, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Bed,
  Bathtub,
  MapPin,
} from "@phosphor-icons/react";
import { properties, type Property } from "@/lib/properties";
import { whatsappUrl } from "@/lib/finance";
import { useLocale } from "./LocaleProvider";
function PropertyCard({ property }: { property: Property }) {
  const { t, money, locale, currency } = useLocale();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 200, damping: 25 }),
    rotateY = useSpring(y, { stiffness: 200, damping: 25 });
  const reduced = useReducedMotion();
  function tilt(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((0.5 - (event.clientY - rect.top) / rect.height) * 3);
    y.set(((event.clientX - rect.left) / rect.width - 0.5) * 3);
  }
  const message = `${t.whatsappMessage} ${t[property.name]} (${property.id}), ${property.area}. ${property.price ? `${money(property.price)} ${currency}.` : t.onRequest} ${property.source}`;
  return (
    <motion.article
      className="property-card"
      onPointerMove={tilt}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <a
        className="property-image"
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.inquire}: ${t[property.name]}`}
      >
        <Image
          src={property.image}
          alt={t[property.name]}
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
        />
        <span className="property-badge">{t[property.status]}</span>
        <span className="property-arrow">
          <ArrowUpRight size={24} weight="light" />
        </span>
      </a>
      <div className="property-details">
        <div className="property-location">
          <MapPin size={12} />
          {property.area}
        </div>
        <h3>{t[property.name]}</h3>
        <div className="property-specs">
          {property.bedrooms ? (
            <>
              <span>
                <Bed size={16} />
                {property.bedrooms} {t.bedrooms}
              </span>
              <span>
                <Bathtub size={16} />
                {property.bathrooms} {t.bathrooms}
              </span>
            </>
          ) : (
            <span>{t.onRequest}</span>
          )}
        </div>
        <div className="property-bottom">
          <strong>
            {property.price ? (
              <>
                {money(property.price)} <small>{currency}</small>
              </>
            ) : (
              t.privateSearch
            )}
          </strong>
          {property.type !== "search" ? (
            <a
              className="brochure-link"
              href={`/api/brochure?id=${property.id}&locale=${locale}&currency=${currency}`}
              download
              aria-label={`${t.brochure}: ${t[property.name]}`}
            >
              <ArrowDown size={17} />
              <span>{t.brochure}</span>
            </a>
          ) : (
            <a
              className="brochure-link"
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.privateSearch}
            >
              <ArrowUpRight size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
export default function CuratedPortfolio() {
  const { t, money, currency } = useLocale();
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState(0);
  const [filter, setFilter] = useState("all");
  const visible = properties.filter(
    (property) =>
      (filter === "all" || property.location === filter) &&
      (propertyType === "all" || property.type === propertyType) &&
      (!budget || (property.price !== undefined && property.price <= budget)),
  );
  return (
    <section
      className="portfolio-section section-shell"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="section-kicker">
        <span className="small-rule" />
        {t.collection}
      </div>
      <h2 id="collection-title">
        {t.portfolioTitle}
        <br />
        <span className="headline-accent">{t.portfolioAccent}</span>
      </h2>
      <p className="section-intro">{t.portfolioDescription}</p>
      <div className="portfolio-tools">
        <div className="filter-tabs" role="group" aria-label={t.collection}>
          {["all", "Punta Cana", "Cap Cana"].map((value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value === "all" ? t.all : value}
            </button>
          ))}
        </div>
        <span className="collection-count">
          {String(visible.length).padStart(2, "0")}{" "}
          <span>/ {String(properties.length).padStart(2, "0")}</span>
        </span>
      </div>
      <div className="property-filters">
        <label>
          {t.typeLabel}
          <select
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
          >
            <option value="all">{t.all}</option>
            <option value="villa">{t.villaType}</option>
            <option value="residence">{t.apartmentType}</option>
            <option value="penthouse">{t.penthouseType}</option>
          </select>
        </label>
        <label>
          {t.budgetLabel} · {currency}
          <select
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
          >
            <option value={0}>{t.noLimit}</option>
            {[500000, 1000000, 2000000].map((value) => (
              <option key={value} value={value}>
                {money(value)}
              </option>
            ))}
          </select>
        </label>
        <button
          className="reset-filters"
          onClick={() => {
            setFilter("all");
            setPropertyType("all");
            setBudget(0);
          }}
        >
          {t.resetFilters}
        </button>
      </div>
      {visible.length === 0 && (
        <div className="portfolio-empty" role="status">
          <p>{t.noResults}</p>
          <a
            className="text-link"
            href={whatsappUrl(
              `${t.whatsappMessage} ${t.privateSearch}. ${filter === "all" ? t.all : filter}. ${t.typeLabel}: ${propertyType === "all" ? t.all : propertyType}. ${t.budgetLabel}: ${budget ? `${money(budget)} ${currency}` : t.noLimit}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.privateSearch}
            <ArrowUpRight size={20} />
          </a>
        </div>
      )}
      <div className="property-grid" data-count={visible.length}>
        {visible.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <div className="portfolio-end">
        <p className="portfolio-note">{t.availabilityNote}</p>
        <a
          className="text-link"
          href="https://hihomerd.com/propiedades/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.fullCatalogue}
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}
