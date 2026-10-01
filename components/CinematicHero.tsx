"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import ScrollyCanvas from "./ScrollyCanvas";
import { useLocale } from "./LocaleProvider";

export default function CinematicHero() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLocale();
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const captions = node.querySelectorAll<HTMLElement>(".film-caption");
        const progressBar = node.querySelector(".film-progress-fill");
        let active = 0;
        let transition: gsap.core.Timeline | undefined;
        gsap.set(captions, { autoAlpha: 0, y: 0 });
        gsap.set(captions[0], { autoAlpha: 1 });
        const update = (progress: number) => {
          gsap.set(progressBar, { scaleX: progress });
          // Follow displayed frames, never advance the words ahead of an unready image.
          const next = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
          if (next === active) return;
          active = next;
          transition?.kill();
          transition = gsap.timeline();
          // This is wall-clock time: stopping the scroll cannot strand an empty caption.
          transition
            .to(captions, {
              autoAlpha: 0,
              y: -6,
              duration: 0.16,
              ease: "power2.in",
            })
            .set(captions[next], { y: 10 }, 0.85)
            .to(
              captions[next],
              { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
              0.85,
            );
        };
        const onProgress = (event: Event) =>
          update((event as CustomEvent<number>).detail);
        node.addEventListener("hihome:film-progress", onProgress);
        update(Number(node.dataset.filmProgress || 0));
        return () => {
          node.removeEventListener("hihome:film-progress", onProgress);
          transition?.kill();
          gsap.set(captions, { clearProps: "opacity,visibility,transform" });
        };
      },
      root,
    );
    return () => media.revert();
  }, []);
  return (
    <section
      className="cinematic-hero"
      id="home"
      ref={root}
      aria-labelledby="hero-title"
    >
      <div className="film-stage" id="experience">
        <ScrollyCanvas
          manifestUrl={
            process.env.NEXT_PUBLIC_FRAME_MANIFEST ||
            "/frames-smooth/manifest.json"
          }
          poster="/frames-hd/00001.webp"
          triggerId="home"
          preload
        />
        <div className="film-caption film-intro">
          <span className="film-eyebrow">HI HOME RD · CARIBE</span>
          <h1
            id="hero-title"
            aria-label={`${t.storyStart} ${t.storyPlace} ${t.storyEnd}`}
          >
            <span className="film-motion-copy">{t.storyStart}</span>
            <span className="film-reduced-copy">
              {t.storyStart} {t.storyPlace} {t.storyEnd}
            </span>
          </h1>
        </div>
        <div className="film-caption film-interior">
          <span className="film-eyebrow">02 / HI HOME RD</span>
          <h2>{t.storyPlace}</h2>
        </div>
        <div className="film-caption film-horizon">
          <span className="film-eyebrow">03 / HI HOME RD</span>
          <h2>{t.storyEnd}</h2>
          <a className="film-link" href="#collection">
            {t.explore}
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="film-footer">
          <span className="film-scroll">
            <ArrowDown size={16} />
            {t.discover}
          </span>
          <a href="#collection">
            {t.collection}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="film-progress" aria-hidden="true">
          <div className="film-progress-fill" />
        </div>
      </div>
    </section>
  );
}
