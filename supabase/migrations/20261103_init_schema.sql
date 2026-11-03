-- Full PostgreSQL Schema for Patil Dealers, Nanded (Used & Old Cars)
-- Execute this script in your Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'manager')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    source TEXT DEFAULT 'direct' CHECK (source IN ('direct', 'website_gate', 'whatsapp', 'showroom_visit', 'referral')),
    welcome_email_sent BOOLEAN DEFAULT FALSE,
    welcome_sms_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CARS TABLE
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    variant TEXT,
    year_of_manufacture INT NOT NULL,
    fuel_type TEXT NOT NULL CHECK (fuel_type IN ('Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid')),
    transmission TEXT NOT NULL CHECK (transmission IN ('Manual', 'Automatic')),
    km_driven INT NOT NULL CHECK (km_driven >= 0),
    owner_count INT NOT NULL DEFAULT 1 CHECK (owner_count >= 1),
    color TEXT,
    registration_number TEXT NOT NULL UNIQUE,
    rto_city TEXT DEFAULT 'Nanded',
    selling_price NUMERIC(12, 2) NOT NULL CHECK (selling_price > 0),
    negotiable BOOLEAN DEFAULT TRUE,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Reserved', 'Sold')),
    is_featured BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. CAR IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.car_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_cover BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PURCHASES TABLE
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
    seller_name TEXT NOT NULL,
    seller_phone TEXT NOT NULL,
    seller_address TEXT,
    purchase_price NUMERIC(12, 2) NOT NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_mode TEXT NOT NULL CHECK (payment_mode IN ('Bank Transfer', 'Cheque', 'Cash', 'UPI', 'Mixed')),
    refurbishment_cost NUMERIC(12, 2) DEFAULT 0.00,
    remarks TEXT,
    paperwork_status TEXT DEFAULT 'Pending' CHECK (paperwork_status IN ('Pending', 'In Progress', 'Completed')),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. SALES RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE RESTRICT,
    buyer_customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    buyer_address TEXT,
    sale_price NUMERIC(12, 2) NOT NULL,
    sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_mode TEXT NOT NULL CHECK (payment_mode IN ('Bank Transfer', 'Cheque', 'Cash', 'UPI', 'Loan / Finance')),
    calculated_profit NUMERIC(12, 2),
    paperwork_transfer_status TEXT DEFAULT 'Pending' CHECK (paperwork_transfer_status IN ('Pending', 'RTO Applied', 'Transferred', 'Delivered')),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. DOCUMENTS TABLE (Stored in Private Storage Bucket)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('car', 'purchase', 'sale', 'customer')),
    entity_id UUID NOT NULL,
    doc_type TEXT NOT NULL CHECK (doc_type IN ('RC', 'Insurance', 'PUC', 'ID_Proof', 'Sale_Agreement', 'NOC', 'Invoice', 'Form29_30', 'Other')),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    file_size_bytes BIGINT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Test Drive Scheduled', 'Closed - Won', 'Closed - Lost')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. TEST DRIVES TABLE
CREATE TABLE IF NOT EXISTS public.test_drives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time_slot TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Requested' CHECK (status IN ('Requested', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. VALUATION REQUESTS TABLE (Sell Your Car)
CREATE TABLE IF NOT EXISTS public.valuation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_name TEXT NOT NULL,
    seller_phone TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year_of_manufacture INT NOT NULL,
    km_driven INT NOT NULL,
    fuel_type TEXT NOT NULL,
    transmission TEXT NOT NULL,
    expected_price NUMERIC(12, 2),
    photos TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'Pending Evaluation' CHECK (status IN ('Pending Evaluation', 'Offer Made', 'Inspected', 'Deal Finalized', 'Rejected')),
    offered_price NUMERIC(12, 2),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. PROFIT TRIGGER
CREATE OR REPLACE FUNCTION public.calculate_sale_profit()
RETURNS TRIGGER AS $$
DECLARE
    v_purchase_price NUMERIC(12, 2) := 0;
    v_refurb_cost NUMERIC(12, 2) := 0;
BEGIN
    SELECT purchase_price, COALESCE(refurbishment_cost, 0)
    INTO v_purchase_price, v_refurb_cost
    FROM public.purchases
    WHERE car_id = NEW.car_id
    ORDER BY created_at DESC
    LIMIT 1;

    IF FOUND THEN
        NEW.calculated_profit := NEW.sale_price - (v_purchase_price + v_refurb_cost);
    ELSE
        NEW.calculated_profit := NEW.sale_price;
    END IF;

    UPDATE public.cars SET status = 'Sold' WHERE id = NEW.car_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_calculate_sale_profit ON public.sales;
CREATE TRIGGER trg_calculate_sale_profit
BEFORE INSERT OR UPDATE OF sale_price, car_id ON public.sales
FOR EACH ROW EXECUTE FUNCTION public.calculate_sale_profit();

-- 12. ROW LEVEL SECURITY
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin_users" ON public.admin_users
    FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Anyone can browse available cars" ON public.cars
    FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage cars" ON public.cars
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Anyone can view car images" ON public.car_images
    FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage car images" ON public.car_images
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Customers can view their own profile" ON public.customers
    FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Customers or anonymous gate can register" ON public.customers
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view and manage all customers" ON public.customers
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Authenticated or visitors can create enquiries" ON public.enquiries
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view and manage enquiries" ON public.enquiries
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Anyone can book test drives" ON public.test_drives
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view and manage test drives" ON public.test_drives
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Anyone can submit valuation requests" ON public.valuation_requests
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view and manage valuations" ON public.valuation_requests
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Only admins can access purchases" ON public.purchases
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Only admins can access sales" ON public.sales
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Only admins can access documents" ON public.documents
    FOR ALL TO authenticated USING (public.is_admin());
