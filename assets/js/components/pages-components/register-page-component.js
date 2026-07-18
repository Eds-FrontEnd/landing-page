import { useRegister, userLogin } from "../../services/authentication.js";

class RegisterComponent extends HTMLElement {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connectedCallback() {
    this.isRegisterPage = window.location.pathname.includes("register-page");

    this.config = this.isRegisterPage
      ? {
          title: "Inscreva-se",
          button: "Cadastrar",
          loading: "Cadastrando...",
          linkText: "Já tenho conta",
          linkHref: "../login/login-page.html",
          successTitle: "Cadastro realizado com sucesso!",
          redirectHref: "../../login/login-page.html",
        }
      : {
          title: "",
          button: "Entrar",
          loading: "Entrando...",
          linkText: "Criar nova conta",
          linkHref: "../register/register-page.html",
          successTitle: "Login realizado com sucesso!",
          redirectHref: "../../../index.html",
        };

    this.render();

    this.form = this.querySelector(".register-or-login__form");
    this.emailInput = this.querySelector("#email");
    this.passwordInput = this.querySelector("#password");
    this.message = this.querySelector("#message");
    this.submitButton = this.querySelector(".register-or-login__button");

    this.form?.addEventListener("submit", this.handleSubmit);
  }

  disconnectedCallback() {
    this.form?.removeEventListener("submit", this.handleSubmit);
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.clearMessage();

    if (this.form && !this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.submitButton.disabled = true;
    this.submitButton.textContent = this.config.loading;

    const email = this.emailInput.value.trim();
    const senha = this.passwordInput.value;

    try {
      if (this.isRegisterPage) {
        await useRegister({ email, senha });
      } else {
        await userLogin(email, senha);
      }

      document.dispatchEvent(
        new CustomEvent("open-modal", {
          detail: {
            title: this.config.successTitle,
          },
        }),
      );

      setTimeout(() => {
        window.location.assign(this.config.redirectHref);
      }, 3000);
    } catch (error) {
      if (!this.isRegisterPage) {
        this.showMessage("E-mail ou senha inválido.");
      } else {
        this.showMessage(error?.message || "Erro ao processar a solicitação.");
      }
    } finally {
      this.submitButton.disabled = false;
      this.submitButton.textContent = this.config.button;
    }
  }

  showMessage(message) {
    this.message.textContent = message;
  }

  clearMessage() {
    this.message.textContent = "";
  }

  render() {
    this.innerHTML = `
      <form class="register-or-login__form">

        <h1 class="register-or-login__title">
          ${this.config.title}
        </h1>

        <div class="register-or-login__group">

          <label 
            class="register-or-login__label" 
            for="email"
          >
            E-mail
          </label>

          <input
            class="register-or-login__input"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            minlength="8"
            required
          />

        </div>


        <div class="register-or-login__group">

          <label 
            class="register-or-login__label" 
            for="password"
          >
            Senha
          </label>

          <input
            class="register-or-login__input"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            minlength="5"
            required
          />

        </div>


        <p
          id="message"
          class="register-or-login__message"
          role="alert"
          aria-live="polite"
        ></p>


        <button 
          class="register-or-login__button" 
          type="submit"
        >
          ${this.config.button}
        </button>


        <p class="register-or-login__footer">

          <a 
            class="register-or-login__link" 
            href="${this.config.linkHref}"
          >
            ${this.config.linkText}
          </a>

        </p>

      </form>
    `;
  }
}

customElements.define("register-component", RegisterComponent);
