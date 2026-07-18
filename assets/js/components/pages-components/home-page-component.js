class HomePageComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <main class="home-page">

        <header-component></header-component>

        <cart-component></cart-component>

        <section
          id="products"
          class="home-page__products"
          aria-label="Lista de produtos"
        ></section>

        <message-info-component></message-info-component>

        <modal-component></modal-component>

      </main>
    `;
  }
}

customElements.define("home-page", HomePageComponent);
