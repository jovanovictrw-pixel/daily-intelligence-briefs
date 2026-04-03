# Implementation Plan — RESPONSIBILITY_OPTIMIZE.md

This plan outlines the steps to make the entire Vesper landing page fully responsive across mobile, tablet, and desktop devices while maintaining the premium aesthetic and specific visual constraints.

## 1. Breakpoint & Global Configuration

We will align the project with the following specific breakpoints:
- **Mobile:** `@media (max-width: 640px)`
- **Tablet:** `@media (min-width: 641px) and (max-width: 1024px)`
- **Desktop:** `@media (min-width: 1025px)` (target for current "desktop" designs)

### Actions:
- **Tailwind Config:** Update `tailwind.config.ts` to include custom screens to match the exact requirements.
- **Global CSS (`src/index.css`):**
    - Ensure `body { overflow-x: hidden; }` to prevent horizontal scrolling.
    - Implement fluid padding using `clamp()` for sections.
    - Standardize `max-width: 100%; height: auto;` for all `img` and `svg`.

## 2. Navigation (Navbar.tsx)

### Mobile (< 641px):
- Hide desktop links.
- Replace with hamburger menu icon (gold lines).
- Dropdown: Full-width, dark background, `padding: 20px`.
- Nav links: Vertical stack.
- "Request Briefing": Shrink horizontal padding and font.

### Tablet (641px - 1024px):
- Links remain visible.
- Reduce font size and spacing.

## 3. Hero Section (Hero.tsx)

### Mobile (< 641px):
- `grid-cols-1`.
- Headline: `clamp(2.5rem, 8vw, 4rem)`.
- Brief card: Stacked with `mt-32`.

### Tablet (641px - 1024px):
- Scale headline down slightly.
- Brief card: Narrower on right.

## 4. Section 01 — The Problem (ProblemSection.tsx)

### Mobile (< 641px):
- Stack to single column.
- Order: Label -> Headline -> Stats Cards -> SVG/Data readout.
- Stat cards: Full width.

### Tablet (641px - 1024px):
- 2-column layout (Headline left, Stats right).
- Center SVG column: Hide or shrink.

### Styling:
- Convert inline `gridTemplateColumns` and fixed `padding: 140px 80px` to responsive versions.
- Ensure ambient glow remains `inset: 0`.

## 5. Section 02 — How It Works (HowItWorks.tsx)

### Mobile (< 641px):
- Vertical stack (`grid-cols-1`).
- Card gap: `16px`.

### Tablet (641px - 1024px):
- 2-column grid (`grid-cols-2`).

## 6. Section 04 — Integrations (IntegrationsSection.tsx)

### Mobile (< 641px):
- 2-column grid (`grid-cols-2`).

### Tablet (641px - 1024px):
- 3-column grid (`grid-cols-3`).

## 7. Quality Assurance Checklist

- [ ] **No Horizontal Scrollbar.**
- [ ] **Fluid Containers:** Replace fixed px with `max-width + width: 100%`.
- [ ] **Visual Consistency:** No changes to colors, fonts, or animations.
- [ ] **Scale Audit:** Use `clamp()` for typography and spacing.
