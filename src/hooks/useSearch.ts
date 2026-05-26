import { useState, useCallback } from "react";

export function useSearch(initialSearchTerm: string = "") {
  const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>(initialSearchTerm);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveSearchTerm(searchInput.trim());
    } else if (searchInput === "") {
      setActiveSearchTerm("");
      setSearchInput("");
    }
  }, [searchInput]);

  const clearSearch = useCallback(() => {
    setSearchInput("");
    setActiveSearchTerm("");
  }, []);

  const clearSearchInput = useCallback(() => {
    setSearchInput("");
  }, []);

  const setSearchValue = useCallback((value: string) => {
    setSearchInput(value);
    setActiveSearchTerm(value);
  }, []);

  // Retornar setSearchInput também para uso direto quando necessário
  return {
    searchInput,
    setSearchInput,  // Adicionado aqui!
    activeSearchTerm,
    handleSearch,
    clearSearch,
    clearSearchInput,
    setSearchValue,
  };
}