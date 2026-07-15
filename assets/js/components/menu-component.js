import { CartStorage } from "../services/cart-storage.js";

class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.render();

    const initialTotal = this.getInitialTotalFromStorage();
    this.updateBadge(initialTotal);

    this.events();
  }

  getInitialTotalFromStorage() {
    const products = CartStorage.getProducts();

    return products.reduce(
      (total, product) => total + (product.quantity || 0),
      0,
    );
  }

  render() {
    this.innerHTML = `
      <nav class="menu" aria-label="Menu principal">
        <ul class="menu__list">
          <li class="menu__item">
            <a href="#inicio" class="menu__link">Início</a>
          </li>

          <li class="menu__item">
            <a href="#conceito" class="menu__link">Inscreva-se</a>
          </li>

          <li class="menu__item">
            <a href="#produtos" class="menu__link">Saiba mais</a>
          </li>
        </ul>

        <button
          class="menu__cart"
          type="button"
          aria-label="Abrir carrinho de compras"
        >
          <img
            src="assets/images/icons/cart.svg"
            alt=""
            width="30"
            height="30"
            loading="lazy"
          />

          <span
            class="menu__cart-badge"
            hidden
          >
            0
          </span>
        </button>
      </nav>
    `;
  }

  events() {
    this.querySelector(".menu__cart")?.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("open-cart"));
    });

    document.addEventListener("cart-updated", ({ detail }) => {
      this.updateBadge(detail.totalItems);
    });
  }

  updateBadge(totalItems) {
    const badge = this.querySelector(".menu__cart-badge");

    if (!badge) return;

    badge.textContent = totalItems;

    badge.hidden = totalItems === 0;
  }
}

customElements.define("menu-component", MenuComponent);
