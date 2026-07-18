const CONTACT_STORAGE_KEY = "contact-messages";

export class ContactStorage {
  static getAll() {
    try {
      const storage = localStorage.getItem(CONTACT_STORAGE_KEY);

      if (!storage) {
        return [];
      }

      const contacts = JSON.parse(storage);

      return Array.isArray(contacts) ? contacts : [];
    } catch (error) {
      console.error("Erro ao recuperar as mensagens de contato:", error);

      return [];
    }
  }

  static save(contact) {
    if (!contact || typeof contact !== "object") {
      throw new Error("Contato inválido.");
    }

    try {
      const contacts = this.getAll();

      const updatedContacts = [...contacts, contact];

      localStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify(updatedContacts),
      );

      return contact;
    } catch (error) {
      console.error("Erro ao salvar a mensagem de contato:", error);

      throw new Error("Não foi possível salvar a mensagem.");
    }
  }

  static remove(id) {
    if (!id) {
      return;
    }

    try {
      const contacts = this.getAll();

      const updatedContacts = contacts.filter((contact) => contact.id !== id);

      localStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify(updatedContacts),
      );
    } catch (error) {
      console.error("Erro ao remover a mensagem:", error);
    }
  }

  static findById(id) {
    if (!id) {
      return null;
    }

    return this.getAll().find((contact) => contact.id === id) ?? null;
  }

  static update(id, updatedData) {
    if (!id || !updatedData) {
      throw new Error("Dados inválidos para atualização.");
    }

    try {
      const contacts = this.getAll();

      const updatedContacts = contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updatedData,
            }
          : contact,
      );

      localStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify(updatedContacts),
      );
    } catch (error) {
      console.error("Erro ao atualizar a mensagem:", error);

      throw new Error("Não foi possível atualizar a mensagem.");
    }
  }

  static clear() {
    try {
      localStorage.removeItem(CONTACT_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar as mensagens:", error);
    }
  }

  static count() {
    return this.getAll().length;
  }

  static exists(email) {
    if (!email) {
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();

    return this.getAll().some((contact) => contact.email === normalizedEmail);
  }
}
