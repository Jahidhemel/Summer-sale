# Summer Sale — Bootstrap 5 Shopping Page

A fully interactive promotional shopping page built with **Bootstrap 5** and vanilla JavaScript. Features a real working cart, coupon validation, and category-tabbed product catalog.

🌐 **Live Demo:** [https://jahidhemel.github.io/Summer-sale/](https://jahidhemel.github.io/Summer-sale/)

---

## ✨ Features

- 🎨 Built with **Bootstrap 5.3** — leveraging native components for navbar, carousel, cards, modals, toasts, and tabs
- 🛒 **Real working cart** — add, increase, decrease, remove; live total recalculation
- 🎟️ **Coupon validation** — enter `SELL200` for 20% off orders 200+; live threshold messaging
- 📋 **Copy-to-clipboard** promo code button
- 🎠 **Hero carousel** with 3 auto-rotating slides (gradient backgrounds)
- 🗧 **Tabbed product catalog** — Kitchenware / Sportswear / Furniture (Bootstrap pills)
- � **Bootstrap toasts** for every cart and coupon action
- 🪟 **Bootstrap modal** for "Make Purchase" demo confirmation
- 📱 Fully responsive — desktop sidebar becomes mobile bottom-of-page
- 🧍 **Sticky navbar** with cart icon + live count badge
- 📅 Auto-updating copyright year
- 🔗 Working footer social links (LinkedIn / Facebook / Email)

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| **Bootstrap 5.3** (CDN) | Layout, components, responsive grid |
| **Bootstrap Icons 1.11** | Iconography |
| **Plus Jakarta Sans** (Google Fonts) | Typography |
| **HTML5** | Semantic markup |
| **Vanilla JavaScript** | Cart logic, coupon, toasts, modals |

---

## 📁 Project Structure

```
Summer-sale/
├── index.html            ← Bootstrap landing page
├── README.md
└── Assets/
    ├── Images/             ← product, banner, and icon images
    └── js/
        └── main.js         ← cart, coupon, toast, modal logic
```

---

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/Jahidhemel/Summer-sale.git

# Move into the project folder
cd Summer-sale

# Open index.html in any modern browser
# (no build step — Bootstrap is loaded via CDN)
```

---

## 🎯 Try It

1. Click any **"+ Add"** button → product appears in the cart with a toast notification
2. Use the cart's **+ / − / ᕕ** buttons to adjust quantity or remove items
3. Type **`SELL200`** into the coupon box → 20% discount kicks in once your cart hits 200 TK
4. Click **"Make Purchase"** → friendly demo modal pops up
5. Resize the browser to mobile width → cart slides below the catalog, navbar collapses to hamburger

---

## 🎨 Design Notes

- **Color palette:** warm coral (`#ff6b35`) primary, sunshine yellow accent, cream backgrounds
- **Typography:** Plus Jakarta Sans (modern, friendly, weights 400–800)
- **Component patterns:** rounded corners (14–28px), soft shadows, gradient hero carousel
- **Bootstrap customization:** CSS variables override `--bs-primary`, `--bs-border-radius`, etc.

---

## 🧠 What I Practiced Building This

- Customizing Bootstrap's CSS variables for a custom theme
- Building a real cart with `Map`-based state management
- Event delegation for dynamically generated cart items
- Using Bootstrap Toasts and Modals programmatically from JavaScript
- Coupon validation with threshold-based messaging
- Sticky sidebar layout with responsive fallback to stacked

---

## 👤 Author

**Md. Jahidul Islam Hemel**
Customer Support Engineer · SaaS & Shopify · Dhaka, Bangladesh

- 🌐 Portfolio: [jahidhemel.github.io](https://jahidhemel.github.io)
- 💼 LinkedIn: [md-jahidul-islam-hemel](https://www.linkedin.com/in/md-jahidul-islam-hemel)
- 📧 Email: jahidhemel@gmail.com

---

## 📄 License

Released for educational and portfolio purposes. Feel free to fork, learn from, or remix the code — credit appreciated.
