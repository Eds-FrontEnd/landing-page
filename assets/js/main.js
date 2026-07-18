import { renderProducts } from "./views/products-view.js";

// Components
import "./components/logo-component.js";
import "./components/header-component.js";
import "./components/grid-product-component.js";
import "./components/message-info-component.js";
import "./components/slogan-component.js";
import "./components/cart-component.js";
import "./components/modal-component.js";
import "./components/whatsapp-component.js";

// Pages
import "./components/pages-components/home-page-component.js";
import "./components/pages-components/register-page-component.js";
import "./components/pages-components/contact-page-component.js";

const currentPage = window.location.pathname.endsWith("/")
  ? "index.html"
  : window.location.pathname.split("/").pop();

async function init() {
  try {
    switch (currentPage) {
      case "index.html":
      case "":
        await import("./components/menu-component.js");
        await renderProducts();
        break;

      case "register-page.html":
        break;

      case "contact-page.html":
        break;

      default:
        break;
    }
  } catch (error) {
    console.error("Erro ao inicializar a aplicação:", error);
  }
}

init();
