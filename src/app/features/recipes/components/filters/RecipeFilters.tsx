import { useRequestCategories } from '../../hooks/useRequestCategories';
import { useRecipeFilters } from '../../hooks/useRecipeFilters';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type ExtraFilterOption } from './ExtraFilters';
import { SearchRecipeFilter } from './SearchRecipeFilter';
import { Button } from '../../../../components/Header/ActionButton';
import { RecipeCategoriesOptions } from './RecipeCategoriesOptions';


interface MealFiltersProps {
    extraFilters?: ExtraFilterOption[];
    setSearchValue: (search: string) => void;
    onFiltersChange?: (filters: {
        search: string;
        selectedCategories: string[];
    }, isCategory: boolean) => void;
}



export function RecipeFilters({
    onFiltersChange,
    setSearchValue,
}: MealFiltersProps) {
    const [isOpen, setIsOpen] = useState(true);


    function handleControlOpenCategory() {
        setIsOpen((prev) => !prev)
    }

    const { loadingCategories, resultSetCategories } = useRequestCategories();
    const {
        search,
        selectedCategories,
        handleSearchChange,
        toggleCategory,
        clearCategories,
    } = useRecipeFilters({
        onFiltersChange
    });


    function prepareSearch (text: string){
        handleSearchChange(text);
        setSearchValue(text);
    }


    return (
        <section
            className={`rounded-2xl ${isOpen && 'space-y-6'}  border border-gray-200 bg-white px-4 shadow-sm  `}>
            {!isOpen && (
                <div className={`w-full flex flex-row cursor-pointer py-2  justify-between items-start`}>
                    <span className=''>FILTRO DE RECEITAS</span>
                    <Button variant="outlined" onFunction={handleControlOpenCategory}>
                        <ChevronDown />
                    </Button>
                </div>
            )}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                } lg:mt-4 ${isOpen && 'max-h-none'}  `}>
                <SearchRecipeFilter handleControlOpenCategory={handleControlOpenCategory} handleSearchChange={prepareSearch} search={search} />
                <RecipeCategoriesOptions
                    clearCategories={clearCategories}
                    loadingCategories={loadingCategories}
                    resultSetCategories={resultSetCategories}
                    search={search}
                    selectedCategories={selectedCategories}

                    toggleCategory={toggleCategory}
                    onFiltersChange={onFiltersChange}
                />
                {/* <ActiveFilters
                    items={activeFilters}
                    onRemove={handleRemoveActiveFilter}
                    onClearAll={clearAllFilters}
                /> */}
            </div>
        </section>
    );
}