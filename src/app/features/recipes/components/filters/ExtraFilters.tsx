import { FilterSection } from "./FilterSection";
import { FilterChip } from "./Filterchip";



export interface ExtraFilterOption {
    id: string;
    label: string;
}

interface ExtraFiltersProps {
    selectedExtraFilters: string[];
    toggleExtraFilter: (filterId: string) => void;
    extraFilters?: ExtraFilterOption[];
}

export function ExtraFilters({ toggleExtraFilter, selectedExtraFilters, extraFilters }: ExtraFiltersProps) {
    return (
        <div className='w-full flex items-end overflow-auto justify-end'>
            <FilterSection title="Mais filtros">
                {extraFilters?.map(filter => (
                    <FilterChip
                        key={filter.id}
                        label={filter.label}
                        active={selectedExtraFilters.includes(filter.id)}
                        onClick={() => toggleExtraFilter(filter.id)}
                    />
                ))}
            </FilterSection>
        </div>
    );
}