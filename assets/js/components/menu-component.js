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
    // Verifica se existe a sessão ativa no localStorage
    const isLoggedIn = localStorage.getItem("userActive") !== null;

    this.innerHTML = `
      <nav class="menu" aria-label="Menu principal">
        <ul class="menu__list">
          <li class="menu__item">
            <a
              class="menu__link"
              href="/index.html"
              aria-label="Ir para a página inicial"
            >
              <img
                class="menu__icon"
                src="./assets/images/icons/home.svg"
                alt=""
                width="30"
                height="30"
                loading="lazy"
                aria-hidden="true"
              />
            </a>
            
          </li>
          <li class="menu__item">
            ${
              isLoggedIn
                ? `<span class="menu__link menu__link--welcome" id="welcome">Seja muito bem-vindo(a)!</span>`
                : `<a href="./assets/pages/register/register-page.html" class="menu__link" id="welcome">Inscreva-se</a>`
            }
          </li>

          ${
            isLoggedIn
              ? `
      <span
        class="menu__link menu__link--disabled"
        aria-label="Usuário já autenticado"
        aria-disabled="true"
      >
        <img
          class="menu__icon"
          src="./assets/images/icons/login.svg"
          alt=""
          width="30"
          height="30"
          loading="lazy"
          aria-hidden="true"
        />
      </span>
    `
              : `
            <a
              class="menu__link"
              href="./assets/pages/login/login-page.html"
              aria-label="Ir para a página de login"
            >
              <img
                class="menu__icon"
                src="./assets/images/icons/login.svg"
                alt=""
                width="30"
                height="30"
                loading="lazy"
                aria-hidden="true"
              />
            </a>
    `
          }

          <li class="menu__item">
            ${
              isLoggedIn
                ? `<a href="#" class="menu__link" id="logout-btn">Sair</a>`
                : `<a href="./assets/pages/login/login-page.html" class="menu__link">Login</a>`
            }
          </li>
        </ul>

        <button
          class="menu__cart"
          type="button"
          aria-label="Abrir carrinho de compras"
        >
          <img
            src="./assets/images/icons/cart.svg"
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

    // Evento para limpar o localStorage e deslogar
    this.querySelector("#logout-btn")?.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("userActive");
      window.location.reload();
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
