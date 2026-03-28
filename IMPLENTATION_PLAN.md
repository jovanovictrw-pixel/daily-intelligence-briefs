# Frontend implementation plan

This document turns the agreed frontend suggestions into an ordered implementation plan with checklists. Use it to track progress; tick items as you complete them.

**Scope:** UI, UX, accessibility, content hooks, and static assets only—no backend or API work unless noted as optional future work.

---

## Phase 0 — Baseline and conventions

Establish how you will verify changes before larger refactors.

- [ ] Confirm primary breakpoints (e.g. `md`, `lg`) match Tailwind usage across `Navbar` and sections
- [ ] Document or agree on: primary CTA copy, section order on `Index.tsx`, and canonical anchor IDs
- [ ] Optional: capture current Lighthouse or accessibility snapshot for before/after comparison

---

## Phase 1 — Information architecture and anchors

Fix navigation targets, deep links, and copy alignment so scrolling matches user expectations.

### 1.1 “Sample brief” vs `#product` alignment

- [ ] Decide behavior: rename link text, change `href`, or add a dedicated sample block at/near `#product`
- [ ] Update hero secondary CTA (`Hero.tsx`) so label and destination match the chosen behavior
- [ ] If a new block is added, ensure visual continuity with the existing briefing card styling
- [ ] Smoke-test: from hero, secondary CTA lands on content that clearly matches the promise

### 1.2 Capabilities / features deep link

- [ ] Add a stable section `id` on the capabilities grid section (e.g. `#capabilities`) in `FeaturesSection.tsx`
- [ ] Optionally add a navbar item or footer link to `#capabilities` if it fits the nav model
- [ ] Verify no duplicate IDs site-wide

### 1.3 Navbar labels vs section titles

- [ ] Audit: “Product” → `#product` (How it works) vs user mental model; adjust nav labels or section headings for consistency
- [ ] Update footer links if they mirror primary nav

**Phase 1 complete when:** All in-page anchors work from navbar and footer; hero CTAs are honest about destination; capabilities are linkable.

---

## Phase 2 — Mobile navigation

Restore full wayfinding on small viewports without relying on desktop-only links.

- [ ] Choose pattern: drawer/sheet, horizontal scroll strip, sticky bottom bar, or hybrid
- [ ] Implement chosen pattern using existing UI primitives (`sheet`, `drawer`, etc.) where appropriate
- [ ] Mirror the same anchor targets as desktop (`#product`, `#integrations`, `#pricing`, `#customers`, and `#capabilities` if added)
- [ ] Ensure open/close is keyboard accessible and focus is trapped or restored appropriately for modal patterns
- [ ] Add an accessible label for the menu trigger (e.g. “Open menu” / `aria-expanded`)
- [ ] Test on real narrow viewports: all links scroll to correct sections

**Phase 2 complete when:** Mobile users can reach every major section without horizontal guessing or desktop-only links.

---

## Phase 3 — Motion, focus, and accessibility

Reduce harm from animation and meet baseline keyboard and screen-reader expectations.

### 3.1 `prefers-reduced-motion`

- [ ] Audit animated areas: hero typewriter (`useTypewriter` / `Hero.tsx`), scroll fade-ins (`useScrollFadeIn` / `use-animations`), shimmer/hover effects (`Navbar`, elsewhere)
- [ ] Implement reduced-motion branch: shorter or no transitions; typewriter shows full text or static final state
- [ ] Verify in OS/browser “reduce motion” settings

### 3.2 Focus visibility

- [ ] Audit interactive elements: buttons, links, form fields, mobile menu trigger
- [ ] Ensure visible focus rings on custom-styled controls (gold/ghost buttons included)
- [ ] Tab through full page: order is logical, nothing focusable while hidden

### 3.3 Semantic structure (light pass)

- [ ] Confirm one `h1` on the landing page; heading levels step down without skips where reasonable
- [ ] Landmark regions: `nav`, `main`, `footer` (wrap page content in `main` if not already)

**Phase 3 complete when:** Reduced motion is respected; keyboard focus is always visible; no critical heading/landmark issues on the marketing page.

---

## Phase 4 — Waitlist CTA (frontend-only states)

Improve perceived reliability of the email form without backend integration.

- [ ] Client-side email validation (format only) with clear error message
- [ ] Submit button: `loading` / `disabled` state during async (or simulated delay if no API yet)
- [ ] Success state: inline message or panel (“You’re on the list”) with optional next steps copy
- [ ] Error state: network or generic failure copy if you later add `fetch`; for now, validation-only is enough
- [ ] Ensure submit is not blocked for assistive tech: errors associated with fields where applicable

**Phase 4 complete when:** Users always get clear feedback after attempting to join; no silent `preventDefault` with no message.

---

## Phase 5 — SEO and social sharing (static assets and meta)

- [ ] Replace placeholder `og:image` and `twitter:image` in `index.html` with a branded asset (correct dimensions for OG, typically 1200×630)
- [ ] Add `og:url` and canonical `link` if you have a stable production URL
- [ ] Re-read `title` and `meta description` for accuracy vs current positioning
- [ ] Optional: `theme-color` for mobile browser chrome alignment with dark theme

**Phase 5 complete when:** Shared links show the correct title, description, and Vesper-branded preview image.

---

## Phase 6 — Visual rhythm and section variety

Break long-scroll monotony without new backend features.

- [ ] Map sections and assign subtle background variants (e.g. dot grid vs flat vs noise)—reuse existing utilities where possible
- [ ] Add one optional band: pull quote, stat row, or narrow “day in the life” timeline (static JSX + styling)
- [ ] Check contrast and readability on each variant (`foreground` / `muted-foreground` on new backgrounds)
- [ ] Ensure new backgrounds do not break `prefers-reduced-motion` or focus visibility

**Phase 6 complete when:** The page feels less uniform; no section is harder to read or navigate.

---

## Phase 7 — Trust and credibility (content + UI)

- [ ] Logos bar: replace placeholders with approved logos or neutral “Trusted by teams at…” pattern if logos are not yet licensed
- [ ] Social proof (`SocialProof.tsx`): real quotes, names, titles, companies—or clearly marked illustrative copy if still placeholder
- [ ] Optional: add lightweight trust badges (SOC2, GDPR) only if accurate and approved

**Phase 7 complete when:** No obvious placeholder trust content remains unless intentionally labeled as demo.

---

## Phase 8 — Final QA and polish

- [ ] Full pass: mobile, tablet, desktop
- [ ] All nav and CTA anchors retested after any ID or copy change
- [ ] Lint and build succeed (`npm run build`)
- [ ] Optional: run automated accessibility checks (axe, Lighthouse) and file follow-ups only if blocking

**Phase 8 complete when:** The checklist above is satisfied and the page is shippable for a static deploy.

---

## Progress summary

| Phase | Theme                         | Status |
|-------|-------------------------------|--------|
| 0     | Baseline                      | ☐      |
| 1     | IA and anchors                | ☐      |
| 2     | Mobile navigation             | ☐      |
| 3     | Motion and a11y               | ☐      |
| 4     | Waitlist UI states            | ☐      |
| 5     | SEO / OG                      | ☐      |
| 6     | Visual variety                | ☐      |
| 7     | Trust content                 | ☐      |
| 8     | Final QA                      | ☐      |

Replace ☐ with ☑ or ✅ in the table when each phase is done, or track in your project tool of choice.

---

## Out of scope for this plan

- Backend waitlist API, email provider, analytics pipelines
- Authentication, dashboard, or product app surfaces
- Internationalization (i18n) unless you add a separate initiative

Add new rows to **Progress summary** if you split phases or add stretch goals.
