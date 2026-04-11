# Kenotic Labs — Website Design Document
**Version:** 1.0
**Date:** 2026-04-02
**Stack:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion

---

## Design System

### Brand Colors — "Sterling Sage" Palette
```css
/* BACKGROUNDS */
--silver-cream:    #F2F0EB    /* primary light background */
--dark-beige:      #E5DFD3    /* alternate light background */
--deep-sage:       #1E2D24    /* dark background */

/* TEXT */
--heading-light:   #1C2620    /* headings on light backgrounds */
--body-light:      #3B4240    /* body text on light backgrounds */
--muted:           #8A8880    /* labels, muted (large text only) */
--heading-dark:    #F2F0EB    /* headings on dark backgrounds */
--body-dark:       #C8C2B5    /* body text on dark backgrounds */

/* ACCENTS */
--muted-sage:      #5B7F6B    /* links, metrics, borders */
--antique-gold:    #B39B5C    /* thin lines, labels, numbers */
--light-sage:      #8BAF9A    /* hover on dark */

/* CARDS */
--card-on-silver:  #FAFAF7    /* cards on silver cream bg */
--card-on-warm:    #F2F0EB    /* cards on warm bg */
--card-on-dark:    rgba(255,255,255,0.05)  /* cards on dark bg */
```

### Color Rules (STRICT)
- Light backgrounds: headings #1C2620, body #3B4240. NEVER muted body text.
- Dark backgrounds: headings #F2F0EB (or #FFFFFF), body #C8C2B5. High contrast always.
- Gold (#B39B5C): ONLY accents, lines, numbers, labels. NEVER body text.
- Sage (#5B7F6B): ONLY links, metric numbers, accent borders. NEVER paragraphs.

### Section Assignments
1. Hero: bg-deep #1E2D24 (left) + bg-silver #F2F0EB (right)
2. Why It Matters: bg-silver #F2F0EB
3. What We Do: bg-warm #E5DFD3
4. Properties: bg-silver #F2F0EB
5. Vision: bg-deep #1E2D24 (left) + bg-silver #F2F0EB (right)
6. Values: bg-deep #1E2D24
7. Evidence: bg-warm #E5DFD3
8. Publications: bg-silver #F2F0EB
9. Contact: bg-deep #1E2D24 (left) + bg-silver #F2F0EB (right)
10. Footer: bg-deep #1E2D24

### Typography
- **Headings:** Playfair Display (Google Fonts) via var(--font-playfair)
  - Hero: clamp(2.8rem, 5vw, 4.2rem), font-weight 700
  - Section titles: clamp(2rem, 3.5vw, 2.8rem), font-weight 700
  - Card titles: 1.35-1.5rem, font-weight 700
  - Quotes: clamp(1.1rem, 1.8vw, 1.3rem), italic
- **Body:** Lato (Google Fonts) via var(--font-lato)
  - Body: 1.05rem, line-height 1.85, weight 400
  - Labels: 0.65-0.75rem, weight 700, tracking [2-4px], uppercase
  - Small: 0.85-0.95rem

### Spacing Scale (8dp system)
- Section padding: py-32 lg:py-40 (8rem / 10rem)
- Content max-width: 1400px
- Horizontal padding: px-8 md:px-16 xl:px-24
- Card padding: p-8 md:p-10 or p-10 md:p-14
- Gap between cards: gap-6 or gap-8
- Inter-element spacing: mb-6 to mb-12

---

## Layout Patterns (inspired by Fauna Robotics)

### Rule: NO two sections should have the same layout.

| Section | Layout Pattern | Background |
|---------|---------------|------------|
| Hero | Full-viewport, asymmetric split (55/45), layered depth | Dark / Cream |
| Why It Matters | Bento grid — large card (1.4fr) + stacked smaller cards | Cream |
| What We Do | Asymmetric split with offset floating card | Cream gradient |
| Properties | Bento grid — 2-col with varying spans (wide/narrow) | Cream deep |
| Vision | Edge-to-edge 50/50 split | Forest / Cream |
| Values | Full dark, staggered 2-col cards with offset | Deep dark |
| Evidence | Asymmetric split, cards with rounded corners | Cream + gold accent |
| Publications | Centered, 2-col cards + community links row | Cream |
| Contact | Split — dark form left, cream waitlist right | Forest / Cream |
| Footer | Centered, minimal | Deep dark |

### Card Design
- Varying border-radius: 1.2rem, 1.5rem, 2rem (NOT uniform)
- Shadows: subtle default, stronger on hover
  - Default: shadow-[0_2px_40px_rgba(30,45,36,0.03)]
  - Hover: shadow-[0_12px_60px_rgba(30,45,36,0.08)]
- Dark cards: bg-white/[0.04] with backdrop-blur-sm
- Light cards: bg-white with hover lift

### Section Transitions
- Gradient fades between sections (bg-gradient-to-b)
- Gold accent lines as dividers (h-[3px] with gradient opacity)
- NO flat color block edges — always gradients or overlapping elements

---

## Motion System (Framer Motion)

### Scroll Reveals
- Ease: [0.22, 1, 0.36, 1] (custom spring-like)
- Duration: 0.8-1.0s for reveals
- Stagger: 0.1-0.15s between sequential items
- Threshold: 0.08-0.1 (triggers early for smoother feel)
- Direction: mostly "up", occasionally "left" or "right" for variety

### Hero Animations
- Word-by-word reveal: 0.08s stagger per word
- Gold line: scaleX from 0 to 1
- Sub-elements: fadeUp with increasing delay

### Hover Interactions
- Cards: translateY(-4px to -6px) + shadow increase
- Titles: translateX(1-2px) on parent hover
- Buttons: translateY(-2px) + colored shadow
- Links: color transition 0.4s
- Duration: 500-700ms with cubic-bezier easing

### What NOT to animate
- No bouncing, zooming, or rotating
- No particle effects
- No parallax (too gimmicky for this brand)
- Everything should feel like it was always there, just revealing itself

---

## Atmospheric Effects

### Grain Overlay
- Fixed position, z-[9999], pointer-events-none
- SVG noise texture at 2% opacity
- Creates depth without being visible

### Gradient Glows
- Radial gradients in bg, 150-200px blur
- Green glow: rgba(91,127,107, 0.08-0.12)
- Gold glow: rgba(179,155,92, 0.05)
- Only on dark sections and hero

### Section Gradients
- Between cream sections: bg-gradient-to-b from one cream shade to another
- Bottom of hero: gradient fade to cream
- Gold divider lines: gradient from transparent-gold-transparent

---

## Accessibility (from Vercel + Bencium skills)

- Contrast: 4.5:1 minimum for body text, 3:1 for large headings
- Focus states: visible focus rings on all interactive elements
- Touch targets: minimum 44x44px
- Reduced motion: respect prefers-reduced-motion
- Semantic HTML: proper heading hierarchy h1→h2→h3
- Alt text on all images when added
- Keyboard navigation: full support

---

## Performance (from React Best Practices skill)

- Font loading: font-display: swap (Next.js handles this)
- Images: next/image with lazy loading when added
- Bundle: code-split by route (already app router)
- Animations: transform/opacity only, no layout-triggering properties
- Framer Motion: lazy load non-critical sections

---

## File Structure
```
src/
  app/
    layout.tsx          — Root layout, fonts, metadata
    page.tsx            — Main page, imports all sections
    globals.css         — Tailwind + shadcn + custom vars
  components/
    nav.tsx             — Fixed nav with mix-blend-mode
    reveal.tsx          — Reusable scroll-reveal wrapper
    sections/
      hero.tsx          — Full viewport, split, word animation
      why-it-matters.tsx — Bento: large card + stacked cards
      what-we-do.tsx    — Asymmetric split, floating card
      properties.tsx    — Bento grid, varying spans
      vision.tsx        — Edge-to-edge split
      values.tsx        — Dark bg, staggered offset cards
      evidence.tsx      — Split, metric cards, table
      publications.tsx  — Cards + community row
      contact.tsx       — Split: form + waitlist
      footer.tsx        — Centered, minimal
```

---

## Copy Source
ALL text comes from: S:\Nura\Kenotic Labs\website\WEBSITE_COPY.md
Do NOT make up any text. Do NOT change any approved copy.

---

## Tone Principles
- Old money meets modern tech
- Infrastructure, not assistant
- Humble but strong — let the work speak
- NEVER use: assistant, companion, chatbot, helper, adaptive, revolutionary, next-gen
- Every word effortlessly readable
- An investor reads this without squinting
