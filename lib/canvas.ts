export function coverRect(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
) {
  const scale = Math.max(
    targetWidth / sourceWidth,
    targetHeight / sourceHeight,
  );
  const width = sourceWidth * scale,
    height = sourceHeight * scale;
  return {
    x: (targetWidth - width) / 2,
    y: (targetHeight - height) / 2,
    width,
    height,
  };
}
export function frameAtProgress(progress: number, count: number) {
  return Math.max(
    0,
    Math.min(
      count - 1,
      Math.round(Math.max(0, Math.min(1, progress)) * (count - 1)),
    ),
  );
}
export function validFrames(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= 2000 &&
    value.every(
      (item) =>
        typeof item === "string" &&
        /^(\/[^/]|https:\/\/)/.test(item) &&
        /\.(webp|avif)(\?.*)?$/i.test(item),
    )
  );
}

/** Target first, then directional lookahead with four reverse frames for quick reversals. */
export function frameWindow(
  target: number,
  count: number,
  limit: number,
  direction: number,
): number[] {
  if (count <= 0 || limit <= 0) return [];
  const center = Math.max(0, Math.min(count - 1, Math.round(target)));
  const result = [center];
  const size = Math.min(count, limit);
  const sign = direction < 0 ? -1 : 1;
  const add = (index: number) => {
    if (index >= 0 && index < count && result.length < size) result.push(index);
  };
  for (let distance = 1; result.length < size && distance < count; distance++) {
    add(center + distance * sign);
    if (
      distance <= 4 ||
      center + distance * sign < 0 ||
      center + distance * sign >= count
    )
      add(center - distance * sign);
  }
  return result;
}
