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
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4">
            <span className="text-sm font-semibold text-gray-700">Filtros ativos:</span>

            {items.map(item => (
                <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => onRemove(item)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white"
                    style={{
                        backgroundColor: item.type === 'category' ? '#2f855a' : '#805ad5',
                    }}
                >
                    <span>{item.label}</span>
                    <X />
                </button>
            ))}

            <button
                type="button"
                onClick={onClearAll}
                className="ml-1 text-sm font-medium text-indigo-700 hover:text-indigo-900"
            >
                Limpar todos
            </button>
        </div>
    );
}