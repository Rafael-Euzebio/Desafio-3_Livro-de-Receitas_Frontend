import { X } from "lucide-react";

interface ActiveFilterItem {
    id: string;
    label: string;
    type: 'category' | 'extra';
}

interface ActiveFiltersProps {
    items: ActiveFilterItem[];
    onRemove: (item: ActiveFilterItem) => void;
    onClearAll: () => void;
}

export function ActiveFilters({
    items,
    onRemove,
    onClearAll,
}: ActiveFiltersProps) {
    if (!items.length) return null;

    return (
        <div className="flex flex-col py-4 w-full  items-start flex-wrap  gap-2 border-t border-gray-200 pt-4">
            <span className="text-sm font-semibold text-gray-700">Filtros ativos:</span>
            <div className="flex flex-row w-full overflow-auto space-y-4">


                {items.map(item => (
                    <button
                        key={`${item.type}-${item.id}`}
                        type="button"
                        onClick={() => onRemove(item)}

                        className="inline-flex items-center justify-between gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white"
                        style={{
                            backgroundColor: item.type === 'category' ? '#2f855a' : '#805ad5',
                            maxWidth: 'full',
                            minWidth: '190px',
                            maxHeight:'35px',                            
                            
                        }}
                    >
                        <span>{item.label}</span>
                        <X />
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={onClearAll}
                className="ml-1 text-sm font-medium border-1 p-1 cursor-pointer rounded-md text-indigo-700 hover:text-indigo-900"
            >
                Limpar todos
            </button>
        </div>
    );
}