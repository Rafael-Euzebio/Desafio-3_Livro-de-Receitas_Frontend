/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import { filterByCategory, searchMealByName } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import type { Meal } from "../models/Meal";

interface UseMealsProps {
  defaultCategory?: string;
}

export function useMeals({ defaultCategory = "Beef" }: UseMealsProps = {}) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnectionError, setIsConnectionError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleApiError = useCallback((error: any): string => {
    const errorMessage = error?.message || error?.toString() || "";
    
    if (
      errorMessage.includes("conexão") ||
      errorMessage.includes("internet") ||
      errorMessage.includes("ECONNABORTED") ||
      errorMessage.includes("Network Error")
    ) {
      setIsConnectionError(true);
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }

    if (errorMessage.includes("timeout")) {
      setIsConnectionError(true);
      return "Tempo limite excedido. Verifique sua conexão e tente novamente.";
    }

    setIsConnectionError(false);
    return "Erro ao carregar receitas. Tente novamente.";
  }, []);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsConnectionError(false);

      if (searchTerm) {
        await searchMealByName(searchTerm, (data: Meal[]) => {
          if (data && data.length > 0) {
            setMeals(data);
          } else {
            setMeals([]);
            setError(`Nenhuma receita encontrada para "${searchTerm}"`);
          }
        });
      } else {
        await filterByCategory(selectedCategory, (data: any[]) => {
          if (data && data.length > 0) {
            setMeals(data);
          } else {
            setMeals([]);
            setError(`Nenhuma receita encontrada para a categoria ${selectedCategory}`);
          }
        });
      }
    } catch (error: any) {
      console.error("Erro ao buscar receitas:", error);
      const userMessage = handleApiError(error);
      setError(userMessage);
      ToastAlerta(userMessage, "erro");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, handleApiError]);

  const updateCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchTerm("");
  }, []);

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedCategory("");
  }, []);

  const resetFilters = useCallback((defaultCategory: string) => {
    setSelectedCategory(defaultCategory);
    setSearchTerm("");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    meals,
    isLoading,
    error,
    isConnectionError,
    selectedCategory,
    searchTerm,
    fetchMeals,
    updateCategory,
    updateSearchTerm,
    resetFilters,
    clearError,
  };
}