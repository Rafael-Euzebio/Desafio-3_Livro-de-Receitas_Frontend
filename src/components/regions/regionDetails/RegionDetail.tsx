/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Meal } from "../../../models/Meal";
import type { Area } from "../../../models/Area";
import { get } from "../../../services/Service";
import CardMeal from "../../meal/cardmeal/CardMeal";


interface RegionDetailProps {
  area: Area;
  onBack: () => void;
}

function RegionDetail({ area, onBack }: RegionDetailProps) {
  const navigate = useNavigate();
  const [areaMeals, setAreaMeals] = useState<Meal[]>([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState<boolean>(true);

  // Função para obter código do país
  const getCountryCode = (country: string): string => {
    const countryMap: { [key: string]: string } = {
      American: "us",
      British: "gb",
      Canadian: "ca",
      Chinese: "cn",
      French: "fr",
      Greek: "gr",
      Indian: "in",
      Italian: "it",
      Japanese: "jp",
      Mexican: "mx",
      Spanish: "es",
      Thai: "th",
      Turkish: "tr",
      Vietnamese: "vn",
      German: "de",
      Brazilian: "br",
      Moroccan: "ma",
      Polish: "pl",
      Russian: "ru",
      Korean: "kr",
      Jamaican: "jm",
      Portuguese: "pt",
      Dutch: "nl",
      Egyptian: "eg",
      Irish: "ie",
      Australian: "au",
      Belgian: "be",
      Swiss: "ch",
      Swedish: "se",
      Norwegian: "no",
      Danish: "dk",
      Finnish: "fi",
    };
    return countryMap[country] || "";
  };

  // Buscar receitas por área
  const fetchMealsByArea = async (areaName: string) => {
    try {
      setIsLoadingMeals(true);
      await get(`/filter.php?a=${areaName}`, (data: any) => {
        if (data.meals) {
          setAreaMeals(data.meals);
        } else {
          setAreaMeals([]);
        }
      });
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      setAreaMeals([]);
    } finally {
      setIsLoadingMeals(false);
    }
  };

  useEffect(() => {
    fetchMealsByArea(area.strArea);
  }, [area]);

  const countryCode = getCountryCode(area.strArea);
  const flagUrl = countryCode
    ? `https://flagcdn.com/w320/${countryCode}.png`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Região */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="mb-3 inline-flex items-center gap-2 text-white hover:text-green-200 transition text-sm"
          >
            ← Voltar para todas as regiões
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded overflow-hidden shadow bg-white flex items-center justify-center">
              {flagUrl ? (
                <img
                  src={flagUrl}
                  alt={`Bandeira do ${area.strArea}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">🌍</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{area.strArea}</h1>
              <p className="text-green-100 text-sm mt-1">
                {areaMeals.length} receitas encontradas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Receitas */}
      <div className="container mx-auto px-4 py-8">
        {isLoadingMeals ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando receitas...</p>
            </div>
          </div>
        ) : areaMeals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Nenhuma receita encontrada para esta região
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaMeals.map((meal) => (
              <CardMeal
                key={meal.idMeal}
                meal={meal}
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegionDetail;
