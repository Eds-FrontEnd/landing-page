import { CartStorage } from "../services/cart-storage.js";

class ModalComponent extends HTMLElement {
  constructor() {
    super();

    this.modal = null;
    this.closeButton = null;
    this.overlay = null;
    this.lastFocusedElement = null;

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "Pedido realizado";
    const subtitle = this.getAttribute("subtitle") || "";
    const message = this.getAttribute("msg") || "";

    this.innerHTML = `
      <section
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-subtitle"
        tabindex="-1"
        hidden
      >
        <div class="modal__overlay"></div>

        <div class="modal__content" role="document">
          <header class="modal__header">
            <div>
              <h2
                id="modal-title"
                class="modal__title"
              >
                ${title}
              </h2>

             <p
                id="modal-subtitle"
                class="modal__subtitle"
                ${subtitle ? "" : "hidden"}
                >
                ${subtitle}
            </p>
            </div>

            <button
              class="modal__close"
              type="button"
              aria-label="Fechar modal"
            >
               <img 
                    src="../../../assets/images/icons/close.svg" 
                    alt="" 
                    aria-hidden="true" 
                    width="30" 
                    height="30" 
                    loading="lazy" 
                    style="pointer-events: none;"
                />
            </button>
          </header>

          <section class="modal__body">
            ${message}
          </section>
        </div>
      </section>
    `;

    this.modal = this.querySelector(".modal");
    this.closeButton = this.querySelector(".modal__close");
    this.overlay = this.querySelector(".modal__overlay");

    this.closeButton.addEventListener("click", this.handleClose);
    this.overlay.addEventListener("click", this.handleClose);

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("open-modal", this.handleOpenModal);
  }

  disconnectedCallback() {
    this.closeButton?.removeEventListener("click", this.handleClose);
    this.overlay?.removeEventListener("click", this.handleClose);

    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("open-modal", this.handleOpenModal);
  }

  handleOpenModal(event) {
    console.log(event.detail);
    const detail = event.detail || {};

    const title = this.querySelector("#modal-title");
    const subtitle = this.querySelector("#modal-subtitle");
    const body = this.querySelector(".modal__body");

    if (detail.title && title) {
      title.textContent = detail.title;
    }

    if (subtitle) {
      if (detail.subtitle) {
        subtitle.textContent = detail.subtitle;
        subtitle.hidden = false;
      } else {
        subtitle.hidden = true;
      }
    }

    if (detail.message && body) {
      body.innerHTML = detail.message;
    }

    this.open();
  }

  handleKeyDown(event) {
    if (!this.modal || this.modal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      this.close();
    }
  }

  handleClose() {
    CartStorage.clear();
    this.close();

    window.location.replace("../../../../index.html");
  }

  open() {
    if (!this.modal) {
      return;
    }

    this.lastFocusedElement = document.activeElement;

    this.modal.hidden = false;

    requestAnimationFrame(() => {
      this.modal.focus();
    });
  }

  close() {
    if (!this.modal) {
      return;
    }

    this.modal.hidden = true;

    if (this.lastFocusedElement instanceof HTMLElement) {
      this.lastFocusedElement.focus();
    }
  }
}

if (!customElements.get("modal-component")) {
  customElements.define("modal-component", ModalComponent);
}

export { ModalComponent };
