import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">
                Buscar por nome
            </label>

            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-300 bg-white px-3">
                <Search />
                <input
                    type="text"
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    placeholder="Ex: bolo, frango, salada..."
                    className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
            </div>
        </div>
    );
}