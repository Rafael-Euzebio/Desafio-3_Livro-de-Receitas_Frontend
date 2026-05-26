/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import { getCategoryList } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      setErrorCategories(null);
      
      await getCategoryList((data: string[]) => {
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories([]);
          setErrorCategories("Nenhuma categoria encontrada");
        }
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
      const errorMessage = error?.message || "Erro ao carregar categorias";
      setErrorCategories(errorMessage);
      ToastAlerta(errorMessage, "erro");
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  return {
    categories,
    isLoadingCategories,
    errorCategories,
    fetchCategories,
  };
}