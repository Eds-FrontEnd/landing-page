class MessageInfoComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span class="message">
        <img
          src="./assets/images/error/error.png"
          alt="Erro ao carregar produtos"
          width="310"
          height="216"
          loading="lazy"
        />
        <h1 class="message-info"></h1>
      </span>
    `;
  }
}

customElements.define("message-info-component", MessageInfoComponent);
