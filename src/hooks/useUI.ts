
import { useState, useCallback } from "react";

export function useUI() {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const hideFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  return {
    showFilters,
    toggleFilters,
    hideFilters,
  };
}