import { FilterSection } from "./FilterSection";
import { FilterChip } from "./Filterchip";
import type { FilterOption } from "../../types/category.types";


interface RecipeCategoriesOptionsProps {
    loadingCategories: boolean;
    selectedCategories: string[];
    clearCategories: () => void;
    prepareSearch: (text: string) => void;
    toggleCategory: (category: string, isCategory: boolean) => void;
    resultSetCategories: FilterOption[];
    search: string;
    onFiltersChange?: (filters: {
        search: string;
        selectedCategories: string[];
    }, isCategory: boolean) => void;
}

export function RecipeCategoriesOptions({ toggleCategory, prepareSearch, clearCategories, resultSetCategories, loadingCategories, selectedCategories, onFiltersChange, search }: RecipeCategoriesOptionsProps) {
    return (
        <div className=" flex flex-col lg:flex-row py-4 space-x-6">
            <FilterSection title="Filtrar por categorias">
                <FilterChip
                    label="Todas"
                    active={selectedCategories.length === 0}
                    onClick={() => {
                        prepareSearch('')
                        clearCategories()
                        onFiltersChange?.({
                            search,
                            selectedCategories: [],
                        }, false);
                    }}
                />

                {loadingCategories &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 min-w-[88px] animate-pulse rounded-full bg-gray-200"
                        />
                    ))}

                {!loadingCategories &&
                    resultSetCategories.map(category => (
                        <FilterChip
                            key={category.id}
                            label={category.label}
                            active={selectedCategories.includes(category.value)}
                            onClick={() => {

                                prepareSearch('')
                                toggleCategory(category.value, true)
                            }
                            }
                        />
                    ))}
            </FilterSection>
        </div>
    );
}