import { fetchProducts } from "../services/api.js";
import { ENDPOINTS, PRODUCTS_PER_PAGE } from "../utils/constants.js";

let products = [];
let currentIndex = 0;

export async function renderProducts() {
  const productsContainer = document.querySelector("#products");

  products = await fetchProducts(ENDPOINTS.PRODUCTS);

  renderNextProducts(productsContainer);

  const button = document.createElement("button");

  button.type = "button";
  button.textContent = "Ver mais";

  button.addEventListener("click", () => {
    renderNextProducts(productsContainer);

    if (currentIndex >= products.length) {
      button.remove();
    }
  });

  productsContainer.after(button);
}

function renderNextProducts(productsContainer) {
  const nextProducts = products.slice(
    currentIndex,
    currentIndex + PRODUCTS_PER_PAGE,
  );

  nextProducts.forEach((product) => {
    const gridProduct = document.createElement("grid-product-component");

    gridProduct.product = product;

    productsContainer.appendChild(gridProduct);
  });

  currentIndex += PRODUCTS_PER_PAGE;
}
