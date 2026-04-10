import { useMemo, useState } from 'react';

export interface ExtraFilterOption {
    id: string;
    label: string;
}

export interface ActiveFilterItem {
    id: string;
    label: string;
    type: 'category' | 'extra';
}

export interface RecipeFiltersState {
    search: string;
    selectedCategories: string[];

}

interface UseRecipeFiltersParams {
    onFiltersChange?: (filters: RecipeFiltersState, isCategory: boolean) => void;
}

interface UseRecipeFiltersReturn {
    search: string;
    selectedCategories: string[];

    activeFilters: ActiveFilterItem[];
    handleSearchChange: (value: string) => void;
    toggleCategory: (category: string) => void;
    clearAllFilters: () => void;
    handleRemoveActiveFilter: (item: ActiveFilterItem) => void;
    clearCategories: () => void;
}

export function useRecipeFilters({
    onFiltersChange,
}: UseRecipeFiltersParams): UseRecipeFiltersReturn {
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    function emitFiltersChange(nextState: RecipeFiltersState) {
        onFiltersChange?.(nextState, true);
    }

    function toggleCategory(category: string) {        
        setSelectedCategories(() => {
            const updated = [category]

            emitFiltersChange({
                search,
                selectedCategories: updated,
            });

            return updated;
        });
    }


    function handleSearchChange(value: string) {
        setSearch(value);
    }

    function clearAllFilters() {
        setSearch('');
        setSelectedCategories([]);

        emitFiltersChange({
            search: '',
            selectedCategories: [],
        });
    }

    function clearCategories() {
        setSelectedCategories([]);

        emitFiltersChange({
            search,
            selectedCategories: [],

        });
    }

    const activeFilters = useMemo(() => {
        const categories = selectedCategories.map(category => ({
            id: category,
            label: category,
            type: 'category' as const,
        }));


        return [...categories];
    }, [selectedCategories]);

    function handleRemoveActiveFilter(item: ActiveFilterItem) {
        if (item.type === 'category') {
            const updated = selectedCategories.filter(category => category !== item.id);
            setSelectedCategories(updated);

            emitFiltersChange({
                search,
                selectedCategories: updated,

            });

            return;
        }


        emitFiltersChange({
            search,
            selectedCategories,
        });
    }

    return {
        search,
        selectedCategories,
        activeFilters,
        handleSearchChange,
        toggleCategory,
        clearAllFilters,
        handleRemoveActiveFilter,
        clearCategories,

    };
}