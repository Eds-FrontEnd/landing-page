class HeaderComponent extends HTMLElement {
  async connectedCallback() {
    await customElements.whenDefined("logo-component");
    await customElements.whenDefined("menu-component");

    this.innerHTML = `
            <header class="header">
                <logo-component></logo-component>
                <menu-component></menu-component>
            </header>
        `;
  }
}

customElements.define("header-component", HeaderComponent);
