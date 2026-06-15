# Desafio 3 — Apicius

## Visão geral

Neste desafio, você irá construir uma aplicação com múltiplas páginas que consome dados da API **TheMealDB**.

O objetivo é permitir que o usuário explore receitas e visualize detalhes de cada uma.

A aplicação deve incluir navegação entre páginas, consumo de API e renderização dinâmica de conteúdo.

![Exemplo catálogo](./examples/catalog.png)

![Exemplo detalhe](./examples/details.png)

O nome Apicius faz referência a uma antiga compilação culinária associada à Roma Antiga, conhecida por reunir receitas e práticas gastronômicas daquele período. Neste desafio, a ideia é construir uma versão moderna de um livro de receitas: uma aplicação onde o usuário pode explorar pratos, navegar entre páginas e visualizar detalhes de preparo.

---

## Stack obrigatória

A implementação deve utilizar:

* **React**
* **Vite**
* **TypeScript**
* **Tailwind CSS**
* **React Router**

---

## Objetivo

Construir uma aplicação que permita:

* explorar receitas
* navegar entre páginas
* visualizar detalhes de uma receita

---

## Estrutura obrigatória

A aplicação deve possuir pelo menos duas páginas:

* `/` → listagem de receitas
* `/meal/:mealId` → detalhes da receita

---

## API utilizada

Utilize a **TheMealDB API**:

[https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

A API permite uso da chave de teste `1` para desenvolvimento e fins educacionais.

### URLs úteis para este desafio

**Buscar receita por nome**

```
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
```

**Buscar receitas pela primeira letra**

```
https://www.themealdb.com/api/json/v1/1/search.php?f=a
```

**Buscar detalhes de uma receita por ID**

```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

**Listar categorias**

```
https://www.themealdb.com/api/json/v1/1/list.php?c=list
```

**Listar áreas (origem das receitas)**

```
https://www.themealdb.com/api/json/v1/1/list.php?a=list
```

**Filtrar por categoria**

```
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
```

**Filtrar por área**

```
https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
```

### Observação

Você pode utilizar qualquer combinação desses endpoints, desde que a aplicação:

* permita explorar receitas
* navegue para uma de detalhes da receita escolhida
* carregue dados reais da API

---

## Comportamento da página inicial

A página inicial deve permitir ao usuário explorar receitas.

Você deve implementar **pelo menos uma** das opções abaixo:

* busca por nome
* filtro por primeira letra
* filtro por categoria
* filtro por área

---

### Comportamento esperado

* Deve existir um mecanismo claro de busca/filtros (input ou botões)
* A listagem deve ser atualizada dinamicamente com base na interação
* Os itens devem ser exibidos em formato de grid ou lista responsiva

Cada item deve conter, no mínimo:

* imagem
* nome

---

## Navegação

Ao clicar em uma receita, o usuário deve ser redirecionado para:

```
/meal/:mealId
```

---

## Página de detalhe

A página de detalhe deve exibir:

* nome da receita
* imagem
* categoria
* instruções

Também deve conter:

* botão ou link de voltar

---

## Estados da aplicação

A aplicação deve tratar:

* loading
* erro

Esses estados devem ser visíveis para o usuário.

---

## Responsividade

A interface deve funcionar corretamente em:

* desktop
* mobile

Evite:

* scroll horizontal
* layouts quebrados
* elementos sobrepostos

---

## Requisitos obrigatórios

Para aprovação no desafio:

* utilizar React Router
* possuir pelo menos duas páginas
* consumir a API TheMealDB
* renderizar dados dinâmicos
* implementar pelo menos uma forma de exploração (busca ou filtro)
* navegar para página de detalhe
* exibir dados completos da receita
* tratar loading e erro
* interface responsiva
* projeto compilar (`npm run build`)
* aplicação em produção (deploy)

---

## Melhorias opcionais

Os itens abaixo aumentam a qualidade da solução:

* busca + filtro combinados
* múltiplos filtros
* categorias com estado ativo
* navegação por categoria (clicar na categoria no detalhe e voltar filtrado)
* exibir ingredientes
* integração com vídeo da receita
* melhor hierarquia visual
* componentes reutilizáveis
* organização de código mais estruturada

---

## Como desenvolver e entregar

### 1. Fork do repositório

Faça um fork deste repositório para sua conta.

---

### 2. Configure o projeto

```bash
npm install
```

Configure o Tailwind CSS seguindo a documentação oficial:

[https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

---

### 3. Desenvolva a aplicação

Implemente as páginas e comportamentos descritos no desafio.

---

### 4. Rode localmente

```bash
npm run dev
```

---

### 5. Build

```bash
npm run build
```

---

## 6. Envie sua solução

Abra um **Pull Request do seu fork para este repositório**, contendo screenshots do layout em **desktop e mobile**

Após o envio, sua solução será revisada. Feedback poderá ser fornecido antes da aprovação.

## 7. Solução de Referência
Esse site demonstra um modelo de solução, que implementa todos os requisitos obrigatórios e opcionais do desafio:

https://desafio-3-solution.vercel.app/
