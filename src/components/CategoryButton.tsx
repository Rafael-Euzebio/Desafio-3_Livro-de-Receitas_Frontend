import { Button } from "./ui/button";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryButton = ({
  label,
  isActive,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={
        isActive
          ? `rounded-lg border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition`
          : `rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900`
      }
    >
      {label}
    </Button>
  );
};
