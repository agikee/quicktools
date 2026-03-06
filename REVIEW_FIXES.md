# QuickTools - Issues to Fix

## Priority 0 - Critical (AdSense blockers)

### SEO-01: Fix default metadata in layout.tsx
- Remove "Create Next App" title
- Set proper QuickTools branding

### SEO-02: Add per-tool metadata
- BMI Calculator
- Tip Calculator
- Percentage Calculator
- Password Generator
- Unit Converter
- Color Picker
- Word Counter
- Age Calculator

### SEO-03: Add Open Graph tags
- og:title, og:description, og:url, og:image

### SEO-04: Fix sitemap domain
- Change quicktools.app to quicktools-dusky.vercel.app (or actual domain)

### SEO-05: Add JSON-LD structured data
- Organization schema on homepage
- WebApplication schema on each tool

### ADS-01: Add favicon
- Create favicon.ico
- Add apple-touch-icon

### ADS-02: Fix privacy policy
- Add contact information
- Add email address

---

## Priority 1 - Important (UX)

### UX-01: Add input validation
- BMI: prevent negative values
- Tip: prevent split < 1
- All: add min/max limits

### UX-02: Add aria-labels
- Icon-only buttons
- Sliders
- Toggle buttons

### UX-03: Connect labels to inputs
- Use htmlFor + id

### UX-04: Add loading states
- Show loading indicator during calculations

### UX-05: Make percentage calculator real-time
- Use useEffect instead of button click

### UX-06: Auto-generate password on load
- Call generatePassword() in useEffect

---

## Priority 2 - Nice to have

### PERF-01: Remove unused files
- public/file.svg, globe.svg, next.svg, vercel.svg, window.svg

### CODE-01: Extract shared components
- ToolLayout component
- InfoCard component

### CODE-02: Add error boundary
- Create ErrorBoundary component
- Wrap tool pages

---

## Implementation Order

1. SEO-01, SEO-02, SEO-03 (metadata)
2. SEO-04, SEO-05 (sitemap, JSON-LD)
3. ADS-01, ADS-02 (favicon, privacy)
4. UX-01, UX-02, UX-03 (validation, a11y)
5. UX-04, UX-05, UX-06 (loading, real-time)
6. PERF-01, CODE-01, CODE-02 (cleanup)
