import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateConfotur,
  currencies,
  formatMoney,
  isCurrency,
  whatsappUrl,
} from "../lib/finance";
import { dictionaries, locales, isLocale } from "../lib/i18n";
import { coverRect, frameAtProgress, validFrames } from "../lib/canvas";

test("illustrative tax model covers slider boundaries and rejects invalid principal", () => {
  assert.equal(calculateConfotur(500_000).total, 90_000);
  assert.equal(calculateConfotur(10_000_000).total, 1_800_000);
  assert.equal(calculateConfotur(1_500_000).rentalLow, 180_000);
  assert.equal(calculateConfotur(1_500_000).rentalHigh, 270_000);
  for (const invalid of [NaN, Infinity, -1])
    assert.equal(calculateConfotur(invalid).principal, 500_000);
  assert.equal(calculateConfotur(20_000_000).principal, 10_000_000);
});
test("all locales have the same complete, nonempty dictionary", () => {
  const keys = Object.keys(dictionaries.es).sort();
  for (const locale of locales) {
    assert.deepEqual(Object.keys(dictionaries[locale]).sort(), keys);
    for (const value of Object.values(dictionaries[locale]))
      assert.ok(value.trim().length > 0);
  }
  assert.equal(isLocale("__proto__"), false);
  assert.equal(isLocale("ja"), true);
});
test("currency formatting is finite and currencies are strictly validated", () => {
  for (const currency of currencies)
    for (const locale of locales)
      assert.doesNotMatch(
        formatMoney(1_500_000, currency, locale),
        /NaN|undefined/,
      );
  assert.equal(isCurrency("USD"), true);
  assert.equal(isCurrency("constructor"), false);
});
test("WhatsApp preserves unicode, numbers and property context without URL injection", () => {
  const context = "中文 · Villa & IPI = $270,000\n?next=https://example.com";
  const url = new URL(whatsappUrl(context));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.searchParams.get("text"), context);
  assert.equal([...url.searchParams].length, 1);
  assert.equal(
    new URL(whatsappUrl(context, "18492074802")).pathname,
    "/18492074802",
  );
});
test("canvas covers portrait and landscape viewports without distorting source", () => {
  for (const [tw, th] of [
    [390, 844],
    [1440, 900],
    [2560, 1080],
  ]) {
    const rect = coverRect(1920, 1080, tw, th);
    assert.ok(rect.width >= tw && rect.height >= th);
    assert.ok(Math.abs(rect.width / rect.height - 16 / 9) < 1e-10);
    assert.equal(rect.x * 2 + rect.width, tw);
    assert.equal(rect.y * 2 + rect.height, th);
  }
  assert.equal(frameAtProgress(1, 120), 119);
  assert.equal(frameAtProgress(-1, 120), 0);
  assert.equal(frameAtProgress(2, 120), 119);
});
test("frame manifest rejects unsafe or malformed asset lists", () => {
  assert.equal(
    validFrames(["/frames/0001.webp", "https://cdn.example.com/0002.avif"]),
    true,
  );
  for (const value of [
    [],
    ["//evil.test/1.webp"],
    ["javascript:alert(1)"],
    ["/video.mp4"],
    [null],
    Array(2001).fill("/a.webp"),
  ])
    assert.equal(validFrames(value), false);
});
