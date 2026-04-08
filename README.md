# 🍽️ Livro de Receitas

Aplicação desenvolvida como solução do **Desafio 3 — Explorador de Receitas**.

A interface permite buscar receitas por nome, filtrar por categoria, ver detalhes completos e navegar entre páginas com React Router.

## 🚀 Visão geral

- Busca de receitas por nome
- Filtro de categorias com estado ativo
- Navegação entre página inicial e detalhe da receita
- Exibição de dados completos da receita:
  - nome
  - imagem
  - categoria
  - origem
  - instruções
  - ingredientes
  - vídeo
- Tratamento de estados de carregamento e erro
- Layout responsivo para desktop e mobile

## 🧩 Tecnologias usadas

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM

## 🌐 API

O projeto consome os dados da API pública **TheMealDB**:

https://www.themealdb.com/api.php

## 📦 Scripts disponíveis

Use os comandos abaixo a partir da raiz do projeto:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## 💻 Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/GilAlvesOliveira/Desafio-3_Livro-de-Receitas.git
```

2. Entre na pasta do projeto:

```bash
cd Desafio-3_Livro-de-Receitas
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra o endereço mostrado no terminal, geralmente:

```bash
http://localhost:5173
```

## 🗂️ Estrutura do projeto

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    MealCard.tsx
    SearchBar.tsx
    StatusMessage.tsx
  pages/
    Home.tsx
    MealDetail.tsx
  services/
    mealApi.ts
  types/
    meal.ts
```

## ✅ Funcionalidades

- Listagem de receitas
- Busca por nome
- Filtro por categoria
- Navegação entre páginas
- Detalhes completos da receita
- Vídeo de preparo incorporado
- Interface responsiva

## 📌 Observações

- Configure o deploy adicionando o link de publicação nesta seção.
- Para melhores resultados, garanta conexão com a internet, pois a aplicação depende da API externa.

## 📄 Licença

Projeto criado para fins de estudo e desafio. Sinta-se à vontade para usar e adaptar o código.
