/** Resolve public assets for both local development and GitHub Pages. */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/") || path.startsWith("//") || (base && path.startsWith(`${base}/`))) return path;
  return `${base}${path}`;
}
