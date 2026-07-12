class SloganComponent extends HTMLElement {
  connectedCallback() {
    const slogan = this.getAttribute("text") || "";

    if (!slogan.trim()) {
      this.style.display = "none";
      return;
    }

    this.innerHTML = `
      <span class="slogan">
        ${slogan}
      </span>
    `;
  }
}

customElements.define("slogan-component", SloganComponent);
