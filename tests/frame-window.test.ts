import assert from "node:assert/strict";
import test from "node:test";
import { frameWindow } from "../lib/canvas";

test("decode window stays bounded and fills at sequence edges in either direction", () => {
  for (const target of [0, 1, 100, 191])
    for (const direction of [-1, 1]) {
      const window = frameWindow(target, 192, 24, direction);
      assert.equal(window[0], target);
      assert.equal(window.length, 24);
      assert.equal(new Set(window).size, 24);
      assert.ok(window.every((index) => index >= 0 && index < 192));
    }
  assert.deepEqual(frameWindow(0, 0, 24, 1), []);
  assert.deepEqual(frameWindow(0, 3, 24, 1), [0, 1, 2]);
});
test("lookahead follows direction while keeping nearby reverse frames", () => {
  const forward = frameWindow(100, 192, 24, 1);
  const backward = frameWindow(100, 192, 24, -1);
  assert.ok(forward.includes(119) && forward.includes(96));
  assert.ok(backward.includes(81) && backward.includes(104));
});
