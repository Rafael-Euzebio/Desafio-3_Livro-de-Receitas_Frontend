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
    selectedExtraFilters: string[];
}

interface UseRecipeFiltersParams {
    extraFilters: ExtraFilterOption[];
    onFiltersChange?: (filters: RecipeFiltersState) => void;
}

interface UseRecipeFiltersReturn {
    search: string;
    selectedCategories: string[];
    selectedExtraFilters: string[];
    activeFilters: ActiveFilterItem[];
    handleSearchChange: (value: string) => void;
    toggleCategory: (category: string) => void;
    toggleExtraFilter: (filterId: string) => void;
    clearAllFilters: () => void;
    handleRemoveActiveFilter: (item: ActiveFilterItem) => void;
    clearCategories: () => void;
}

export function useRecipeFilters({
    extraFilters,
    onFiltersChange,
}: UseRecipeFiltersParams): UseRecipeFiltersReturn {
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedExtraFilters, setSelectedExtraFilters] = useState<string[]>([]);

    function emitFiltersChange(nextState: RecipeFiltersState) {
        onFiltersChange?.(nextState);
    }

    function toggleCategory(category: string) {
        setSelectedCategories(prev => {
            const updated = prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category];

            emitFiltersChange({
                search,
                selectedCategories: updated,
                selectedExtraFilters,
            });

            return updated;
        });
    }

    function toggleExtraFilter(filterId: string) {
        setSelectedExtraFilters(prev => {
            const updated = prev.includes(filterId)
                ? prev.filter(item => item !== filterId)
                : [...prev, filterId];

            emitFiltersChange({
                search,
                selectedCategories,
                selectedExtraFilters: updated,
            });

            return updated;
        });
    }

    function handleSearchChange(value: string) {
        setSearch(value);

        emitFiltersChange({
            search: value,
            selectedCategories,
            selectedExtraFilters,
        });
    }

    function clearAllFilters() {
        setSearch('');
        setSelectedCategories([]);
        setSelectedExtraFilters([]);

        emitFiltersChange({
            search: '',
            selectedCategories: [],
            selectedExtraFilters: [],
        });
    }

    function clearCategories() {
        setSelectedCategories([]);

        emitFiltersChange({
            search,
            selectedCategories: [],
            selectedExtraFilters,
        });
    }

    const activeFilters = useMemo(() => {
        const categories = selectedCategories.map(category => ({
            id: category,
            label: category,
            type: 'category' as const,
        }));

        const extras = extraFilters
            .filter(filter => selectedExtraFilters.includes(filter.id))
            .map(filter => ({
                id: filter.id,
                label: filter.label,
                type: 'extra' as const,
            }));

        return [...categories, ...extras];
    }, [extraFilters, selectedCategories, selectedExtraFilters]);

    function handleRemoveActiveFilter(item: ActiveFilterItem) {
        if (item.type === 'category') {
            const updated = selectedCategories.filter(category => category !== item.id);
            setSelectedCategories(updated);

            emitFiltersChange({
                search,
                selectedCategories: updated,
                selectedExtraFilters,
            });

            return;
        }

        const updated = selectedExtraFilters.filter(filter => filter !== item.id);
        setSelectedExtraFilters(updated);

        emitFiltersChange({
            search,
            selectedCategories,
            selectedExtraFilters: updated,
        });
    }

    return {
        search,
        selectedCategories,
        selectedExtraFilters,
        activeFilters,
        handleSearchChange,
        toggleCategory,
        toggleExtraFilter,
        clearAllFilters,
        handleRemoveActiveFilter,
        clearCategories,

    };
}