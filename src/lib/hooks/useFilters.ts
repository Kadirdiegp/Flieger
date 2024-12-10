import { useState, useCallback } from 'react';

export interface FilterState {
  category: string;
  size: string;
  color: string;
  priceRange: [number, number];
}

export const useFilters = (initialState: FilterState) => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => {
      // Special handling for color filter
      if (key === 'color' && prev.color === value) {
        return { ...prev, [key]: 'all' };
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  return {
    filters,
    updateFilter,
    resetFilters
  };
};