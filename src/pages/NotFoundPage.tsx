import { UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Círculo com o ícone para chamar a atenção */}
      <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <UtensilsCrossed size={64} />
      </div>

      <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-slate-900">
        404
      </h1>

      <h2 className="mb-4 text-2xl font-bold text-slate-800">
        Prato não encontrado!
      </h2>

      <p className="mb-8 max-w-100 text-slate-500">
        Parece que a página ou a receita que você está procurando não existe,
        foi removida ou alguém a devorou antes de você chegar.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="rounded-lg bg-slate-900 px-8 py-6 text-base font-medium text-white transition hover:bg-slate-700"
      >
        Voltar para o Cardápio
      </Button>
    </div>
  );
};
