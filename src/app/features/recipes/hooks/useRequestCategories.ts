import { useCallback, useEffect, useState } from 'react';


import type { FilterOption, RecipeCategoriesResponse } from '../types/category.types';
import { mapCategoryToOption } from '../mappers/categorie.maper';
import { categoriesMock } from '../../../mocks/categories.mock';

interface UseRequestCategoriesReturn {
    loadingCategories: boolean;
    resultSetCategories: FilterOption[];
    errorCategories: string | null;
    refetchCategories: () => Promise<void>;
    isUsingMock: boolean;
}

export function useRequestCategories(): UseRequestCategoriesReturn {
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [resultSetCategories, setResultSetCategories] = useState<FilterOption[]>([]);
    const [errorCategories, setErrorCategories] = useState<string | null>(null);
    const [isUsingMock, setIsUsingMock] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            setLoadingCategories(true);
            setErrorCategories(null);
            setIsUsingMock(false);

            const response = await fetch(
                'https://www.themealdb.com/api/json/v1/1/categories.php'
            );

            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }

            const data: RecipeCategoriesResponse
                = await response.json();

            const mapped = data.categories.map(mapCategoryToOption);

            setResultSetCategories(mapped);
        } catch (error) {
            console.warn('API falhou, usando mock');

            const mappedMock = categoriesMock.categories.map(mapCategoryToOption);

            setResultSetCategories(mappedMock);
            setIsUsingMock(true);

            const message =
                error instanceof Error
                    ? error.message
                    : 'Erro ao buscar categorias';

            setErrorCategories(message);
        } finally {
            setLoadingCategories(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        loadingCategories,
        resultSetCategories,
        errorCategories,
        refetchCategories: fetchCategories,
        isUsingMock,
    };
}