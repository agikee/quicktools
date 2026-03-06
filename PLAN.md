# QuickTools - Revenue Plan

**Goal:** Build a simple tools site that generates revenue from ads

## Strategy

Create multiple utility pages that get organic search traffic. Each tool is:
- Fast and mobile-friendly
- SEO optimized
- Easy to use
- Monetized with ads

## Tools to Build (High Search Volume)

| Tool | Monthly Searches | Priority |
|------|-----------------|----------|
| BMI Calculator | 1M+ | P0 |
| Tip Calculator | 500K+ | P0 |
| Percentage Calculator | 400K+ | P0 |
| Password Generator | 300K+ | P1 |
| Unit Converter | 200K+ | P1 |
| Color Picker | 150K+ | P1 |
| Word Counter | 100K+ | P2 |
| Age Calculator | 100K+ | P2 |

## Revenue Model

- Google AdSense (primary)
- Strategic ad placement (sidebar, between content)
- Non-intrusive, mobile-friendly ads

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Client-side only (no backend costs)
- Fast loading, SEO optimized

## Pages Structure

```
/
├── /                    → Home (tool directory)
├── /bmi-calculator      → BMI Calculator
├── /tip-calculator      → Tip Calculator
├── /percentage          → Percentage Calculator
├── /password-generator  → Password Generator
├── /unit-converter      → Unit Converter
├── /color-picker        → Color Picker
├── /word-counter        → Word Counter
├── /age-calculator      → Age Calculator
├── /privacy             → Privacy Policy (AdSense required)
└── /about               → About
```

## SEO Strategy

- Descriptive page titles
- Meta descriptions
- Schema markup for calculators
- Fast Core Web Vitals
- Mobile-first design

## 8-Hour Plan

### Hour 1-2: Core Setup + 3 P0 Tools
- [ ] Project setup
- [ ] Layout with ad placeholders
- [ ] BMI Calculator
- [ ] Tip Calculator
- [ ] Percentage Calculator

### Hour 3-4: P1 Tools
- [ ] Password Generator
- [ ] Unit Converter
- [ ] Color Picker

### Hour 5-6: P2 Tools + Polish
- [ ] Word Counter
- [ ] Age Calculator
- [ ] Polish UI
- [ ] Add SEO meta tags

### Hour 7-8: Ads + Deploy
- [ ] AdSense integration
- [ ] Privacy policy
- [ ] Deploy to Vercel
- [ ] Submit to AdSense
