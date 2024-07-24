import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

const updateFile = async (data) => {
  await writeFile(contactsPath, JSON.stringify(data, null, 2), (err) => {
    throw err;
  });
};

const listContacts = async () =>
  JSON.parse(await readFile(contactsPath, "utf-8"));

const getContactById = async (contactId) =>
  (await listContacts()).find(({ id }) => id === contactId) || null;

const addContact = async (data) => {
  const contactId = nanoid();
  const newContact = { id: contactId, ...data };
  try {
    const contactsList = await listContacts();

    await updateFile([...contactsList, newContact]);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const contactIdx = contactsList.findIndex(({ id }) => id === contactId);
    if (!~contactIdx) return null;

    const [contact] = contactsList.splice(contactIdx, 1);

    await updateFile(contactsList);

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};
const updateContact = async (contactId) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
