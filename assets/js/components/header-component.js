class HeaderComponent extends HTMLElement {
  async connectedCallback() {
    await customElements.whenDefined("logo-component");
    await customElements.whenDefined("menu-component");
    await customElements.whenDefined("slogan-component");

    this.innerHTML = `
            <header class="header">
                <logo-component></logo-component>
               <slogan-component text="Vista sua personalidade com estilo"></slogan-component>
                <menu-component></menu-component>
            </header>
        `;
  }
}

customElements.define("header-component", HeaderComponent);
