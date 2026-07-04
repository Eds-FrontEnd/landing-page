# 🎯 Front-End Clean Code Guidelines (HTML, CSS & JavaScript)

> Guia de padronização Front-End baseado em Clean Code, legibilidade, manutenção e escalabilidade.

---

# 🎯 Objetivos

* Melhorar legibilidade e manutenção
* Padronizar nomenclaturas
* Reduzir complexidade
* Facilitar onboarding
* Melhorar escalabilidade
* Evitar código ambíguo

---

# 🌎 Idioma do Código

Todo o código deve ser escrito em inglês:

* Variables
* Functions
* Classes
* Components
* Files
* Folders
* CSS Classes
* IDs

---

# 🧠 Convenções de Nomenclatura

## Variáveis

Utilize nomes claros e autoexplicativos.

### ✅ Correto

```js
const userName = 'John';
const totalAmount = 1500;
const selectedProducts = [];
```

### ❌ Evitar

```js
const usr = 'John';
const val = 1500;
const list = [];
```

## Booleanos

Devem iniciar com:

* is
* has
* can
* should
* did

```js
const isLoading = true;
const hasPermission = false;
const canEdit = true;
```

## Arrays

Devem utilizar nomes no plural.

```js
const users = [];
const products = [];
const selectedItems = [];
```

## Constantes

Utilizar `UPPER_SNAKE_CASE`.

```js
const API_URL = '/api';
const MAX_RETRY_ATTEMPTS = 3;
```

---

# ⚙️ Funções

## Regras

* Devem iniciar com verbo
* Devem possuir responsabilidade única
* Devem ser pequenas e objetivas
* Devem revelar claramente sua intenção

### Prefixos recomendados

```txt
get        fetch      load
set        update     create
remove     delete     save
validate   format     calculate
handle     filter     sort
parse      build      generate
reset      toggle     open
close      submit
```

### ✅ Correto

```js
function fetchUsers() {}

function validateForm() {}

function calculateTotalPrice() {}

function handleSubmit() {}
```

### ❌ Evitar

```js
function process() {}

function execute() {}

function data() {}
```

---

# 🏛️ Classes

Utilizar `PascalCase`.

```js
class UserService {}

class ApiClient {}

class CartManager {}
```

---

# 📁 Arquivos e Pastas

## Arquivos

Utilizar `kebab-case`.

```txt
user-service.js
cart-manager.js
form-validator.js
main.css
```

## Pastas

```txt
user-management
shopping-cart
shared-components
```

---

# 🎯 Eventos

Handlers devem iniciar com `handle`.

```js
handleClick();
handleSubmit();
handleChange();
handleCloseModal();
```

---

# ⏳ Código Assíncrono

Preferir `async/await`.

### ✅ Correto

```js
async function fetchUsers() {
  const response = await fetch('/users');

  return response.json();
}
```

### ❌ Evitar

```js
fetch('/users')
  .then(response => response.json())
  .then(data => {});
```

---

# 🧼 Clean Code

## Princípios

* Uma função deve fazer apenas uma coisa
* Utilizar early return
* Evitar nesting excessivo
* Evitar duplicação
* Evitar comentários desnecessários
* Evitar números mágicos
* Priorizar clareza sobre complexidade

### Exemplo

```js
function calculateDiscount(price) {
  if (price <= 0) {
    return 0;
  }

  return price * 0.1;
}
```

---

# 📐 Formatação e Indentação

## Regras

* Utilizar 2 ou 4 espaços de forma consistente
* Uma instrução por linha
* Espaçamento adequado entre blocos
* Limite razoável de largura da linha

### ✅ Correto

```js
function getUser(id) {
  if (!id) {
    return null;
  }

  return users.find(user => user.id === id);
}
```

### ❌ Evitar

```js
function getUser(id){if(!id)return null;return users.find(user=>user.id===id);}
```

---

# 🏗️ Separação de Responsabilidades

Cada arquivo deve possuir uma responsabilidade clara.

### Exemplo

```txt
css/
├── main.css
├── layout.css
├── components.css

js/
├── api.js
├── validation.js
├── cart.js
├── main.js
```

Evite arquivos gigantes contendo regras de estilo, lógica de negócio e manipulação de DOM ao mesmo tempo.

---

# 🏷️ HTML

## Regras

* Utilizar HTML semântico
* Priorizar acessibilidade
* Evitar divs desnecessárias
* Utilizar atributos adequados

### ✅ Correto

```html
<header>
  <nav></nav>
</header>

<main>
  <section></section>
</main>

<footer></footer>
```

### ❌ Evitar

```html
<div class="header"></div>
<div class="content"></div>
<div class="footer"></div>
```

---

# 🎨 CSS

## Regras

* Utilizar nomes descritivos
* Evitar seletores excessivamente específicos
* Reutilizar classes
* Organizar propriedades de forma consistente

## Metodologia BEM

Utilizar BEM (Block, Element, Modifier) para nomeação de classes CSS.

### Estrutura

```css
.block {}

.block__element {}

.block--modifier {}
```

### Exemplo

```html
<div class="product-card">
  <img class="product-card__image" />

  <div class="product-card__content">
    <h2 class="product-card__title">Product Name</h2>

    <button class="product-card__button product-card__button--primary">
      Buy Now
    </button>
  </div>
</div>
```

```css
.product-card {
  display: flex;
}

.product-card__image {
  width: 100%;
}

.product-card__title {
  font-size: 1.25rem;
}

.product-card__button {
  padding: 0.75rem 1rem;
}

.product-card__button--primary {
  background-color: #2563eb;
  color: #fff;
}
```

### ✅ Fazer

* Utilizar blocos independentes
* Utilizar elementos apenas quando pertencerem ao bloco
* Utilizar modificadores para variações visuais ou comportamentais
* Manter nomes descritivos e consistentes
* Reutilizar componentes sempre que possível

```css
.card {}
.card__title {}
.card__description {}
.card--featured {}
```

### ❌ Evitar

* Encadeamentos excessivos
* Dependência da estrutura do HTML
* Classes genéricas sem contexto
* Misturar múltiplas responsabilidades na mesma classe

```css
/* Evitar */
.content .wrapper .card .title {}

/* Evitar */
.red {}
.big {}
.left {}

/* Evitar */
.product-card-title {}
.product-card-image {}
```

### Regra Geral

A classe deve representar o componente e sua responsabilidade, não sua posição na página.

### ✅ Correto

```css
.user-card {}
.user-card__avatar {}
.user-card__name {}
.user-card--active {}
```

### ❌ Errado

```css
.left-sidebar-user {}
.homepage-user-name {}
.header-profile-image {}
```
## Variáveis CSS

Utilize Custom Properties (`CSS Variables`) para valores reutilizáveis como cores, espaçamentos, tipografia, sombras, bordas e z-index.

### ✅ Correto

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;

  --color-text: #111827;
  --color-background: #ffffff;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  --border-radius-md: 8px;

  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;

  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  color: var(--color-background);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

### ❌ Evitar

```css
.button {
  padding: 8px 16px;
  background-color: #2563eb;
  border-radius: 8px;
  color: #ffffff;
}

.card {
  border-radius: 8px;
}

.modal {
  border-radius: 8px;
}
```

### Benefícios

* Centraliza configurações visuais
* Facilita manutenção e refatoração
* Evita valores duplicados
* Facilita implementação de temas (Light/Dark Mode)
* Mantém consistência visual em toda aplicação

### Regras

* Declarar variáveis globais em `:root`
* Utilizar nomes semânticos
* Evitar nomes baseados em cor específica quando representarem função

### ✅ Preferir

```css
--color-primary
--color-success
--color-error
--color-text
--color-background
```

### ❌ Evitar

```css
--blue
--green
--red
--white
```

A variável deve representar o propósito do valor, não apenas sua aparência.

---

# ♿ Acessibilidade

* Utilizar HTML semântico
* Utilizar labels em formulários
* Garantir navegação por teclado
* Utilizar atributos ARIA quando necessário
* Fornecer textos alternativos para imagens

### Exemplo

```html
<button
  type="button"
  aria-label="Close modal"
>
  Close
</button>
```

---

# 🚀 Performance

* Minimizar manipulações desnecessárias do DOM
* Utilizar lazy loading para imagens
* Evitar consultas repetidas ao DOM
* Reutilizar seletores quando possível
* Carregar apenas recursos necessários

---

# 🌳 Git

## Branches

```txt
feature/login-page
bugfix/header-scroll
hotfix/api-timeout
```

## Commits

```txt
feat: add login validation
fix: resolve form bug
refactor: improve cart module
style: update button styles
```

---

# 📌 Regras Gerais

* Código simples > código complexo
* Legibilidade é prioridade
* Evitar duplicação
* Evitar acoplamento excessivo
* Remover código morto
* Remover arquivos não utilizados
* Padronizar estrutura dos projetos
* Escrever código pensando em manutenção futura

---

# ✅ Objetivo Final

Todo código deve ser:

* Legível
* Previsível
* Reutilizável
* Escalável
* Simples
* Sustentável
* Fácil de manter
* Fácil de evoluir
