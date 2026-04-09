
import type { ButtonHTMLAttributes } from "react";

type Variant = "contained" | "outlined";
type Color = "default" | "alert" | "error" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    color?: Color;
    onFunction: () => void;
}

export function Button({
    variant = "contained",
    color = "default",
    onFunction = () => { },
    ...rest
}: ButtonProps) {
    const base =
        "flex items-center gap-2 text-sm font-medium transition-all cursor-pointer px-4 py-2 rounded-lg focus:outline-none focus:ring-2";
    const colors = {
        default: {
            text: "text-gray-500",
            hoverText: "hover:text-gray-900",
            border: "border-gray-400",
            bg: "bg-gray-500",
            hoverBg: "hover:bg-gray-600",
            ring: "focus:ring-gray-400",
        },
        alert: {
            text: "text-orange-500",
            hoverText: "hover:text-orange-900",
            border: "border-orange-500",
            bg: "bg-orange-500",
            hoverBg: "hover:bg-orange-600",
            ring: "focus:ring-orange-400",
        },
        error: {
            text: "text-red-500",
            hoverText: "hover:text-red-900",
            border: "border-red-500",
            bg: "bg-red-500",
            hoverBg: "hover:bg-red-600",
            ring: "focus:ring-red-400",
        },
        success: {
            text: "text-green-500",
            hoverText: "hover:text-green-900",
            border: "border-green-500",
            bg: "bg-green-500",
            hoverBg: "hover:bg-green-600",
            ring: "focus:ring-green-400",
        },
    };

    const variantStyles = {
        contained: `${colors[color].bg} text-white ${colors[color].hoverBg}`,
        outlined: `border ${colors[color].border} ${colors[color].text} ${colors[color].hoverText}`,
    };

    return (
        <button
            onClick={() => onFunction()}
            className={`${base} ${variantStyles[variant]} ${colors[color].ring}`}
            {...rest}
        />
    );
}