

import { AlertTriangle, X } from "lucide-react";
import type { ReactNode } from "react";



export interface ApiErrorModalProps {
    open: boolean;
    title?: string;
    message?: string;
    onClose: () => void;
    onRetry?: () => void;
    closeLabel?: string;
    retryLabel?: string;
    children?: ReactNode;
}



export function ApiErrorModal({
    open,
    title = "Erro ao carregar dados",
    message = "Ocorreu um problema ao se comunicar com a API. Tente novamente.",
    onClose,
    // onRetry,
    closeLabel = "Fechar",
    // retryLabel = "Tentar novamente",
    children,
}: ApiErrorModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                className="w-full max-w-md rounded-3xl bg-white shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="api-error-modal-title"
            >
                <div className="flex items-start justify-between border-b border-gray-100 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>

                        <div>
                            <h2
                                id="api-error-modal-title"
                                className="text-lg font-semibold text-gray-900"
                            >
                                {title}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Fechar modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm leading-6 text-gray-600">{message}</p>

                    {children ? <div className="mt-4">{children}</div> : null}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        {closeLabel}
                    </button>

                    {/* {onRetry ? (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            {retryLabel}
                        </button>
                    ) : null} */}
                </div>
            </div>
        </div>
    );
}