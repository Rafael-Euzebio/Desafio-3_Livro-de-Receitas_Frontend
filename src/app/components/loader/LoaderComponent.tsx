interface LoadingProps {
    title: string;
    messageLoading: string;
}

const LoaderComponent = ({ title, messageLoading }: LoadingProps) => {
    return (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 py-20">
            <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

                <div className="absolute h-10 w-10 rounded-full border-4 border-slate-100 border-b-cyan-500 [animation:spin_1.2s_linear_infinite_reverse]" />
            </div>

            <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-700">{title}</span>
                <span className="text-sm text-gray-400">{messageLoading}</span>
            </div>
        </div>
    );
};

export default LoaderComponent;