// utils/imageUtils.ts
export const getMealImage = (
  imageUrl: string,
  size: "preview" | "small" | "medium" | "large" = "large",
) => {
  if (!imageUrl) return "";

  // Remove qualquer sufixo existente
  let baseUrl = imageUrl;

  // Remove extensão .jpg/.png e qualquer sufixo anterior
  baseUrl = baseUrl.replace(
    /\.(jpg|jpeg|png)\/?(preview|small|medium|large)?$/i,
    "",
  );

  // Retorna a URL com o tamanho solicitado
  return `${baseUrl}.jpg/${size}`;
};

// Alternativa: função que retorna todos os tamanhos
export const getMealImages = (imageUrl: string) => {
  if (!imageUrl)
    return { preview: "", small: "", medium: "", large: "", original: "" };

  const baseUrl = imageUrl.replace(
    /\.(jpg|jpeg|png)\/?(preview|small|medium|large)?$/i,
    "",
  );

  return {
    original: imageUrl,
    preview: `${baseUrl}.jpg/preview`,
    small: `${baseUrl}.jpg/small`,
    medium: `${baseUrl}.jpg/medium`,
    large: `${baseUrl}.jpg/large`,
  };
};
