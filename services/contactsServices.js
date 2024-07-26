import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { nanoid } from 'nanoid';

const contactsPath = resolve('db', 'contacts.json');

const updateFile = async data => {
  try {
    return await writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (err) {
    err.message = 'Server error. Cannot write data';
    throw err;
  }
};

const listContacts = async () => {
  try {
    return JSON.parse(await readFile(contactsPath, 'utf-8'));
  } catch (err) {
    err.message = 'Server error. Cannot read data';
    throw err;
  }
};

const getContactById = async contactId =>
  (await listContacts()).find(({ id }) => id === contactId) || null;

const addContact = async data => {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), ...data };
  await updateFile([...contactsList, newContact]);
  return newContact;
};

const removeContact = async contactId => {
  const contactsList = await listContacts();
  const contactIdx = contactsList.findIndex(({ id }) => id === contactId);
  if (!~contactIdx) return null;
  const [contact] = contactsList.splice(contactIdx, 1);
  await updateFile(contactsList);
  return contact;
};

const updateContact = async (contactId, data) => {
  const contactsList = await listContacts();
  const contactIdx = contactsList.findIndex(({ id }) => id === contactId);
  if (!~contactIdx) return null;
  contactsList[contactIdx] = { ...contactsList[contactIdx], ...data };
  await updateFile(contactsList);
  return contactsList[contactIdx];
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
