class MenuComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="menu" aria-label="Menu principal">
                <ul class="menu__list">
                    <li class="menu__item">
                        <a href="#inicio" class="menu__link">Início</a>
                    </li>
                    <li class="menu__item">
                        <a href="#conceito" class="menu__link">Conceito</a>
                    </li>
                    <li class="menu__item">
                        <a href="#produtos" class="menu__link">Produtos</a>
                    </li>
                </ul>
            </nav>
        `
    }
}

customElements.define('menu-component', MenuComponent);