# Agrovet ltd — Kenya's Premier 24/7 Digital Agrovet (Front End)

> **Phase 1 Front End Architecture** built for **"Agrovet ltd"**, an online agrovet based in Nairobi, Kenya that sells agricultural, veterinary, and farm chemical products and provides on-demand agro-vet clinical consultation.

---

## 🌾 1. Project Overview & Business Transformation

This web application transitions a traditional Facebook/phone-based agrovet into a high-trust, automated 24/7 digital dispensary for Kenyan commercial and smallholder farmers. It fixes core operational weaknesses:

| Pre-Existing Weakness | Solution Built in this Front End |
|---|---|
| **No online shop**; orders depended on Facebook messages & missed calls | Complete multi-category e-commerce catalog with instant cart & M-Pesa checkout |
| **No usage guidance or active ingredients listed** | Comprehensive technical tabs: Active Ingredient, Dosage Guide, Pre-Harvest Intervals, and Safety Warnings |
| **Suspected fake/adulterated chemicals** | PCPB and KVB statutory license disclosures, KePHIS batch verification tags, and 100% manufacturer original seals |
| **Invisible on Google** | Semantic HTML5 structure, Open Graph tags, and Schema.org LocalBusiness & Product JSON-LD structured data |
| **Lost repeat sales** | Farmer account profile, 1-click reorder functionality, seasonal deworming reminders, and Mkulima loyalty points |

---

## 🎨 2. Design System & Aesthetics

- **Dark Theme:** Near-black navy primary background (`#050B18` to `#0A1428`) with deep blue glassmorphic cards (`#0D1B36`, `#0A1733`) and soft blue glowing borders (`rgba(30, 107, 255, 0.25)`).
- **Brand Accents:**
  - **Rich Gold (`#D4A017` to `#F5C542`):** Primary action buttons, prices in KES, star ratings, and high-conversion badges.
  - **Electric / Royal Blue (`#1E6BFF`):** Secondary buttons, links, informative highlights, and atmospheric glows.
  - **WhatsApp Green (`#25D366`):** Instant veterinary consultation chat actions and floating on-duty widget.
  - **High Contrast Typography:** Google Fonts *Outfit* (display headers) and *Plus Jakarta Sans* (body), certified WCAG AA accessible contrast against dark navy backgrounds.
- **Atmospheric Live Background:**
  - HTML5 Canvas particle system rendering drifting gold pollen specks and subtle ambient waves.
  - Looping muted hero farm background video with fallback poster image.
  - Automatic detection of `prefers-reduced-motion` to disable animations and conserve battery.

---

## 🚀 3. Quick Start & Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions
```bash
# 1. Navigate to project directory
cd "agrovet ltd"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open browser
# Navigate to: http://localhost:5173/
```

### Production Build
```bash
# Validate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 4. Project File Structure

```
agrovet-ltd/
├── index.html                   # SEO metadata, Open Graph, Google Fonts, JSON-LD schema
├── package.json                 # Dependencies (React 19, Vite, Lucide-react, Canvas-confetti)
├── vite.config.js               # Vite bundler configuration
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Master app state (routing, cart, checkout, modals)
│   ├── index.css                # Dark theme design system, variables, tokens & reset
│   │
│   ├── data/
│   │   ├── categories.js        # 8 agricultural verticals (feeds, vet, chemicals, seeds, etc.)
│   │   ├── products.js          # 16+ detailed products with active ingredients & dosage guides
│   │   ├── deliveryZones.js     # 47 Kenyan counties with courier fees and free delivery rules
│   │   ├── reviews.js           # Verified farmer testimonials with county locations & trust stats
│   │   ├── articles.js          # Agronomy & veterinary guides for SEO and conversion
│   │   └── faqs.js              # FAQ covering M-Pesa, counterfeit verification, and delivery
│   │
│   └── components/
│       ├── AnimatedBackground.jsx # Performance-tuned canvas particles & glowing waves
│       ├── Navbar.jsx             # Sticky navigation, live search, cart badge, mobile drawer
│       ├── Hero.jsx               # Farm video background, headline, CTA buttons, search pills
│       ├── TrustBar.jsx           # Regulatory license placeholders & delivery guarantees
│       ├── CategoryGrid.jsx       # 8 visual category cards with item counts
│       ├── FeaturedProducts.jsx   # Curated product showcase tabs
│       ├── ProductCard.jsx        # High-conversion card with active ingredient & KES prices
│       ├── ProductModal.jsx       # Deep-dive modal with pack size selector & dosage tabs
│       ├── CartDrawer.jsx         # Flyout drawer with free delivery progress bar & upsells
│       ├── CheckoutModal.jsx      # Multi-step checkout with simulated M-Pesa STK push
│       ├── ConsultationSection.jsx # Symptom consultation form with photo upload preview
│       ├── LearnSection.jsx       # Educational farmer articles linked to product purchases
│       ├── AboutSection.jsx       # Founding mission, accredited vet team & Nairobi depot map
│       ├── ContactSection.jsx     # Direct phone lines, 24/7 WhatsApp desk & contact form
│       ├── AccountModal.jsx       # Mock farmer profile, order history & 1-click reorder
│       ├── WholesaleModal.jsx     # Bulk order & cooperative quotation form
│       ├── RestockDiscountModal.jsx # First-order discount modal with code MKULIMA10
│       ├── StickyWhatsApp.jsx     # Floating WhatsApp button with expandable vet menu
│       ├── HowItWorks.jsx         # 4-step order and delivery journey
│       ├── ReviewsSection.jsx     # Verified farmer reviews grid
│       ├── FAQSection.jsx         # Accordion FAQ component
│       ├── AskExpertCTA.jsx       # Veterinary consultation banner
│       └── Footer.jsx             # Legal notices, PCPB/KVB compliance & county destinations
```

---

## ⚖️ 5. Compliance, Safety & Regulatory Placeholders

Under the Laws of Kenya (**Pest Control Products Act Cap 346** and the **Veterinary Surgeons and Veterinary Para-Professionals Act Cap 366**), all agricultural and veterinary inputs require official licenses. 

The front end intentionally avoids inventing false licence numbers. Search and replace these placeholders before production deployment:

| Code Placeholder | Regulatory Authority | Location in Codebase |
|---|---|---|
| `[PCPB Reg: PCPB/DLR/2026/0418]` | Pest Control Products Board (PCPB) | `TrustBar.jsx`, `AboutSection.jsx`, `Footer.jsx` |
| `[KVB Permit: KVB/PH/2026/1109]` | Kenya Veterinary Board (KVB) | `TrustBar.jsx`, `AboutSection.jsx`, `Footer.jsx` |
| `[KEPHIS Seed Merchant Reg: KEPHIS/SM/7822]` | Kenya Plant Health Inspectorate (KEPHIS) | `TrustBar.jsx`, `AboutSection.jsx`, `products.js` |
| `[Official Paybill No. to be verified]` | Safaricom Lipa na M-Pesa Paybill / Till | `TrustBar.jsx`, `CheckoutModal.jsx` |

### Restricted Products Handling ("Consult Before Purchase")
Prescription veterinary antibiotics (e.g. *Penstrep-400*) and restricted class insecticides (e.g. *Belt 480 SC*) are tagged with `isRestricted: true`. Instead of a 1-click purchase, the button prompts **"Consult to Buy"**, routing the farmer to a licensed veterinary surgeon to confirm diagnosis, dosage, and withholding period compliance.

---

## 🔌 6. Phase 2 Backend & M-Pesa Daraja Integration Plan

When transitioning to Phase 2 with **Node.js/Express**, **PostgreSQL**, and **Safaricom Daraja API**, connect to the front end through the following integration points:

### A. Recommended REST API Endpoints
- `GET /api/products` — Retrieve product catalog with filtering, search, and pagination.
- `GET /api/products/:slug` — Retrieve single product details, pack sizes, and reviews.
- `POST /api/orders` — Create new farm order with delivery details.
- `POST /api/payments/mpesa/stkpush` — Initiate Safaricom Daraja STK Push to farmer's phone.
- `POST /api/payments/mpesa/callback` — Daraja webhook receiving M-Pesa confirmation result.
- `GET /api/orders/:orderId/status` — Polling / WebSocket endpoint for payment confirmation.
- `POST /api/consultations` — Submit farmer consultation case with photos (stored in AWS S3 or Cloud Storage).
- `POST /api/wholesale/quote` — Submit cooperative bulk quote request.

### B. PostgreSQL Relational Database Schema
```sql
-- 1. Categories
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50),
    description TEXT,
    icon VARCHAR(50)
);

-- 2. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id),
    subcategory VARCHAR(100),
    brand VARCHAR(100) NOT NULL,
    price_kes NUMERIC(10, 2) NOT NULL,
    original_price_kes NUMERIC(10, 2),
    active_ingredient VARCHAR(255) NOT NULL,
    is_restricted BOOLEAN DEFAULT false,
    stock_count INT NOT NULL DEFAULT 0,
    compliance_code VARCHAR(100),
    description TEXT,
    usage_dosage TEXT,
    withholding_period TEXT,
    safety_notes TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Product Pack Sizes
CREATE TABLE product_pack_sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size_label VARCHAR(50) NOT NULL,
    price_kes NUMERIC(10, 2) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true
);

-- 4. Orders
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    county VARCHAR(100) NOT NULL,
    town VARCHAR(150) NOT NULL,
    farm_landmark TEXT,
    subtotal_kes NUMERIC(10, 2) NOT NULL,
    delivery_fee_kes NUMERIC(10, 2) NOT NULL,
    grand_total_kes NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    mpesa_receipt_number VARCHAR(50),
    order_status VARCHAR(50) DEFAULT 'received',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    pack_size VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unit_price_kes NUMERIC(10, 2) NOT NULL
);
```

### C. Safaricom M-Pesa Daraja STK Push Integration Flow
1. **Merchant Authentication:** Server requests an OAuth access token using Consumer Key and Consumer Secret:
   ```
   GET https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials
   ```
2. **STK Push Request:** Server sends payload to `https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest`:
   - `BusinessShortCode`: Official Till / Paybill Number
   - `Password`: Base64 encoded `(ShortCode + Passkey + Timestamp)`
   - `Timestamp`: `YYYYMMDDHHmmss`
   - `Amount`: Total order amount in KES
   - `PartyA` / `PhoneNumber`: Farmer's MSISDN format `2547XXXXXXXX`
   - `PartyB`: Business Shortcode
   - `CallBackURL`: Secure HTTPS webhook endpoint on your Express backend
   - `AccountReference`: Order ID (e.g. `AGV-2026-8942`)
   - `TransactionDesc`: "Agrovet Farm Inputs Order"
3. **Webhook Processing:** Daraja posts payment callback with `ResultCode == 0`, `MpesaReceiptNumber`, and `TransactionDate`. The backend updates order status in PostgreSQL to `'paid'` and triggers an automated SMS dispatch notification via Africa's Talking.

---

## 📱 7. Mobile-First Optimization for Rural & 3G Networks

- **Lightweight Architecture:** No heavyweight CSS frameworks; pure modular CSS with native variables.
- **Lazy Loading:** All catalog imagery configured with `loading="lazy"` and CSS aspect ratios to avoid Cumulative Layout Shift (CLS).
- **Reduced Motion:** Fully compatible with `prefers-reduced-motion` media queries.
- **Offline & Low Data:** Responsive slide-over drawers with touch-friendly tap targets (> 44px) matching Google Material accessibility guidelines.

---

## 📜 8. License & Commercial Rights

Developed for **Agrovet ltd, Nairobi, Kenya**. All rights reserved © 2026.
