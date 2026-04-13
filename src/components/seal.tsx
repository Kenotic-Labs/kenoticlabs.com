import Image from "next/image";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "w-10 h-10",
  md: "w-14 h-14 md:w-16 md:h-16",
  lg: "w-20 h-20 md:w-24 md:h-24",
  xl: "w-24 h-24 md:w-32 md:h-32",
};

const SIZE_HINT: Record<Size, string> = {
  sm: "48px",
  md: "64px",
  lg: "96px",
  xl: "128px",
};

/**
 * Kenotic Labs seal.
 *
 * Renders the fused Α-Ω mark as a stamp. The mark is load-bearing across every
 * published surface (thesis, insights, demo) — placement is intentional, not
 * decorative.
 *
 * @param variant  "light" for cream/paper surfaces (black strokes, no filter).
 *                 "dark" for off-black surfaces (inverted, cream strokes).
 * @param size     Seal dimensions. Default is "lg" which pairs with page hero
 *                 placement. Use "md" for inline article stamps, "xl" for the
 *                 most prominent seal moments.
 * @param className Additional classes merged after the sizing classes.
 */
export function Seal({
  variant = "light",
  size = "lg",
  className = "",
  priority = false,
}: {
  variant?: "light" | "dark";
  size?: Size;
  className?: string;
  priority?: boolean;
}) {
  const invert = variant === "dark" ? "invert opacity-95" : "";
  return (
    <div
      className={`relative ${SIZE_CLASSES[size]} mx-auto ${className}`}
      aria-hidden={false}
    >
      <Image
        src="/Main-Logo-BGR.png"
        alt="Kenotic Labs"
        fill
        sizes={SIZE_HINT[size]}
        priority={priority}
        className={`object-contain ${invert}`}
      />
    </div>
  );
}
