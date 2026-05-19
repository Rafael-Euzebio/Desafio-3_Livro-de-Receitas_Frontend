
import { useNavigate } from "react-router-dom";
import ListMeal from "../../components/meal/listmeal/ListMeal";
import { PintGlassIcon } from "@phosphor-icons/react";

function Home() {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo ao Receitas.com
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Descubra as melhores receitas e inspire-se na cozinha
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/receitas")}
                className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Explorar Receitas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Receitas em Destaque */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                <PintGlassIcon /> Receitas
              </h2>
              <button
                onClick={() => navigate("/receitas")}
                className="text-green-600 hover:text-green-700 font-semibold transition"
              >
                Ver todas →
              </button>
            </div>

            {/* Componente ListMeal com categoria Seafood (ou outra de sua preferência) */}
            <ListMeal />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
