
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Header/ActionButton";

interface DontRequestReceptProps {
    errorRecipeDetails: string | null;
    refetchRecipeDetails: () => void;
}

export function DontRequestRecept({
    errorRecipeDetails,
    refetchRecipeDetails = () => { }
}: DontRequestReceptProps) {
    return (
        <section className="rounded-3xl border border-red-100 bg-red-50 p-8">
            <div className="mb-4 flex items-center gap-3 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <h1 className="text-lg font-semibold">Não foi possível carregar a receita</h1>
            </div>

            <p className="text-sm text-red-600">
                {errorRecipeDetails ?? "Receita não encontrada."}
            </p>

            <div className="mt-6 flex gap-3">
                <Button
                    onFunction={() => refetchRecipeDetails()}
                    variant="contained"
                    color="error"
                    children="Tentar Novamente"
                />


                <Link
                    to="/"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Voltar para receitas
                </Link>
            </div>
        </section>
    );
}