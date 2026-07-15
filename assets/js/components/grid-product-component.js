class GridProductComponent extends HTMLElement {
  connectedCallback() {
    const { id, title, image, category, price } = this.product;

    this.innerHTML = `
      <article
        class="product-card"
        aria-labelledby="product-title-${id}"
      >
        <img
          class="product-card__image"
          src="${image}"
          alt="${title}"
          width="150"
          height="150"
          loading="lazy"
        />

        <div class="product-card__content">
          <span class="product-card__category">
            ${category}
          </span>

          <h2
            id="product-title-${id}"
            class="product-card__title"
          >
            ${title}
          </h2>

          <strong class="product-card__price">
            R$ ${price.toFixed(2).replace(".", ",")}
          </strong>
          <button 
            class="product-card__add"
            type="button">
            Eu quero!
          </button>
        </div>
      </article>
    `;

    this.querySelector(".product-card__add").addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("add-to-cart", {
          detail: {
            id,
            title,
            image,
            category,
            price,
          },
        }),
      );
    });
  }
}

customElements.define("grid-product-component", GridProductComponent);
