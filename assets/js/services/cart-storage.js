import { STORAGE_KEY } from "../utils/constants.js";

export const CartStorage = {
  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao ler dados do LocalStorage:", error);
      return [];
    }
  },

  saveProducts(products) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Erro ao salvar dados no LocalStorage:", error);
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar dados do LocalStorage:", error);
    }
  },
};
