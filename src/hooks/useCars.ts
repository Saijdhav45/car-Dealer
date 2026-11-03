import { useState, useEffect } from "react";
import { Car } from "../types";
import { MOCK_CARS } from "../data/mockData";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  transmission?: string;
  maxKm?: number;
  ownerCount?: number;
  searchQuery?: string;
  sortBy?: "price-asc" | "price-desc" | "year-desc" | "km-asc";
}

export function useCars(filters?: CarFilters) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCars() {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        // Use Mock data
        let result = [...MOCK_CARS];

        if (filters?.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          result = result.filter(
            (c) =>
              c.brand.toLowerCase().includes(q) ||
              c.model.toLowerCase().includes(q) ||
              (c.variant && c.variant.toLowerCase().includes(q))
          );
        }

        if (filters?.brand && filters.brand !== "All") {
          result = result.filter((c) => c.brand.toLowerCase() === filters.brand?.toLowerCase());
        }

        if (filters?.fuelType && filters.fuelType !== "All") {
          result = result.filter((c) => c.fuel_type.toLowerCase() === filters.fuelType?.toLowerCase());
        }

        if (filters?.transmission && filters.transmission !== "All") {
          result = result.filter((c) => c.transmission.toLowerCase() === filters.transmission?.toLowerCase());
        }

        if (filters?.maxPrice) {
          result = result.filter((c) => c.selling_price <= (filters.maxPrice || Infinity));
        }

        if (filters?.maxKm) {
          result = result.filter((c) => c.km_driven <= (filters.maxKm || Infinity));
        }

        if (filters?.ownerCount) {
          result = result.filter((c) => c.owner_count <= (filters.ownerCount || Infinity));
        }

        // Sorting
        if (filters?.sortBy === "price-asc") {
          result.sort((a, b) => a.selling_price - b.selling_price);
        } else if (filters?.sortBy === "price-desc") {
          result.sort((a, b) => b.selling_price - a.selling_price);
        } else if (filters?.sortBy === "year-desc") {
          result.sort((a, b) => b.year_of_manufacture - a.year_of_manufacture);
        } else if (filters?.sortBy === "km-asc") {
          result.sort((a, b) => a.km_driven - b.km_driven);
        }

        if (isMounted) {
          setCars(result);
          setLoading(false);
        }
        return;
      }

      try {
        let query = supabase.from("cars").select("*, images:car_images(*)");
        if (filters?.brand && filters.brand !== "All") {
          query = query.ilike("brand", filters.brand);
        }
        if (filters?.fuelType && filters.fuelType !== "All") {
          query = query.eq("fuel_type", filters.fuelType);
        }
        if (filters?.transmission && filters.transmission !== "All") {
          query = query.eq("transmission", filters.transmission);
        }
        if (filters?.maxPrice) {
          query = query.lte("selling_price", filters.maxPrice);
        }

        const { data, error } = await query;
        if (error) throw error;

        if (isMounted) {
          setCars(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Supabase car fetch error:", err);
        if (isMounted) {
          setCars(MOCK_CARS);
          setLoading(false);
        }
      }
    }

    loadCars();
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(filters)]);

  return { cars, loading };
}
