
import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title = "Nenhuma receita encontrada",
  description = "Tente ajustar os filtros ou buscar por outro nome.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      
   
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <SearchX className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}