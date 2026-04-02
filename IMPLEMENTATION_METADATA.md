# Vesper — Complete Metadata & Social Preview Implementation Plan

---

> **Current Problem:** The OG/Twitter preview image for Vesper still points to `https://lovable.dev/opengraph-image-p98pqg.png` — Lovable's generic branded placeholder. This means every link shared on LinkedIn, X (Twitter), Slack, iMessage, etc. shows a Lovable logo instead of the actual Vesper product.

---

## Audit of the Current State

| Tag | Current Value | Status |
|---|---|---|
| `og:image` | `lovable.dev/opengraph-image-p98pqg.png` | ❌ Wrong — Lovable placeholder |
| `twitter:image` | `lovable.dev/opengraph-image-p98pqg.png` | ❌ Wrong — Lovable placeholder |
| `og:url` | *(missing)* | ❌ Missing |
| `og:site_name` | *(missing)* | ❌ Missing |
| `twitter:title` | *(missing)* | ❌ Missing |
| `twitter:description` | *(missing)* | ❌ Missing |
| `twitter:creator` | *(missing)* | ❌ Missing |
| Canonical URL | *(missing)* | ❌ Missing |
| JSON-LD Structured Data | *(missing)* | ❌ Missing |
| Favicon (SVG/PNG variants) | Only `.ico` present | ⚠️ Incomplete |
| Apple Touch Icon | *(missing)* | ❌ Missing |
| `sitemap.xml` | *(missing)* | ❌ Missing |
| `robots.txt` Sitemap reference | *(missing)* | ⚠️ Incomplete |
| Theme color meta | *(missing)* | ❌ Missing |

---

## Goals

1. **Replace Lovable preview image** with a real, high-quality screenshot of the Vesper landing page taken programmatically using the browser subagent.
2. **Complete Open Graph metadata** for rich link previews on LinkedIn, Facebook, Slack, Discord, iMessage, WhatsApp.
3. **Complete Twitter/X Card metadata** for rich previews on X (Twitter).
4. **Add JSON-LD structured data** for Google rich results (SoftwareApplication + Organization schema).
5. **Add canonical link tag** to prevent duplicate content issues.
6. **Add favicon suite** (SVG, 192px PNG, 512px PNG, Apple Touch Icon) for correct branding across browsers, tabs, bookmarks, and mobile home screens.
7. **Create a `sitemap.xml`** and reference it from `robots.txt`.
8. **Update `robots.txt`** to include the Sitemap directive.

---

## Deliverables

| # | Deliverable | Location |
|---|---|---|
| 1 | `og-image.png` (1200×630) | `public/og-image.png` |
| 2 | Fully completed `<head>` block | `index.html` |
| 3 | `favicon.svg` | `public/favicon.svg` |
| 4 | `apple-touch-icon.png` (180×180) | `public/apple-touch-icon.png` |
| 5 | `favicon-192.png` | `public/favicon-192.png` |
| 6 | `favicon-512.png` | `public/favicon-512.png` |
| 7 | `site.webmanifest` | `public/site.webmanifest` |
| 8 | `sitemap.xml` | `public/sitemap.xml` |
| 9 | Updated `robots.txt` | `public/robots.txt` |

---

## Step-by-Step Implementation

### Step 1 — Capture the OG Screenshot

**Goal:** Produce a `1200×630` pixel screenshot of the Vesper landing page to use as the OG image.

**How:**
- Use the browser subagent to open the live Vercel deployment (or local dev server if not deployed yet).
- Resize the viewport to `1200×630` (the canonical OG image size).
- Scroll to the top / hero section — this is the most impactful first impression.
- Capture a screenshot and save it as `public/og-image.png`.

**Considerations:**
- The screenshot should capture the Hero section cleanly — the dark background + gold accent typography reads very well at thumbnail size.
- If the local dev server is not running, we will need to spin it up first (`npm run dev`).
- The final image must be under **5MB** (most crawlers cap at 5–8MB for OG images).

---

### Step 2 — Create Favicon Suite

**Goal:** Generate a complete, consistent set of favicons and icons from the Vesper brand mark.

**How:**
- Generate a clean `favicon.svg` using the existing brand (dark background, gold "V" monogram or Vesper wordmark).
- Export PNG variants: 180×180 (Apple Touch Icon), 192×192, 512×512.
- Create `site.webmanifest` to declare the PWA app identity and icons.

---

### Step 3 — Rewrite `index.html` `<head>`

**Goal:** Replace incomplete/wrong metadata with a complete, production-ready `<head>` block.

**Full target `<head>` block:**

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- PRIMARY META -->
  <title>Vesper — AI Market Intelligence Briefings for Revenue Teams</title>
  <meta name="description" content="Vesper delivers personalized daily intelligence briefings to every person on your go-to-market team. Competitor moves, buyer signals, account activity — compiled overnight, in your inbox every morning." />
  <meta name="author" content="Vesper Intelligence Inc." />
  <meta name="keywords" content="AI intelligence briefings, sales intelligence, market intelligence, revenue team, GTM intelligence, competitor monitoring, buyer signals" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#c9a84c" />
  <link rel="canonical" href="https://[YOUR_DOMAIN]/" />

  <!-- OPEN GRAPH -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://[YOUR_DOMAIN]/" />
  <meta property="og:site_name" content="Vesper" />
  <meta property="og:title" content="Vesper — AI Market Intelligence Briefings" />
  <meta property="og:description" content="Your team's intelligence briefing. Automated. Every morning, every person on your revenue team gets a personalized brief on competitor moves, buyer signals, and account activity." />
  <meta property="og:image" content="https://[YOUR_DOMAIN]/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Vesper — AI-powered daily intelligence briefings for GTM teams" />
  <meta property="og:locale" content="en_US" />

  <!-- TWITTER / X CARD -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@VesperIntel" />
  <meta name="twitter:creator" content="@VesperIntel" />
  <meta name="twitter:title" content="Vesper — AI Market Intelligence Briefings" />
  <meta name="twitter:description" content="Every morning, your revenue team gets a personalized brief. Competitor moves, buyer signals, account activity — all automated." />
  <meta name="twitter:image" content="https://[YOUR_DOMAIN]/og-image.png" />
  <meta name="twitter:image:alt" content="Vesper — AI-powered daily intelligence briefings" />

  <!-- JSON-LD STRUCTURED DATA -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Vesper Intelligence Inc.",
        "url": "https://[YOUR_DOMAIN]",
        "logo": "https://[YOUR_DOMAIN]/favicon-512.png",
        "sameAs": [
          "https://twitter.com/VesperIntel",
          "https://linkedin.com/company/vesper-intelligence"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Vesper",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "Vesper delivers personalized daily intelligence briefings to every person on your go-to-market team.",
        "url": "https://[YOUR_DOMAIN]",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Vesper Intelligence Inc."
        }
      }
    ]
  }
  </script>

  <!-- FAVICONS & MANIFEST -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
</head>
```

---

### Step 4 — Create `sitemap.xml` & Update `robots.txt`

**Goal:** Help search engines discover and index all pages efficiently.

---

## Execution Order Status

- [x] 1. Confirm production URL + answers to pre-implementation questions (Confirmed: daily-intelligence-briefs.vercel.app)
- [x] 2. Spin up dev server
- [x] 3. Browser subagent → capture 1200×630 hero screenshot → save as public/og-image.png
- [x] 4. Generate favicon.svg (brand-consistent SVG monogram)
- [x] 5. Generate PNG favicon variants (180, 192, 512px) using generate_image tool
- [x] 6. Create public/site.webmanifest
- [x] 7. Create public/sitemap.xml
- [x] 8. Update public/robots.txt
- [x] 9. Rewrite index.html <head> with all metadata (Updated to: daily-intelligence-briefs.vercel.app)
- [ ] 10. Validate with: opengraph.xyz, cards-dev.twitter.com, search.google.com/test/rich-results (Requires Deployment)

---

## Validation Checklist

- [x] **Primary Screenshot:** `public/og-image.png` created and verified.
- [x] **Favicon Suite:** SVG and PNG variants generated.
- [x] **Metadata Injection:** `index.html` head section rewrote with correct production domain.
- [x] **Manifest:** `site.webmanifest` created with production paths.
- [x] **SEO Files:** `sitemap.xml` and `robots.txt` updated with production domain.

> [!TIP]
> The implementation is now 100% complete with correct URLs. Once you push these changes to GitHub, Vercel will automatically update the live site and social previews should appear within a few minutes.
