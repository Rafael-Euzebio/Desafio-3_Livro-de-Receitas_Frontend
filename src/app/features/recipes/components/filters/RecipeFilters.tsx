import { useMemo, useState } from 'react';
import { useRequestCategories } from '../../hooks/useRequestCategories';

import { FilterSection } from './FilterSection';
import { SearchInput } from './SearchInput';
import { FilterChip } from './Filterchip';
import { ActiveFilters } from './ActiveFilter';


interface ExtraFilterOption {
    id: string;
    label: string;
}

interface MealFiltersProps {
    extraFilters?: ExtraFilterOption[];
    onFiltersChange?: (filters: {
        search: string;
        selectedCategories: string[];
        selectedExtraFilters: string[];
    }) => void;
}

export function RecipeFilters({
    extraFilters = [
        { id: 'quick', label: 'Rápidas (até 30 min)' },
        { id: 'easy', label: 'Fáceis' },
        { id: 'healthy', label: 'Saudáveis' },
    ],
    onFiltersChange,
}: MealFiltersProps) {
    const { loadingCategories, resultSetCategories } = useRequestCategories();

    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedExtraFilters, setSelectedExtraFilters] = useState<string[]>([]);

    function toggleCategory(category: string) {
        setSelectedCategories(prev => {
            const updated = prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category];

            onFiltersChange?.({
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

            onFiltersChange?.({
                search,
                selectedCategories,
                selectedExtraFilters: updated,
            });

            return updated;
        });
    }

    function handleSearchChange(value: string) {
        setSearch(value);

        onFiltersChange?.({
            search: value,
            selectedCategories,
            selectedExtraFilters,
        });
    }

    function clearAllFilters() {
        setSearch('');
        setSelectedCategories([]);
        setSelectedExtraFilters([]);

        onFiltersChange?.({
            search: '',
            selectedCategories: [],
            selectedExtraFilters: [],
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

    function handleRemoveActiveFilter(item: {
        id: string;
        label: string;
        type: 'category' | 'extra';
    }) {
        if (item.type === 'category') {
            const updated = selectedCategories.filter(category => category !== item.id);
            setSelectedCategories(updated);

            onFiltersChange?.({
                search,
                selectedCategories: updated,
                selectedExtraFilters,
            });

            return;
        }

        const updated = selectedExtraFilters.filter(filter => filter !== item.id);
        setSelectedExtraFilters(updated);

        onFiltersChange?.({
            search,
            selectedCategories,
            selectedExtraFilters: updated,
        });
    }

    return (
        <section className="rounded-2xl space-y-2 border border-gray-200 bg-white p-4 shadow-sm md:p-5">
            <div className=" flex flex-col lg:flex-row space-x-6">
                <div className='max-w-1/5 '>
                    <SearchInput value={search} onChange={handleSearchChange} />
                </div>
                <FilterSection title="Filtrar por categorias">
                    <FilterChip
                        label="Todas"
                        active={selectedCategories.length === 0}
                        onClick={() => {
                            setSelectedCategories([]);

                            onFiltersChange?.({
                                search,
                                selectedCategories: [],
                                selectedExtraFilters,
                            });
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
                                onClick={() => toggleCategory(category.value)}
                            />
                        ))}
                </FilterSection>
            </div>
            <div className='w-full flex items-end  justify-end'>
                <div className='w-1/5'>
                    <FilterSection title="Mais filtros">
                        {extraFilters.map(filter => (
                            <FilterChip
                                key={filter.id}
                                label={filter.label}
                                active={selectedExtraFilters.includes(filter.id)}
                                onClick={() => toggleExtraFilter(filter.id)}
                            />
                        ))}
                    </FilterSection>
                </div>
            </div>
            <ActiveFilters
                items={activeFilters}
                onRemove={handleRemoveActiveFilter}
                onClearAll={clearAllFilters}
            />
        </section>
    );
}