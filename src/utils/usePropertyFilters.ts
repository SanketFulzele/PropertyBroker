import { useMemo, useState } from "react";
import type { Property } from "../types/types";
import { parsePrice } from "./parsePrice";

export type FilterState = {
  locality: string[];
  propertyType: string[];
  bhk: string[];
  budgetMin: number;
  budgetMax: number;
  areaMin: number;
  areaMax: number;
  furnished: string[];
  possession: string[];
  availability: string[];
  propertyAge: string[];
  facing: string[];
  ownership: string[];
  parking: string[];
  bathrooms: number[];
  floor: string[];
};

export const INITIAL_FILTERS: FilterState = {
  locality: [],
  propertyType: [],
  bhk: [],
  budgetMin: 500000,
  budgetMax: 50000000,
  areaMin: 300,
  areaMax: 6000,
  furnished: [],
  possession: [],
  availability: [],
  propertyAge: [],
  facing: [],
  ownership: [],
  parking: [],
  bathrooms: [],
  floor: [],
};

export function usePropertyFilters(properties: Property[], initialLocality: string = "") {
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...INITIAL_FILTERS,
    locality: initialLocality ? [initialLocality] : [],
  }));

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.locality.length > 0 ||
      filters.propertyType.length > 0 ||
      filters.bhk.length > 0 ||
      filters.budgetMin !== INITIAL_FILTERS.budgetMin ||
      filters.budgetMax !== INITIAL_FILTERS.budgetMax ||
      filters.areaMin !== INITIAL_FILTERS.areaMin ||
      filters.areaMax !== INITIAL_FILTERS.areaMax ||
      filters.furnished.length > 0 ||
      filters.possession.length > 0 ||
      filters.availability.length > 0 ||
      filters.propertyAge.length > 0 ||
      filters.facing.length > 0 ||
      filters.ownership.length > 0 ||
      filters.parking.length > 0 ||
      filters.bathrooms.length > 0 ||
      filters.floor.length > 0
    );
  }, [filters]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.locality.length > 0 && !filters.locality.includes(p.locality))
        return false;
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
      const price = parsePrice(p.price);
      if (price < filters.budgetMin || price > filters.budgetMax) return false;
      const areaNum = parseInt(p.area.replace(/[^0-9]/g, ""));
      if (!isNaN(areaNum) && (areaNum < filters.areaMin || areaNum > filters.areaMax))
        return false;
      if (filters.furnished.length > 0 && !filters.furnished.includes(p.furnished))
        return false;
      if (filters.possession.length > 0 && !filters.possession.includes(p.possession))
        return false;
      if (filters.availability.length > 0 && !filters.availability.includes(p.availability))
        return false;
      if (filters.propertyAge.length > 0 && !filters.propertyAge.includes(p.propertyAge))
        return false;
      if (filters.facing.length > 0 && !filters.facing.includes(p.facing))
        return false;
      if (filters.ownership.length > 0 && !filters.ownership.includes(p.ownership))
        return false;
      if (filters.parking.length > 0 && !filters.parking.includes(p.parking))
        return false;
      if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(p.bathrooms))
        return false;
      if (filters.floor.length > 0 && !filters.floor.includes(p.floor))
        return false;
      return true;
    });
  }, [properties, filters]);

  return { filters, setFilter, clearAll, filtered, hasActiveFilters, total: properties.length, shown: filtered.length };
}
