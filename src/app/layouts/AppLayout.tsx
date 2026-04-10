import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";


export function AppLayout() {
    return (
        <div className="mih-h-screen bg-bakcground text-foreground">
            <Header title="Catálogo de Receitas" subtitle="Descubra receitas deliciosas" />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}