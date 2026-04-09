import type { HeaderProps } from "./Header";

interface HeaderTitleProps extends HeaderProps {
    logo: string;
}

export function Headertitle({ logo, title, subtitle }: HeaderTitleProps) {
    return (
        <div className="flex items-center gap-4">
            <img
                src={logo}
                alt="Logo"
                className="h-16 w-16 object-contain"
            />
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {title.split(" ")[0]}{" "}
                    <span className="text-orange-600">
                        {title.split(" ").slice(1).join(" ")}
                    </span>
                </h1>

                <span className="text-sm text-gray-500">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}