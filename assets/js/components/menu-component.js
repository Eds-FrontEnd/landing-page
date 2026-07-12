class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="menu" aria-label="Menu principal">
        <ul class="menu__list">
          <li class="menu__item">
            <a href="#inicio" class="menu__link">Início</a>
          </li>
          <li class="menu__item">
            <a href="#conceito" class="menu__link">Conceito</a>
          </li>
          <li class="menu__item">
            <a href="#produtos" class="menu__link">Produtos</a>
          </li>
        </ul>

        <a href="#carrinho" class="menu__cart" aria-label="Abrir carrinho de compras">
          <img
            src="assets/images/icons/cart.svg"
            alt=""
            width="30"
            height="30"
            loading="lazy"
          />
        </a>
      </nav>
    `;
  }
}

customElements.define("menu-component", MenuComponent);
