import { useMemo, useState } from "react";
import type { Property } from "../types/types";
import { parsePrice } from "./parsePrice";

export type FilterState = {
  propertyType: string[];
  bhk: string[];
  furnished: string[];
  availability: string[];
  parking: string[];
  city: string[];
  priceMin: string;
  priceMax: string;
};

export const INITIAL_FILTERS: FilterState = {
  propertyType: [],
  bhk: [],
  furnished: [],
  availability: [],
  parking: [],
  city: [],
  priceMin: "",
  priceMax: "",
};

export function usePropertyFilters(properties: Property[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setFilters(INITIAL_FILTERS);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(p.type))
        return false;
      if (filters.bhk.length > 0) {
        const match = filters.bhk.some((b) => {
          if (b === "4+ BHK") {
            const num = parseInt(p.bhk);
            return !isNaN(num) && num >= 4;
          }
          return p.bhk === b;
        });
        if (!match) return false;
      }
      if (filters.furnished.length > 0 && !filters.furnished.includes(p.furnished))
        return false;
      if (filters.availability.length > 0 && !filters.availability.includes(p.availability))
        return false;
      if (filters.parking.length > 0 && !filters.parking.includes(p.parking))
        return false;
      if (filters.city.length > 0 && !filters.city.includes(p.city)) return false;
      if (filters.priceMin) {
        const min = parsePrice(filters.priceMin);
        if (parsePrice(p.price) < min) return false;
      }
      if (filters.priceMax) {
        const max = parsePrice(filters.priceMax);
        if (parsePrice(p.price) > max) return false;
      }
      return true;
    });
  }, [properties, filters]);

  return { filters, setFilter, clearAll, filtered, total: properties.length, shown: filtered.length };
}
