import { Link } from "react-router-dom";
import { FileSearch } from "lucide-react";

interface NotFoundProps {
    title?: string;
    description?: string;
    backTo?: string;
    backLabel?: string;
}

export function NotFound({
    title = "Página não encontrada",
    description = "A página que você tentou acessar não existe ou foi removida.",
    backTo = "/",
    backLabel = "Voltar para lista",
}: NotFoundProps) {
    return (
        <section className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <FileSearch className="h-8 w-8 text-gray-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>

                <Link
                    to={backTo}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                >
                    {backLabel}
                </Link>
            </div>
        </section>
    );
}