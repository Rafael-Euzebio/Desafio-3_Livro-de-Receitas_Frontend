/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 30000, // Aumentado para 30 segundos
});

// Captura de Erros de conexão e HTTP
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 1. Erros de CONEXÃO (não chegou ao servidor)
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "Tempo limite de conexão excedido. O servidor demorou muito para responder."
      );
    }
    
    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Sem conexão com a internet. Verifique sua rede e tente novamente."
      );
    }
    
    if (!error.response) {
      throw new Error(
        "Erro de conexão. Não foi possível conectar ao servidor."
      );
    }

    // 2. Erros HTTP (chegaram ao servidor)
    const status = error.response.status;
    
    switch (status) {
      case 400:
        throw new Error(
          "Requisição inválida (400). Verifique os dados informados."
        );
      case 404:
        throw new Error(
          "Recurso não encontrado (404). Tente outra busca."
        );
      case 429:
        throw new Error(
          "Muitas requisições (429). Aguarde um momento e tente novamente."
        );
      case 500:
      case 502:
      case 503:
      case 504:
        throw new Error(
          `Erro no servidor (${status}). Tente novamente mais tarde.`
        );
      default:
        throw new Error(
          `Erro inesperado (${status}): ${error.message}`
        );
    }
  }
);

// Buscar receita por nome
export const searchMealByName = async (name: string, setDados: Function) => {
  try {
    const resposta = await api.get(`/search.php?s=${name}`);
    setDados(resposta.data.meals || []);
  } catch (error: any) {
    console.error("Erro na API searchMealByName:", {
      message: error.message,
      status: error.response?.status,
      code: error.code
    });
    throw error;
  }
};

// Buscar receitas pela primeira letra
export const searchMealByFirstLetter = async (
  letter: string,
  setDados: Function,
) => {
  try {
    // Validação antes da requisição para evitar 400
    if (!letter || letter.length !== 1 || !/[a-zA-Z]/.test(letter)) {
      throw new Error("A busca por letra requer uma única letra válida (A-Z)");
    }
    
    const resposta = await api.get(`/search.php?f=${letter.toLowerCase()}`);
    setDados(resposta.data.meals || []);
  } catch (error: any) {
    console.error("Erro na API searchMealByFirstLetter:", error);
    throw error;
  }
};

// Buscar detalhes de uma receita por ID
export const getMealById = async (id: string, setDados: Function) => {
  try {
    if (!id) {
      throw new Error("ID da receita não informado");
    }
    
    const resposta = await api.get(`/lookup.php?i=${id}`);
    setDados(resposta.data.meals ? resposta.data.meals[0] : null);
  } catch (error: any) {
    console.error("Erro na API getMealById:", error);
    throw error;
  }
};

// Listar categorias (apenas nomes)
export const getCategoryList = async (setDados: Function) => {
  try {
    const resposta = await api.get("/list.php?c=list");
    const categories =
      resposta.data.meals?.map((item: any) => item.strCategory) || [];
    setDados(categories);
  } catch (error: any) {
    console.error("Erro na API getCategoryList:", error);
    throw error;
  }
};

// Listar áreas (origem das receitas)
export const getAreaList = async (setDados: Function) => {
  try {
    const resposta = await api.get("/list.php?a=list");
    setDados(resposta.data.meals || []);
  } catch (error: any) {
    console.error("Erro na API getAreaList:", error);
    throw error;
  }
};

// Filtrar por categoria
export const filterByCategory = async (
  category: string,
  setDados: Function,
) => {
  try {
    if (!category || category.trim() === "") {
      throw new Error("Categoria não informada");
    }
    
    const resposta = await api.get(`/filter.php?c=${category}`);
    setDados(resposta.data.meals || []);
  } catch (error: any) {
    console.error("Erro na API filterByCategory:", error);
    throw error;
  }
};

// Filtrar por área
export const filterByArea = async (area: string, setDados: Function) => {
  try {
    if (!area || area.trim() === "") {
      throw new Error("Área não informada");
    }
    
    const resposta = await api.get(`/filter.php?a=${area}`);
    setDados(resposta.data.meals || []);
  } catch (error: any) {
    console.error("Erro na API filterByArea:", error);
    throw error;
  }
};

// Buscar receita aleatória
export const getRandomMeal = async (setDados: Function) => {
  try {
    const resposta = await api.get("/random.php");
    setDados(resposta.data.meals ? resposta.data.meals[0] : null);
  } catch (error: any) {
    console.error("Erro na API getRandomMeal:", error);
    throw error;
  }
};