# AtWED ("About To Wed")

Single-page marketing site for a marriage counselling and premarital education platform.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4, static export, Lenis for smooth scroll.

## Commands

- `npm run dev`: local dev server
- `npm run build`: static export to `out/` (deploy this folder to Cloudflare)
- `npm run lint`

## Structure

- `app/globals.css`: design tokens (`@theme`, Tailwind v4 has no `tailwind.config`), base styles, reduced-motion block
- `components/Container.tsx`, `components/Section.tsx`: layout primitives
- `components/Reveal.tsx`, `hooks/useParallax.ts`, `components/SmoothScroll.tsx`: animation primitives

## Performance rules

**Images**
- Use WebP/AVIF, never PNG/JPG for photos.
- Always set explicit `width` and `height`.
- `loading="lazy"` for everything below the fold; `priority` / `fetchPriority="high"` only for the hero image.
- `images.unoptimized` is on (static export), so export correctly sized files by hand.

**No layout shift**
- Reserve space for images, fonts and embeds. Never insert content above existing content after load.
- Fonts use `next/font` with `display: swap` and only the weights used.

**Animation**
- Animate only `transform` and `opacity`.
- Set `will-change` only while an animation is running, then remove it (`Reveal` and `useParallax` already do this).
- Everything must degrade under `prefers-reduced-motion` (handled globally in `globals.css`, in `Reveal`, `useParallax` and `SmoothScroll`).
- No other animation libraries. Lenis is the only one.

**CSS**
- Mobile-first: base styles are for small screens, add `md:` / `lg:` for larger.
- Prefer fluid `clamp()` tokens over many breakpoints.
