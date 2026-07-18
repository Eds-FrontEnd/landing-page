import { ContactStorage } from "../../services/contact-storage.js";

class ContactPageComponent extends HTMLElement {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connectedCallback() {
    this.config = {
      title: "Entre em contato",
      button: "Enviar mensagem",
      loading: "Enviando...",
      successTitle: "Mensagem enviada!",
      successSubtitle:
        "Agradecemos sua participação. Sua sugestão, elogio ou crítica é muito importante para continuarmos melhorando.",
    };

    this.render();

    this.initializeElements();
    this.addEvents();
  }

  disconnectedCallback() {
    this.removeEvents();
  }

  initializeElements() {
    this.form = this.querySelector("form");
    this.nameInput = this.querySelector("#name");
    this.emailInput = this.querySelector("#email");
    this.messageInput = this.querySelector("#contact-message");
    this.feedback = this.querySelector("#feedback");
    this.submitButton = this.querySelector(".contact__button");
  }

  addEvents() {
    this.form?.addEventListener("submit", this.handleSubmit);
  }

  removeEvents() {
    this.form?.removeEventListener("submit", this.handleSubmit);
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.clearMessage();

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.setLoading(true);

    try {
      const contact = {
        id: crypto.randomUUID(),
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim().toLowerCase(),
        message: this.messageInput.value.trim(),
        createdAt: new Date().toISOString(),
      };

      ContactStorage.save(contact);

      document.dispatchEvent(
        new CustomEvent("open-modal", {
          detail: {
            title: this.config.successTitle,
            subtitle: this.config.successSubtitle,
          },
        }),
      );

      this.form.reset();

      const whatsappNumber = "5559999999999";

      const whatsappMessage = encodeURIComponent(
        `Olá! Acabei de enviar uma mensagem pelo formulário de contato.\n\n` +
          `Nome: ${contact.name}\n` +
          `E-mail: ${contact.email}\n` +
          `Mensagem: ${contact.message}`,
      );

      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        const newWindow = window.open(whatsappUrl, "noopener,noreferrer");

        if (!newWindow) {
          window.location.replace(whatsappUrl);
          return;
        }

        window.location.replace("../../../index.html");
      }, 2000);
    } catch (error) {
      this.showMessage(
        error?.message ??
          "Não foi possível enviar sua mensagem. Tente novamente.",
      );
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(isLoading) {
    this.submitButton.disabled = isLoading;
    this.submitButton.setAttribute("aria-busy", String(isLoading));

    this.submitButton.textContent = isLoading
      ? this.config.loading
      : this.config.button;
  }

  showMessage(message) {
    this.feedback.textContent = message;
  }

  clearMessage() {
    this.feedback.textContent = "";
  }

  render() {
    this.innerHTML = `
      <form>

        <fieldset class="contact__fieldset">

          <legend class="contact__title">
            ${this.config.title}
          </legend>

          <div class="contact__group">
            <label
              class="contact__label"
              for="name"
            >
              Nome
            </label>

            <input
              class="contact__input"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              minlength="3"
              maxlength="80"
              required
              aria-required="true"
              aria-describedby="feedback"
            />
          </div>

          <div class="contact__group">
            <label
              class="contact__label"
              for="email"
            >
              E-mail
            </label>

            <input
              class="contact__input"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              maxlength="120"
              required
              aria-required="true"
              aria-describedby="feedback"
            />
          </div>

          <div class="contact__group">
            <label
              class="contact__label"
              for="contact-message"
            >
              Mensagem
            </label>

            <textarea
              class="contact__textarea"
              id="contact-message"
              name="message"
              rows="1"
              minlength="10"
              maxlength="1000"
              required
              aria-required="true"
              aria-describedby="feedback"
            ></textarea>
          </div>

          <p
            id="feedback"
            class="contact__feedback"
            role="alert"
            aria-live="polite"
          ></p>

          <button
            class="contact__button"
            type="submit"
          >
            ${this.config.button}
          </button>

        </fieldset>

      </form>
    `;
  }
}

customElements.define("contact-page-component", ContactPageComponent);
