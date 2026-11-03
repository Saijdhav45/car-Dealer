export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  thumbnail_url?: string;
  is_cover: boolean;
  display_order: number;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant?: string;
  year_of_manufacture: number;
  fuel_type: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  km_driven: number;
  owner_count: number;
  color?: string;
  registration_number: string;
  rto_city: string;
  selling_price: number;
  negotiable: boolean;
  description?: string;
  features: string[];
  status: "Available" | "Reserved" | "Sold";
  is_featured: boolean;
  created_at: string;
  images: CarImage[];
}

export interface Customer {
  id: string;
  user_id?: string;
  full_name: string;
  phone: string;
  email?: string;
  source: string;
  created_at: string;
}

export interface PurchaseRecord {
  id: string;
  car_id?: string;
  car_title?: string;
  seller_name: string;
  seller_phone: string;
  seller_address?: string;
  purchase_price: number;
  purchase_date: string;
  payment_mode: string;
  refurbishment_cost: number;
  remarks?: string;
  paperwork_status: "Pending" | "In Progress" | "Completed";
  created_at: string;
}

export interface SaleRecord {
  id: string;
  car_id: string;
  car_title?: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_address?: string;
  sale_price: number;
  sale_date: string;
  payment_mode: string;
  calculated_profit: number;
  paperwork_transfer_status: "Pending" | "RTO Applied" | "Transferred" | "Delivered";
  created_at: string;
}

export interface Enquiry {
  id: string;
  car_id?: string;
  car_name?: string;
  name: string;
  phone: string;
  message?: string;
  status: "New" | "Contacted" | "Test Drive Scheduled" | "Closed - Won" | "Closed - Lost";
  created_at: string;
}

export interface TestDrive {
  id: string;
  car_id: string;
  car_name?: string;
  name: string;
  phone: string;
  preferred_date: string;
  preferred_time_slot: string;
  status: "Requested" | "Confirmed" | "Completed" | "Cancelled";
  created_at: string;
}

export interface ValuationRequest {
  id: string;
  seller_name: string;
  seller_phone: string;
  brand: string;
  model: string;
  year_of_manufacture: number;
  km_driven: number;
  fuel_type: string;
  transmission: string;
  expected_price?: number;
  photos?: string[];
  status: "Pending Evaluation" | "Offer Made" | "Inspected" | "Deal Finalized" | "Rejected";
  offered_price?: number;
  created_at: string;
}
