import { ExternalLink, PlayCircle } from "lucide-react";

interface RecipeMediaLinksProps {
    youtube: string | null;
    source: string | null;
}

export function RecipeMediaLinks({
    youtube,
    source,
}: RecipeMediaLinksProps) {
    if (!youtube && !source) return null;

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">Links úteis</h2>

            <div className="flex flex-wrap gap-3">
                {youtube && (
                    <a
                        href={youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                        <PlayCircle className="h-4 w-4" />
                        Assistir no YouTube
                    </a>
                )}

                {source && (
                    <a
                        href={source}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-200"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Fonte original
                    </a>
                )}
            </div>
        </section>
    );
}