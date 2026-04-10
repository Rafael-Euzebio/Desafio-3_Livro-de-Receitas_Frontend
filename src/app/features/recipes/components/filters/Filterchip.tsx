interface FilterChipProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export function FilterChip({
    label,
    active = false,
    onClick,
}: FilterChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                `inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium transition whitespace-nowrap
                ${active
                    ? 'border-green-700 bg-green-700 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'} `}
        >
            {label}
        </button>
    );
}