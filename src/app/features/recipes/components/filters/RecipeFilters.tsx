import { useRequestCategories } from '../../hooks/useRequestCategories';
import { ActiveFilters } from './ActiveFilter';
import { useRecipeFilters } from '../../hooks/useRecipeFilters';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ExtraFilters, type ExtraFilterOption } from './ExtraFilters';
import { SearchRecipeFilter } from './SearchRecipeFilter';
import { Button } from '../../../../components/Header/ActionButton';
import { RecipeCategoriesOptions } from './RecipeCategoriesOptions';






interface MealFiltersProps {
    extraFilters?: ExtraFilterOption[];
    onFiltersChange?: (filters: {
        search: string;
        selectedCategories: string[];
        selectedExtraFilters: string[];
    }) => void;
}
const extraFiltersArray = [
    { id: 'quick', label: 'Rápidas (até 30 min)' },
    { id: 'easy', label: 'Fáceis' },
    { id: 'healthy', label: 'Saudáveis' },
] satisfies ExtraFilterOption[];


export function RecipeFilters({
    extraFilters = extraFiltersArray,
    onFiltersChange,
}: MealFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);


    function handleControlOpenCategory() {
        console.log('aqui')
        setIsOpen((prev) => !prev)
    }

    const { loadingCategories, resultSetCategories } = useRequestCategories();
    const {
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
    } = useRecipeFilters({
        extraFilters,
        onFiltersChange,
    });

    console.log({isOpen})


    return (
        <section
            className={`rounded-2xl ${isOpen && 'space-y-6'}  border border-gray-200 bg-white px-4 shadow-sm  `}>
            {!isOpen && (
                <div className={`w-full flex flex-row cursor-pointer py-2  justify-end items-end`}>
                    <Button variant="outlined" onFunction={handleControlOpenCategory}>
                        <ChevronDown />
                    </Button>
                </div>
            )}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                } lg:mt-4 ${isOpen && 'max-h-none'}  `}>
                <SearchRecipeFilter handleControlOpenCategory={handleControlOpenCategory} handleSearchChange={handleSearchChange} search={search} />
                <RecipeCategoriesOptions
                    clearCategories={clearCategories}
                    loadingCategories={loadingCategories}
                    resultSetCategories={resultSetCategories}
                    search={search}
                    selectedCategories={selectedCategories}
                    selectedExtraFilters={selectedExtraFilters}
                    toggleCategory={toggleCategory}
                    onFiltersChange={onFiltersChange}
                />
                <ExtraFilters toggleExtraFilter={toggleExtraFilter} selectedExtraFilters={selectedExtraFilters} extraFilters={extraFilters} />
                <ActiveFilters
                    items={activeFilters}
                    onRemove={handleRemoveActiveFilter}
                    onClearAll={clearAllFilters}
                />
            </div>
        </section>
    );
}