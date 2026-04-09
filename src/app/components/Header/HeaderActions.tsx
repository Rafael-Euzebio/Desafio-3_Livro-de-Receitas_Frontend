import { Heart, Home, ArrowBigLeft } from "lucide-react";
import { Button } from "./ActionButton";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

interface HeaderActionsProps {
    buttonHomeFunction: () => void;
    buttonFavoriteFunction: () => void;
}

export function HeaderActions({ buttonHomeFunction, buttonFavoriteFunction }: HeaderActionsProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate()

    function returnToListPage() {
        navigate('/');
    }
    const isValidRoute =
        matchPath("/", pathname) ||
        matchPath("/receitas", pathname) ||
        matchPath("/receita/:id", pathname);
    return (
        <div className="flex  justify-end sm:justify-center  items-end  sm:items-center gap-2 sm:gap-6">
            {isValidRoute?.params && !isValidRoute?.params?.id && (
                <>
                    <Button onFunction={buttonHomeFunction} variant="outlined" color="default">
                        <Home />
                        Todas
                    </Button>
                    <Button onFunction={buttonFavoriteFunction} variant="outlined" color="error">
                        <Heart />
                        Favoritas
                    </Button>
                </>
            )}
            {isValidRoute?.params?.id && (
                <Button onFunction={returnToListPage} variant="contained" color="alert">
                    <ArrowBigLeft />
                    Ver todas receitas
                </Button>
            )}
            {!isValidRoute?.params && (
                <Button onFunction={returnToListPage} variant="contained" color="default">
                    <Home />
                    Ir para Lista
                </Button>
            )}
        </div>
    )
}