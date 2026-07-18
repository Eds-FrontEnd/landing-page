class LogoComponent extends HTMLElement {
  connectedCallback() {
    const isHomePage =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.endsWith("index.html");

    const basePath = isHomePage ? "./" : "../../../";

    this.innerHTML = `
      <a href="${basePath}index.html" class="header__logo">
        <img
          src="${basePath}assets/images/logo/freefashion_logo.png"
          class="logo__image"
          alt="Logo da FreeFashion"
          loading="lazy"
          width="193"
          height="70"
        />
      </a>
    `;
  }
}

customElements.define("logo-component", LogoComponent);
