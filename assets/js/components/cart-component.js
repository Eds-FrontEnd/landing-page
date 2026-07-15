import { RenderCart } from "../views/cart-view.js";

if (!customElements.get("render-cart")) {
  customElements.define("render-cart", RenderCart);
}

class CartComponent extends HTMLElement {
  constructor() {
    super();

    try {
      const savedProducts = localStorage.getItem("cart-items");
      this.products = savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage:", error);
      this.products = [];
    }

    this.isOpen = false;
    this.view = null;

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
  }

  connectedCallback() {
    this.innerHTML = "";

    this.view = document.createElement("render-cart");
    this.appendChild(this.view);

    this.view.setupActions({
      onClose: () => this.close(),
      onUpdateQuantity: (id, value) => this.updateQuantity(id, value),
      onRemoveProduct: (id) => this.removeProduct(id),
    });

    this.updateUI();
    this.dispatchCartEvent();

    document.addEventListener("add-to-cart", this.handleAddToCart);
    document.addEventListener("open-cart", this.handleOpenCart);
  }

  disconnectedCallback() {
    document.removeEventListener("add-to-cart", this.handleAddToCart);
    document.removeEventListener("open-cart", this.handleOpenCart);
  }

  handleAddToCart(event) {
    this.addProduct(event.detail);
  }

  handleOpenCart() {
    this.open();
  }

  addProduct(product) {
    const productExists = this.products.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity++;
    } else {
      this.products.push({
        ...product,
        quantity: 1,
      });
    }

    this.isOpen = true;
    this.updateUI();
    this.dispatchCartEvent();
  }

  updateQuantity(id, value) {
    const product = this.products.find((item) => item.id === id);

    if (!product) return;

    product.quantity += value;

    if (product.quantity <= 0) {
      this.removeProduct(id);
      return;
    }

    this.updateUI();
    this.dispatchCartEvent();
  }

  removeProduct(id) {
    this.products = this.products.filter((item) => item.id !== id);
    this.updateUI();
    this.dispatchCartEvent();
  }

  total() {
    return this.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  dispatchCartEvent() {
    const totalItems = this.products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    document.dispatchEvent(
      new CustomEvent("cart-updated", {
        detail: {
          totalItems,
        },
      }),
    );
  }

  open() {
    this.isOpen = true;
    this.updateUI();
  }

  close() {
    this.isOpen = false;
    this.updateUI();
  }

  updateUI() {
    try {
      localStorage.setItem("cart-items", JSON.stringify(this.products));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }

    if (this.view) {
      this.view.render({
        products: this.products,
        isOpen: this.isOpen,
        total: this.total(),
      });
    }
  }
}

if (!customElements.get("cart-component")) {
  customElements.define("cart-component", CartComponent);
}

export { CartComponent };
