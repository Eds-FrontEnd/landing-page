import { renderProducts } from "./views/products-view.js";

//Components
import "./components/menu-component.js";
import "./components/logo-component.js";
import "./components/header-component.js";
import "./components/grid-product-component.js";
import "./components/message-info.js";

//Init
async function initProducts() {
  await renderProducts();
}

initProducts();
