// Re-use the OG image for Twitter card (same dimensions, same content).
// `runtime` must be a literal export — not re-exported — per Next.js route segment config rules.
export const runtime = "edge";
export { default } from "./opengraph-image";
export { alt, size, contentType } from "./opengraph-image";
