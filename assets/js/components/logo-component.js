class LogoComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <a href="/" class="header__logo">
                <img src="../../../assets/images/logo/freefashion_logo.png" class="logo__image" alt="Logo da FreeFashion" loading="lazy"
                    width="193" height="70" />
            </a>
        `;
  }
}

customElements.define("logo-component", LogoComponent);
