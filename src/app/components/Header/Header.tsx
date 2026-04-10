import Logo from "../../../assets/images/logo-receitas.png"
import { Headertitle } from "./HeaderTitle";


export interface HeaderProps {
    title: string;
    subtitle: string;
}

export function Header({
    title = "Catálogo de Receitas",
    subtitle = "Descubra e filtre receitas deliciosas",
}: HeaderProps) {

    return (
        <header className="w-full flex flex-col sm:flex-row border-b border-gray-200 bg-white  justify-between px-4 py-2 sm:px-6 sm:py-4">
            <Headertitle title={title} subtitle={subtitle} logo={Logo} />
            {/* <HeaderActions buttonFavoriteFunction={() => { }} buttonHomeFunction={() => { }} /> */}
        </header>
    );
}