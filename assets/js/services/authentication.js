const STORAGE_KEYS = Object.freeze({
  USERS: "users",
  SESSION: "userActive",
});

/**
 * Lê os usuários cadastrados.
 * @returns {Array}
 */
function readUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Salva a lista de usuários.
 * @param {Array} users
 */
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

/**
 * Cadastra um novo usuário.
 * @param {{email:string, senha:string}} user
 */
export function useRegister(user) {
  if (!user?.email || !user?.senha) {
    throw new Error("Preencha todos os campos.");
  }

  const users = readUsers();

  const email = user.email.trim().toLowerCase();

  const exists = users.some((currentUser) => currentUser.email === email);

  if (exists) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  users.push({
    email,
    senha: user.senha,
  });

  saveUsers(users);
}

/**
 * Realiza login.
 * @param {string} email
 * @param {string} senha
 * @returns {Object}
 */
export function userLogin(email, senha) {
  const users = readUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (currentUser) =>
      currentUser.email === normalizedEmail && currentUser.senha === senha,
  );

  if (!user) {
    throw new Error("E-mail ou senha incorretos.");
  }

  localStorage.setItem(
    STORAGE_KEYS.SESSION,
    JSON.stringify({
      email: user.email,
    }),
  );

  return user;
}

/**
 * Retorna o usuário logado.
 * @returns {{email:string}|null}
 */
export function getCurrentUser() {
  const session = localStorage.getItem(STORAGE_KEYS.SESSION);

  return session ? JSON.parse(session) : null;
}

/**
 * Verifica se existe usuário autenticado.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Encerra a sessão.
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}
