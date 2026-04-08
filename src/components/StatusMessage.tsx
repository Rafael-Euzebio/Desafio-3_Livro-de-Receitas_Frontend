type StatusMessageProps = {
    message: string;
    type?: "default" | "error";
};

export default function StatusMessage({
    message,
    type = "default",
}: StatusMessageProps) {
    const textColor =
        type === "error" ? "text-red-600" : "text-slate-700";

    return (
        <p className={`text-center text-lg font-medium ${textColor}`}>{message}</p>
    );
}