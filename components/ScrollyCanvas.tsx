"use client";
import { assetPath } from "@/lib/assets";
import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  coverRect,
  frameAtProgress,
  frameWindow,
  validFrames,
} from "@/lib/canvas";
import { useLocale } from "./LocaleProvider";

export interface ScrollyCanvasProps {
  /** Ordered, same-origin or CORS-enabled AVIF/WebP frames. Never generate URLs for missing assets. */
  frames?: readonly string[];
  manifestUrl?: string;
  poster?: string;
  triggerId?: string;
  maxDecodedFrames?: number;
  preload?: boolean;
}
const EMPTY_FRAMES: readonly string[] = [];
function CanvasEngine({
  frames = EMPTY_FRAMES,
  manifestUrl,
  poster = "/images/villa.webp",
  triggerId = "experience",
  maxDecodedFrames = 24,
  preload = false,
}: ScrollyCanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<"loading" | "sequence" | "poster">(
    frames.length || manifestUrl ? "loading" : "poster",
  );
  const { t } = useLocale();
  useEffect(() => {
    const element = canvas.current,
      trigger = document.getElementById(triggerId);
    if (!element || !trigger) return;
    const context = element.getContext("2d", { alpha: false });
    if (!context) {
      setMode("poster");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const controller = new AbortController();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cache = new Map<number, ImageBitmap>();
    const blobs = new Map<number, Blob>();
    const blobRequests = new Map<number, Promise<Blob>>();
    const inFlight = new Map<number, Promise<ImageBitmap | null>>();
    const failed = new Set<number>();
    const cacheLimit = Math.max(
      10,
      Math.min(maxDecodedFrames, window.innerWidth < 700 ? 16 : 32),
    );
    let urls: readonly string[] = [],
      disposed = false,
      raf = 0,
      preferenceRaf = 0,
      loaded = 0,
      lastPainted = -1;
    let previousWanted = 0;
    let direction = 1;
    let sourceWidth = 1920,
      sourceHeight = 1080;
    let width = 1,
      height = 1,
      timeline: gsap.core.Tween | undefined;
    const playhead = { frame: 0 };
    const fetchBlob = (index: number): Promise<Blob> => {
      const cached = blobs.get(index);
      if (cached) return Promise.resolve(cached);
      const pending = blobRequests.get(index);
      if (pending) return pending;
      const request = fetch(assetPath(urls[index]), {
        signal: controller.signal,
        cache: "force-cache",
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(`Frame request failed: ${response.status}`);
          return response.blob();
        })
        .then((blob) => {
          if (!disposed) {
            blobs.set(index, blob);
            loaded = blobs.size;
            setProgress(Math.round((loaded / urls.length) * 100));
          }
          return blob;
        })
        .finally(() => blobRequests.delete(index));
      blobRequests.set(index, request);
      return request;
    };
    const load = (index: number): Promise<ImageBitmap | null> => {
      const cached = cache.get(index);
      if (cached) {
        cache.delete(index);
        cache.set(index, cached);
        return Promise.resolve(cached);
      }
      if (failed.has(index) || !urls[index] || disposed)
        return Promise.resolve(null);
      const pending = inFlight.get(index);
      if (pending) return pending;
      const promise = fetchBlob(index)
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          if (disposed) {
            bitmap.close();
            return null;
          }
          cache.set(index, bitmap);
          if (
            index === 0 &&
            (sourceWidth !== bitmap.width || sourceHeight !== bitmap.height)
          ) {
            sourceWidth = bitmap.width;
            sourceHeight = bitmap.height;
            resize();
          }
          const wanted = Math.round(playhead.frame);
          const keep = new Set(
            frameWindow(wanted, urls.length, cacheLimit, direction),
          );
          while (cache.size > cacheLimit) {
            const candidates = [...cache.keys()].filter(
              (key) => key !== wanted && key !== index && key !== lastPainted,
            );
            const oldest = candidates.sort(
              (a, b) =>
                Number(keep.has(a)) - Number(keep.has(b)) ||
                Math.abs(b - wanted) - Math.abs(a - wanted),
            )[0];
            if (oldest === undefined) break;
            cache.get(oldest)?.close();
            cache.delete(oldest);
          }
          return bitmap;
        })
        .catch(() => {
          if (!disposed) failed.add(index);
          return null;
        })
        .finally(() => {
          inFlight.delete(index);
          schedule();
        });
      inFlight.set(index, promise);
      return promise;
    };
    const paint = (bitmap: ImageBitmap) => {
      if (reduced.matches || disposed) return;
      const rect = coverRect(bitmap.width, bitmap.height, width, height);
      context.drawImage(bitmap, rect.x, rect.y, rect.width, rect.height);
      element.style.opacity = "1";
    };
    const render = () => {
      if (disposed || !urls.length || reduced.matches) return;
      const wanted = frameAtProgress(
        playhead.frame / Math.max(1, urls.length - 1),
        urls.length,
      );
      if (wanted !== previousWanted)
        direction = Math.sign(wanted - previousWanted);
      previousWanted = wanted;
      // If a fast gesture outruns decoding, advance through the closest ready frame.
      // Never freeze waiting for an exact frame or paint backwards during a forward gesture.
      const candidate = cache.has(wanted)
        ? wanted
        : [...cache.keys()]
            .filter(
              (index) =>
                lastPainted < 0 ||
                (direction > 0
                  ? index > lastPainted && index <= wanted
                  : index < lastPainted && index >= wanted),
            )
            .sort((a, b) => Math.abs(a - wanted) - Math.abs(b - wanted))[0];
      const bitmap = candidate === undefined ? undefined : cache.get(candidate);
      if (bitmap && candidate !== undefined && candidate !== lastPainted) {
        paint(bitmap);
        lastPainted = candidate;
        element.dataset.frame = String(candidate);
        const position = candidate / Math.max(1, urls.length - 1);
        trigger.dataset.filmProgress = String(position);
        trigger.dispatchEvent(
          new CustomEvent("hihome:film-progress", { detail: position }),
        );
      }
      // Keep a bounded, directional window ready for both forward and reverse scrolling.
      const priority = frameWindow(wanted, urls.length, cacheLimit, direction);
      for (const index of priority) {
        if (inFlight.size >= 3) break;
        if (
          index >= 0 &&
          index < urls.length &&
          !cache.has(index) &&
          !inFlight.has(index) &&
          !failed.has(index)
        )
          void load(index);
      }
    };
    function schedule() {
      if (raf || disposed) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        render();
      });
    }
    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      // More backing pixels than the source add GPU work, not image detail.
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
        sourceWidth / Math.max(1, width),
        sourceHeight / Math.max(1, height),
      );
      element.width = Math.max(1, Math.round(width * dpr));
      element.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      const previous = cache.get(lastPainted);
      if (previous && !reduced.matches) paint(previous);
      else element.style.opacity = "0";
      lastPainted = -1;
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const bindTimeline = () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      if (reduced.matches) {
        playhead.frame = 0;
        schedule();
        return;
      }
      playhead.frame = 0;
      timeline = gsap.to(playhead, {
        frame: Math.max(0, urls.length - 1),
        ease: "none",
        onUpdate: schedule,
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.22,
          invalidateOnRefresh: true,
        },
      });
    };
    const init = async () => {
      try {
        if (frames.length) {
          if (!validFrames([...frames])) throw new Error("Invalid frame list");
          urls = frames;
        } else if (manifestUrl) {
          const response = await fetch(assetPath(manifestUrl), {
            signal: controller.signal,
          });
          if (!response.ok) throw new Error("Manifest unavailable");
          const data: unknown = await response.json();
          if (
            !data ||
            typeof data !== "object" ||
            !("frames" in data) ||
            !validFrames(data.frames)
          )
            throw new Error("Invalid manifest");
          urls = data.frames;
        }
        if (disposed) return;
        if (!urls.length || reduced.matches) {
          setMode("poster");
          return;
        }
        setMode("loading");
        // Decode the first ten with two workers. Frame zero is painted immediately.
        let next = 0;
        const initialCount = Math.min(10, urls.length);
        await Promise.all(
          Array.from({ length: 2 }, async () => {
            while (next < initialCount && !disposed) {
              const index = next++;
              const bitmap = await load(index);
              if (disposed) return;
              if (bitmap && index === 0 && lastPainted === -1) {
                paint(bitmap);
                lastPainted = index;
              }
            }
          }),
        );
        if (disposed) return;
        if (!cache.size) {
          setMode("poster");
          return;
        }
        setMode(reduced.matches ? "poster" : "sequence");
        bindTimeline();
        schedule();
        // Retain compressed blobs; only a small directional window is decoded.
        next = initialCount;
        await Promise.all(
          Array.from({ length: 3 }, async () => {
            while (next < urls.length && !disposed) {
              const index = next++;
              try {
                await fetchBlob(index);
              } catch {
                if (disposed) return;
              }
            }
          }),
        );
      } catch {
        if (!disposed) setMode("poster");
      }
    };
    void init();
    const layoutObserver = new ResizeObserver(() => {
      timeline?.scrollTrigger?.refresh();
    });
    layoutObserver.observe(trigger);
    const motionChanged = () => {
      if (!urls.length) return;
      if (reduced.matches) {
        setMode("poster");
        element.style.opacity = "0";
      } else {
        setMode("sequence");
        lastPainted = -1;
      }
      cancelAnimationFrame(preferenceRaf);
      preferenceRaf = requestAnimationFrame(() => {
        if (disposed) return;
        bindTimeline();
        timeline?.scrollTrigger?.refresh();
      });
    };
    reduced.addEventListener("change", motionChanged);
    return () => {
      disposed = true;
      controller.abort();
      observer.disconnect();
      layoutObserver.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(preferenceRaf);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      reduced.removeEventListener("change", motionChanged);
      cache.forEach((bitmap) => bitmap.close());
      cache.clear();
      blobs.clear();
    };
  }, [frames, manifestUrl, poster, triggerId, maxDecodedFrames]);
  return (
    <div className="scrolly-canvas" data-mode={mode}>
      <Image
        src={assetPath(poster)}
        preload={preload}
        quality={90}
        alt=""
        fill
        sizes="(max-width: 600px) 180vh, 100vw"
        className="canvas-poster"
        aria-hidden
      />
      <canvas ref={canvas} aria-hidden className="canvas-surface" />
      <div className="canvas-shade" />
      <div className="canvas-status">
        {mode === "poster" ? (
          t.fallback
        ) : progress < 100 ? (
          <>
            <span>{t.loading}</span>
            <progress max={100} value={progress} aria-label={t.loading} />
            <span>{progress}%</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
export default memo(CanvasEngine);
