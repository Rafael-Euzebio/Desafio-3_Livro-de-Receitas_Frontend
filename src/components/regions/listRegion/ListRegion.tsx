/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { Area } from "../../../models/Area";
import RegionDetail from "../regionDetails/RegionDetail";
import { get } from "../../../services/Service";
import RegionCard from "../cardRegion/CardRegion";

function ListRegions() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allAreas, setAllAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Paginação - 15 itens por página
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  // Buscar TODAS as áreas da API
  const fetchAllAreas = async () => {
    try {
      setIsLoading(true);

      await get("/list.php?a=list", (data: any) => {
        if (data.meals && data.meals.length > 0) {
          const areasList: Area[] = data.meals.map((item: any) => ({
            strArea: item.strArea,
            strCountry: item.strCountry || item.strArea,
            recipeCount: 0,
            recipes: [],
          }));

          areasList.sort((a, b) => a.strArea.localeCompare(b.strArea));
          setAllAreas(areasList);
          console.log(`Total de regiões: ${areasList.length}`);
        } else {
          setAllAreas([]);
        }
      });
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);
      setAllAreas([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Selecionar uma área
  const handleAreaSelect = (area: Area) => {
    setSelectedArea(area);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Voltar para lista de áreas
  const handleBackToAreas = () => {
    setSelectedArea(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Filtrar áreas por busca
  const filteredAreas = allAreas.filter((area) =>
    area.strArea.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Paginação
  const totalPages = Math.ceil(filteredAreas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAreas = filteredAreas.slice(startIndex, endIndex);

  // Funções de navegação
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchAllAreas();
  }, []);

  // Se uma região foi selecionada, mostra o detalhe
  if (selectedArea) {
    return <RegionDetail area={selectedArea} onBack={handleBackToAreas} />;
  }

  // Tela de loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Carregando regiões...
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Isso leva apenas alguns segundos
          </p>
        </div>
      </div>
    );
  }

  // Tela de listagem de todas as regiões
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🌍 Regiões do Mundo
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            {allAreas.length === 0
              ? "Carregando regiões..."
              : `Explore receitas de ${allAreas.length} países e culturas`}
          </p>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      {allAreas.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="🔍 Buscar região... (ex: Italian, Japanese, Brazilian)"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Regiões */}
      <div className="container mx-auto px-4 py-6">
        {allAreas.length === 0 ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando regiões...</p>
          </div>
        ) : filteredAreas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhuma região encontrada para "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-green-600 hover:text-green-700 underline"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <>
            {/* Contagem de resultados */}
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {startIndex + 1} -{" "}
              {Math.min(endIndex, filteredAreas.length)} de{" "}
              {filteredAreas.length} regiões
            </div>

            {/* Grid de regiões - 15 por página */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {currentAreas.map((area) => (
                <RegionCard
                  key={area.strArea}
                  area={area}
                  onClick={handleAreaSelect}
                />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  ← Anterior
                </button>

                <div className="flex gap-1 flex-wrap justify-center">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm transition ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Próxima →
                </button>
              </div>
            )}

            {/* Informação de páginas */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Página {currentPage} de {totalPages}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ListRegions;
