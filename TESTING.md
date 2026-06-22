# Testing Methodology — Red Dot Metal

## Available Commands

```bash
npm run lint        # Run ESLint (TypeScript + React)
npm run build       # Full production build (catches type errors, missing files, etc.)
npm run dev         # Development server with HMR (for manual testing)
npm start           # Production server (after build)
```

No test framework (Jest, Vitest, Playwright) is currently installed. Testing is manual.

---

## 1. i18n / Language Switching

### Test each locale
1. Open the language switcher dropdown in the navbar
2. Switch to **each of the 6 locales**: en, ms, zh, bn, ta, id
3. Verify the page content updates to the correct language
4. Verify the language switcher dropdown shows the currently active language with a checkmark

### Test locale persistence
1. Switch to a non-English locale (e.g. `zh`)
2. Navigate to a different page (e.g. Services, Contact)
3. Verify the locale is preserved across page navigation

### Test URL locale prefix
- Default locale (`en`) should work **with or without** the `/en` prefix
- Other locales (e.g. `zh`) should work with the prefix: `/zh/services`

### Test missing translations
- All message files should have the same keys as `messages/en.json`
- Build will fail if any page references a translation key that doesn't exist in all 6 files

---

## 2. Homepage

### Hero Section
- Title + subtitle render in correct language
- 3 CTA buttons: "Request Pickup", "Our Services", "WhatsApp Us", "Call Now"
- WhatsApp link opens in new tab with correct number
- Phone link opens phone dialer

### Stats Section
- 4 animated counters (Years Experience, Tons Collected, Clients Served, Same-Day Pickups)
- Numbers count up when scrolled into view
- Animation doesn't re-trigger unnecessarily

### Services Section
- 6 service cards with icons
- Hover/click behavior (if any)
- Correct translation for each service

### How It Works
- 4 steps displayed with icons and connector lines
- Each step has title + description

### What We Collect / Who We Serve / Why Us
- All items render correctly
- Icons display properly
- Translations match expected content

### Testimonials Section
- 4 testimonial cards with name, company, text, star rating
- Stars render correctly (5 stars each)

### Price Section
- Table renders with metal types, prices, conditions
- All 12+ price rows loaded from API

### CTA Section
- Button links to `/quote` page

### Contact Section
- Embedded contact form renders
- Quick action buttons (WhatsApp, Call, Email, Map)

---

## 3. Forms

### Contact Form (`/contact` or homepage contact section)
1. **Validation:** Submit empty form → should show required field errors for: name, phone, metalType, message
2. **Email validation:** Enter invalid email → error shown
3. **Success:** Fill all valid fields → submit → loading state → success toast → form resets
4. **Error:** API failure → error toast (not success)

### Quote Form (`/quote`)
1. **Validation:** Submit empty → required field errors: companyName, contactPerson, email, phone, metalTypes (min 1), estimatedWeight, pickupAddress, preferredDate
2. **Multi-select:** Must be able to select/deselect metal type checkboxes
3. **Date picker:** Must select a valid date
4. **Success:** Fill all → submit → loading → success toast → form resets
5. **Error:** API failure → error toast

### Admin Login (`/admin`)
1. **Invalid credentials:** Wrong email/password → "Invalid credentials" error
2. **Valid credentials:** Correct login → redirect to `/en/admin/dashboard`
3. **Empty fields:** Submit empty → validation errors

---

## 4. Admin Dashboard

### Auth check
1. Not logged in → visiting `/admin/dashboard` should redirect to `/admin`
2. Logged in → dashboard loads
3. Logout → clears auth → redirects to `/admin`

### Inquiries
1. Submit a contact form on the frontend
2. Login as admin
3. Verify the inquiry appears in the dashboard

### Dashboard navigation
- Quick links to Prices, Testimonials, Service Area, Contact pages work

---

## 5. API Endpoints

### `GET /api/prices`
- Returns JSON array of prices: `{ prices: [...] }`
- Each price has: `id, metal, price, condition, updatedAt`

### `POST /api/prices`
- Valid body: `{ metal, price, condition }` → returns 200
- Invalid body: missing fields → returns 400 with Zod errors

### `DELETE /api/prices?id=xxx`
- Valid ID → deletes and returns 200
- Missing/invalid ID → returns 400

### `GET /api/testimonials`
- Returns JSON array: `{ testimonials: [...] }`

### `POST /api/testimonials`
- Valid body: `{ name, company, text, rating }` → returns 200
- Invalid rating (outside 1-5) → returns 400

### `POST /api/admin`
- Valid credentials → `{ success: true }`
- Invalid → 401

### `POST /api/contact` / `POST /api/quote`
- Valid → 200 + forwards to Formspree
- Invalid → 400 + Zod errors

**Caveat:** All data is in-memory. Server restart loses all prices, testimonials, and inquiries.

---

## 6. Navigation & Layout

### Navbar
- 7 nav links displayed (Home, About (dropdown: Who We Serve, What We Collect, Why Us), Services, Testimonials, Service Area, Prices, Contact)
- "Get a Quote" CTA button
- WhatsApp + Phone icons
- Language switcher dropdown
- Mobile: hamburger menu with all links

### Footer
- 4-column layout: brand + social, quick links (8), contact info (4), operating hours
- Admin panel link

### Floating Actions
- WhatsApp + Phone FAB buttons in bottom-right corner
- Spring animation on load

### Mobile Responsive
- Navbar collapses to hamburger menu on small screens
- Layout stacks vertically
- Forms are usable on mobile viewport

---

## 7. Static Pages

### About (`/about`)
- Hero, overview, mission/vision, values (3 with icons), team text, accreditations (5 badges)

### Services (`/services`)
- 6 service cards with title, description, process
- "Our Process" section with 5 steps
- CTA to request quote

### Testimonials (`/testimonials`)
- Client testimonial cards with star ratings

### Service Area (`/service-area`)
- 6 Singapore regions with district lists
- Google Maps embed (check API key)
- Industrial estates section

### Prices (`/prices`)
- 14 metal prices in table
- Note about indicative pricing
- WhatsApp + Call CTAs

### Contact (`/contact`)
- Hero + quick action buttons
- "How It Works" 3-step guide
- Contact form
- 5 contact detail cards

---

## 8. Pre-deployment Checklist

1. **`npm run build`** → must complete with 0 errors, 0 warnings
2. **`npm run lint`** → no ESLint errors
3. Verify all `.env` variables are set (copy from `.env.example`)
4. Test all 6 locales on every major page
5. Test all 3 forms (contact, quote, admin login)
6. Test all CTA buttons and navigation links
7. Test mobile responsiveness (Chrome DevTools device mode)
8. Verify WhatsApp and phone links use correct numbers from `site.json`
9. Check Google Maps embed loads (if API key configured)
10. Test admin dashboard with real inquiry data

---

## 9. Known Gaps (No Tests For)

- No unit tests (Jest/Vitest not installed)
- No E2E tests (Playwright/Cypress not installed)
- No API contract tests
- No visual regression tests
- Data persistence is in-memory only (will reset on server restart)
- Form submissions go to Formspree (not Resend directly)
- Admin auth uses localStorage flag (no server-side session/JWT)
- GET `/api/admin?type=inquiries` has no authentication check
