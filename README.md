# NOVA Store — Ecommerce Frontend Template

A clean, modern multi-category ecommerce frontend built with **React**, **Vite**, and **Tailwind CSS**.

---

## Features

- **Hero section** — split layout with stats and CTA
- **Product Grid** — filterable by category, sortable by price/rating
- **Product Detail** — image, features, qty picker, related products
- **Cart Drawer** — slide-in with qty controls, free shipping threshold
- **Checkout** — validated form, order summary, success screen
- **Cart Context** — global state with `useReducer`
- Fully responsive (mobile-first)
- No external UI libraries — pure Tailwind CSS

---

## Project Structure

```
nova-store/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component + page routing
    ├── index.css             # Tailwind directives + global styles
    ├── context/
    │   └── CartContext.jsx   # Cart state (useReducer + Context API)
    ├── data/
    │   └── products.js       # Mock product data
    ├── components/
    │   ├── Navbar.jsx        # Sticky nav with cart badge
    │   ├── Hero.jsx          # Homepage hero section
    │   ├── ProductCard.jsx   # Reusable product card
    │   ├── ProductGrid.jsx   # Filterable + sortable grid
    │   ├── StarRating.jsx    # Reusable star rating display
    │   ├── Cart.jsx          # Slide-in cart drawer
    │   └── Footer.jsx        # Footer with newsletter
    └── pages/
        ├── Home.jsx          # Home page
        ├── ProductDetail.jsx # Single product page
        └── Checkout.jsx      # Checkout form + order summary
```

---

## Getting Started

### 1. Clone or copy the project

```bash
# If using git
git clone <your-repo-url>
cd nova-store

# Or create fresh with Vite
npm create vite@latest nova-store -- --template react
cd nova-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Replace config files

Copy the provided `tailwind.config.js`, `postcss.config.js`, and `vite.config.js` into your project root.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready to deploy to Vercel, Netlify, or any static host.

---

## Customisation Guide

| What to change | Where |
|---|---|
| Products & categories | `src/data/products.js` |
| Brand name & nav links | `src/components/Navbar.jsx` |
| Hero copy & image | `src/components/Hero.jsx` |
| Color scheme | `tailwind.config.js` → `colors` |
| Font | `index.html` + `tailwind.config.js` → `fontFamily` |
| Shipping threshold | `src/context/CartContext.jsx` |
| Footer links | `src/components/Footer.jsx` |

---

## Connecting a Real Backend

To replace mock data with a real API:

1. **Products** — fetch from your API in `src/data/products.js` or create a `useProducts` hook
2. **Cart** — persist to `localStorage` or sync with a backend session
3. **Checkout** — integrate Stripe, Paystack (great for Nigeria), or Flutterwave
4. **Auth** — add a `UserContext` similar to `CartContext`

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 3 |
| PostCSS | 8 |

---

## License

MIT — free to use for personal and commercial projects.
