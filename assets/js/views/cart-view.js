export class RenderCart extends HTMLElement {
  constructor() {
    super();

    this._onClose = null;
    this._onUpdateQuantity = null;
    this._onRemoveProduct = null;

    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
  }

  escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag] || tag,
    );
  }

  setupActions({ onClose, onUpdateQuantity, onRemoveProduct }) {
    this._onClose = onClose;
    this._onUpdateQuantity = onUpdateQuantity;
    this._onRemoveProduct = onRemoveProduct;
  }

  _handleClick(event) {
    const target = event.target;

    if (target.matches(".cart__close") || target.matches(".cart-overlay")) {
      if (this._onClose) this._onClose();
      return;
    }

    const minusBtn = target.closest("[data-minus]");
    if (minusBtn && this._onUpdateQuantity) {
      this._onUpdateQuantity(Number(minusBtn.dataset.minus), -1);
      return;
    }

    const plusBtn = target.closest("[data-plus]");
    if (plusBtn && this._onUpdateQuantity) {
      this._onUpdateQuantity(Number(plusBtn.dataset.plus), 1);
      return;
    }

    const removeBtn = target.closest("[data-remove]");
    if (removeBtn && this._onRemoveProduct) {
      this._onRemoveProduct(Number(removeBtn.dataset.remove));
    }

    const payBtn = target.closest(".cart__pay");

    if (payBtn) {
      localStorage.removeItem("cart-items");

      document.dispatchEvent(new CustomEvent("cart-clear"));

      document.dispatchEvent(
        new CustomEvent("cart-updated", {
          detail: {
            totalItems: 0,
          },
        }),
      );

      if (this._onClose) {
        this._onClose();
      }

      document.dispatchEvent(
        new CustomEvent("open-modal", {
          detail: {
            title: "Pedido realizado!",
            subtitle: "Obrigado pela preferência!",
            message: "Seu pedido foi enviado com sucesso.",
          },
        }),
      );

      return;
    }
  }

  render({ products, isOpen, total }) {
    // 1. Guarda se o carrinho já estava aberto antes desta renderização
    const wasAlreadyOpen =
      this.querySelector(".cart")?.classList.contains("cart--open");

    this.innerHTML = `
      <div class="cart-overlay"></div>

      <aside
        class="cart"
        aria-label="Carrinho de compras"
      >
        <header class="cart__header">
          <h2 class="cart__title">
            Meu carrinho
          </h2>

          <button
            class="cart__close"
            type="button"
            aria-label="Fechar carrinho"
          >
            <img 
              src="./assets/images/icons/close.svg" 
              alt="" 
              aria-hidden="true" 
              width="30" 
              height="30" 
              loading="lazy" 
              style="pointer-events: none;"
            />
          </button>
        </header>

        <section class="cart__list">
          ${
            products.length
              ? products
                  .map(
                    (product) => `
                      <article class="cart__item">
                        <img
                          class="cart__image"
                          src="${this.escapeHTML(product.image)}"
                          alt="${this.escapeHTML(product.title)}"
                          width="70"
                          height="70"
                          loading="lazy"
                        />

                        <div class="cart__content">
                          <h3 class="cart__name">
                            ${this.escapeHTML(product.title)}
                          </h3>

                          <strong class="cart__price">
                            R$
                            ${product.price.toFixed(2).replace(".", ",")}
                          </strong>

                          <div class="cart__actions">
                            <button
                              class="cart__button"
                              type="button"
                              data-minus="${product.id}"
                              aria-label="Diminuir quantidade"
                            >
                              <img 
                                src="./assets/images/icons/minus.svg" 
                                alt="" 
                                aria-hidden="true" 
                                width="30" 
                                height="30" 
                                loading="lazy" 
                                style="pointer-events: none;"
                              />
                            </button>

                            <span class="cart__quantity">
                              ${product.quantity}
                            </span>

                            <button
                              class="cart__button"
                              type="button"
                              data-plus="${product.id}"
                              aria-label="Aumentar quantidade"
                            >
                              <img 
                                src="./assets/images/icons/plus.svg" 
                                alt="" 
                                aria-hidden="true" 
                                width="30" 
                                height="30" 
                                loading="lazy" 
                                style="pointer-events: none;"
                              />
                            </button>

                            <button
                              class="cart__remove"
                              type="button"
                              data-remove="${product.id}"
                              aria-label="Remover produto"
                            >
                              <img 
                                src="./assets/images/icons/trash.svg" 
                                alt="" 
                                aria-hidden="true" 
                                width="23" 
                                height="23" 
                                loading="lazy" 
                                style="pointer-events: none;"
                              />
                            </button>
                          </div>
                        </div>
                      </article>
                    `,
                  )
                  .join("")
              : `
                  <div class="cart__empty">
                    <p class="cart__empty--info">
                      Seu carrinho está vazio.
                    </p>
                    <img 
                      src="./assets/images/icons/cart-empty.svg" 
                      alt="" 
                      aria-hidden="true" 
                      width="64" 
                      height="64" 
                      loading="lazy" 
                    />
                  </div>
                `
          }
        </section>

        ${
          products.length
            ? `
              <footer class="cart__footer">
                <button
                  class="cart__pay"
                  type="button"
                  aria-label="Finalizar compra"
                >
                  Finalizar compra
                </button>
                <strong class="cart__total">
                  Total:
                  R$ ${total.toFixed(2).replace(".", ",")}
                </strong>
              </footer>
            `
            : ""
        }
      </aside>
    `;

    const overlay = this.querySelector(".cart-overlay");
    const cart = this.querySelector(".cart");

    if (!overlay || !cart) return;

    if (isOpen) {
      if (wasAlreadyOpen) {
        // Se já estava aberto, mantém aberto instantaneamente sem re-animar do zero
        overlay.classList.add("cart-overlay--show");
        cart.classList.add("cart--open");
      } else {
        // Se estava fechado, espera o navegador registrar o HTML base e adiciona a classe no próximo frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            overlay.classList.add("cart-overlay--show");
            cart.classList.add("cart--open");
          });
        });
      }
    } else {
      // Caso esteja fechado, garante a remoção das classes
      overlay.classList.remove("cart-overlay--show");
      cart.classList.remove("cart--open");
    }
  }
}

if (!customElements.get("render-cart")) {
  customElements.define("render-cart", RenderCart);
}
