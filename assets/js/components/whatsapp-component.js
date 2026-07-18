class WhatsappComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a 
        href="./assets/pages/contact/contact-page.html" 
        class="whatsapp"
        aria-label="Entre em contato"
      >
        <img
          src="./assets/images/icons/whats.svg"
          alt=""
          loading="lazy"
          width="60"
          height="60"
          aria-hidden="true"
        />
      </a>
    `;
  }
}

customElements.define("whatsapp-component", WhatsappComponent);
