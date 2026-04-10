import type { ReactNode } from "react";


interface FilterSectionProps {
    title: string;
    children: ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
    return (
        <div  className="flex overflow-auto flex-col gap-2">
            <span className="text-sm ml-1 font-semibold text-gray-800">{title}</span>

            <div className="flex gap-1 overflow-x-auto pb-6 scrollbar-thin">
                {children}
            </div>
        </div>
    );
}