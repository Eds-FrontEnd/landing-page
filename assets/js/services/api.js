import { API_BASE_URL } from "../utils/constants.js";

export async function fetchProducts(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(
        `Falha ao carregar os produtos. Erro: ${response.status}`,
      );
    }

    const apiProduct = await response.json();

    return apiProduct;
  } catch (error) {
    throw new Error(
      `Ops! Não foi possível carregar os produtos no momento. Tente novamente mais tarde. ${error}`,
    );
  }
}
