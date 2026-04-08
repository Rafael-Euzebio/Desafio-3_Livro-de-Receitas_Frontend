import type { FormEvent } from "react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
    value,
    onChange,
    onSubmit,
}: SearchBarProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="mb-8 flex flex-col gap-3 md:flex-row"
        >
            <input
                type="text"
                placeholder="Busque uma receita pelo nome"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />

            <button
                type="submit"
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
                Buscar
            </button>
        </form>
    );
}