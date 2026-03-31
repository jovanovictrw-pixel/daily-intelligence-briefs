## Fixing plan (frontend UI polish + UX)

This document addresses the 10 issues listed in the latest review. Scope is **frontend-only** (React/Tailwind), focusing on visual quality, motion, and consistency.

---

## Phase 0 — Baseline + targets

- [ ] Identify all sections + their current backgrounds and animation hooks
- [ ] Confirm the canonical section order and final numbering system (01, 02, 03…)
- [ ] Confirm the exact anchors to preserve (`#product`, `#sample-brief`, `#capabilities`, `#integrations`, `#pricing`, `#customers`, `#cta`)

Acceptance:
- No broken anchors, no duplicate IDs, and all sections still reachable from navbar + mobile sheet + footer.

---

## Phase 1 — Hero vs Sample Brief differentiation (Issue 1, 6, 9)

### 1.1 Make `SampleBriefSection` visually distinct from the hero card

- [ ] Keep **Hero card** as the animated/typewriter version
- [ ] Redesign `SampleBriefSection` to be a **different layout**, e.g.:
  - Option A: wider “expanded brief” (two-column) with “TL;DR”, “Top 3 actions”, and 2–3 detailed blocks
  - Option B: tabs/accordion (static) for sections + a “why it matters” callout
  - Option C: “brief + actions + sources” layout (shows sample sources row / chips)
- [ ] Ensure typography differs (e.g. bigger headline, more editorial spacing, different header treatment than the hero card’s gold top border)
- [ ] Use a different timestamp pattern or omit date in sample section if it reads repetitive

Files:
- `src/components/vesper/Hero.tsx`
- `src/components/vesper/SampleBriefSection.tsx`

Acceptance:
- Scrolling to `#sample-brief` reveals **new content/value** (not a duplicate of the hero card).

### 1.2 Fix “02A” label (Issue 6)

- [ ] Pick one:
  - Option A: Renumber all section labels sequentially (01, 02, 03, 04…)
  - Option B: Remove the numeric prefix from the Sample Brief label (keep “Sample Brief” only)

Files:
- `src/components/vesper/SampleBriefSection.tsx` (and any other section label strings if renumbering)

Acceptance:
- No “02A” anywhere; numbering system reads intentional and consistent.

### 1.3 Add scroll fade-in to `SampleBriefSection` (Issue 9)

- [ ] Add `useScrollFadeIn` and match the motion pattern of other sections (or improved staggered version if Phase 5 is done first)

Acceptance:
- Sample brief animates in consistently with other sections.

---

## Phase 2 — Trust + credibility visuals (Issue 2, 3)

### 2.1 Improve `LogosBar` (Issue 2)

- [ ] Replace faded Playfair text row with a **badge/chip row**:
  - font: `font-mono` (or your `font-mono-data` utility)
  - consistent sizing and spacing
  - pill/bordered chips with subtle background (e.g. `bg-card/40` + `border-divider`)
  - optionally add small “spark”/dot separators to feel deliberate
- [ ] Optional: include lightweight SVG wordmarks where available, but chips are the minimum

Files:
- `src/components/vesper/LogosBar.tsx`

Acceptance:
- Logos section reads as **intentional trust signal**, not placeholder text.

### 2.2 Add real integration icons (Issue 3)

- [ ] Replace 2-letter abbreviations with:
  - Preferred: inline SVG marks (Slack, Salesforce, HubSpot, Gmail)
  - Fallback: brand-colored geometric “logo blocks” (still better than initials)
- [ ] Ensure consistent icon box sizing and alignment across tiles
- [ ] Ensure contrast works on dark background

### 2.3 Integrations SVG icon swap — **icons only** (User-supplied official paths)

Goal: update `IntegrationsSection.tsx` **only** by replacing the current icon boxes with the provided SVG brand marks for:
Slack, Salesforce, HubSpot, Gmail, Notion, Linear, Gong, ZoomInfo.

Hard constraints:
- [ ] **Do not change** layout, spacing, typography, grid, hover effects, motion, copy, or section structure
- [ ] Keep existing card wrapper/hover classes (`hover:border-primary/40`, transitions, etc.)
- [ ] Replace **only** the icon box content

Icon container spec:
- [ ] Container must be: `w-10 h-10 rounded-lg bg-muted flex items-center justify-center`
- [ ] Each SVG must render at `w-5 h-5` (24×24 viewBox paths as provided)
- [ ] Keep the exact integration order and names

Acceptance:
- [ ] Every integration tile shows its correct SVG logo (no initials/fallback shapes)
- [ ] Icons are centered, consistent size, and readable on dark background
- [ ] No diffs outside `src/components/vesper/IntegrationsSection.tsx` for this task

Files:
- `src/components/vesper/IntegrationsSection.tsx`

Acceptance:
- Integrations grid looks “real” at a glance; no more initials-in-grey-boxes for major brands.

---

## Phase 3 — Background variation / visual rhythm (Issue 4)

- [ ] Add at least 2–3 background treatments and alternate them across the scroll:
  - Treatment A: dot-grid (already exists) for one or two sections (not just hero)
  - Treatment B: subtle “surface lift” band (e.g. `bg-card/30` or `bg-muted/20`) across an entire section
  - Treatment C: noise texture overlay (CSS-only) as a band for one section
- [ ] Ensure readability + contrast on every variant (foreground/muted text)
- [ ] Ensure backgrounds don’t fight focus rings or reduced motion behavior

Files:
- likely multiple in `src/components/vesper/*`
- `src/index.css` if adding a noise utility class

Acceptance:
- The page no longer feels monotonous; sections are visually distinct without looking busy.

---

## Phase 4 — Navbar shimmer fix (Issue 5)

- [ ] Fix shimmer visibility: change `group-hover:opacity-0` to `group-hover:opacity-100`
- [ ] Verify shimmer is visible on hover (and still suppressed under `prefers-reduced-motion`)

Files:
- `src/components/vesper/Navbar.tsx`

Acceptance:
- Shimmer is actually visible on hover (desktop), without being distracting.

---

## Phase 5 — Staggered motion (Issue 7)

Goal: replace “whole-section fades in as one block” with a **staggered reveal**.

- [ ] Create or update animation utility/hook to support:
  - headline first
  - subheading next
  - cards/tiles in sequence (index-based delay)
- [ ] Apply stagger to:
  - `HowItWorks` steps (3 cards)
  - `FeaturesSection` bento grid cards
  - `IntegrationsSection` tiles
  - optional: pricing cards

Files:
- `src/hooks/use-animations.ts` (or new hook in `src/hooks/`)
- `src/components/vesper/HowItWorks.tsx`
- `src/components/vesper/FeaturesSection.tsx`
- `src/components/vesper/IntegrationsSection.tsx`
- `src/components/vesper/PricingSection.tsx` (optional)

Acceptance:
- Motion feels premium: content reveals in a clear sequence, not all-at-once.

---

## Phase 6 — Tailwind correctness + layout polish (Issue 8, 10)

### 6.1 Fix CTA glow class (Issue 8)

- [ ] Replace `bg-primary/8` with `bg-primary/[0.08]` (or a valid step like `bg-primary/10`)

Files:
- `src/components/vesper/CtaFooter.tsx`

Acceptance:
- Gold glow renders reliably in all environments.

### 6.2 Fix HowItWorks dashed connector alignment (Issue 10)

- [ ] Reposition dashed connector to align with icons:
  - Option A: absolute line anchored to the icon row baseline
  - Option B: use a grid overlay line behind the cards with per-breakpoint offsets
  - Option C: remove connector on some sizes if it cannot align cleanly
- [ ] Validate at typical widths (md, lg) that the line visually “connects” the steps

Files:
- `src/components/vesper/HowItWorks.tsx`

Acceptance:
- The dashed line actually connects the 3 steps (and doesn’t awkwardly float).

---

## Final QA checklist

- [ ] Reduced motion still respected (typewriter static, no shimmer)
- [ ] Keyboard focus rings visible everywhere
- [ ] All anchors still work from navbar, mobile menu, and footer
- [ ] `npm run build` passes

