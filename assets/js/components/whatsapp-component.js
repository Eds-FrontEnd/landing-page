class WhatsappComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <a href="assets/pages/contact/contact-page.html" class="whatsapp">
                <img src="../../../assets/images/icons/whatsapp.svg" alt="Entre em contato" loading="lazy"
                    width="60" height="60" />
            </a>
        `;
  }
}

customElements.define("whatsapp-component", WhatsappComponent);
