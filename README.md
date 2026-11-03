# 🚗 Patil Dealers, Nanded – Production Used Car Showroom System

A modern, mobile-first, zero-running-cost web platform built for **Patil Dealers**, a leading pre-owned car showroom located in **Nanded, Maharashtra**.

---

## 🌟 Key Features

### 1. Public Showroom & Inventory
- **Dynamic Hero Section**: Real-time sales metrics, inspection promises, and animated showcases.
- **Advanced Inventory Search & Filter**: Filter cars by budget slider, brand (Maruti, Hyundai, Tata, Mahindra, etc.), fuel type (Petrol, Diesel, CNG), transmission, and model year.
- **Car Detail Page**: Multi-angle image gallery, 150-point inspection badge, technical specifications, loan EMI calculator, test drive booking form, and click-to-chat WhatsApp button.
- **Sell Your Car Page**: Free online car valuation submission form with instant callback.
- **Local SEO & Google Business Ready**: Schema.org `AutoDealer` structured data, geotags for Nanded, Open Graph tags.

### 2. Login Gate & Customer Acquisition
- Seamlessly allows browsing of home and inventory listings.
- Unlocking complete car inspection papers, test drives, or inquiries prompts an OTP login gate (mobile/email).
- Stores registered customer details with zero friction and welcome notification dispatch.

### 3. Dealership Owner Admin Portal (`/admin`)
- **Executive Dashboard**: Real-time units in stock, monthly sales, realized revenue, and calculated net profit.
- **Inventory Wizard**: 3-step car onboarding wizard with specifications, features, image links, and status toggles.
- **Purchase Records**: Full inward register recording seller details, purchase price, refurbishment expenses, and RTO paperwork status.
- **Sales & Profit Register**: Buyer details, automated profit calculation (`Sale Price - (Purchase + Refurbishment)`), and RTO transfer tracking.
- **Document Vault**: Private Supabase storage bucket interface for RC smart cards, insurance policies, and Form 29/30 transfer deeds.
- **Data Export**: One-click **Excel / CSV export** on every table.

### 4. Zero-Cost Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, React Router v7, Framer Motion, Lucide Icons, SheetJS (`xlsx`).
- **Backend**: Supabase (PostgreSQL with RLS, Auth, Storage).
- **Notifications**: Resend (Welcome Email) + MSG91 (DLT SMS toggle via Edge Function).
- **Deployment**: Vercel (zero-cost hobby tier).
- **Future AI Voice Agent**: Webhook endpoints ready for greeting calls and visitor query resolution (Gemini Live / MSG91 Voice / Exotel).

---

## 🚀 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update with your Supabase credentials.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🗄️ Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the migration script:
   - `supabase/migrations/20261103_init_schema.sql`
3. In **Storage**, create:
   - `car-media` (Public bucket)
   - `dealership-documents` (Private bucket, accessible via signed URLs)
4. Deploy the Supabase Edge Functions:
   - `supabase/functions/send-welcome-notifications`
   - `supabase/functions/voice-agent-webhook`

---

## 🌐 Deploy to Vercel (Zero Cost)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: Patil Dealers Nanded production release"
   git push origin main
   ```
2. Import the repository in [vercel.com](https://vercel.com).
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will build the Vite project using `vercel.json` rewrites.
