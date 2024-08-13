import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';
import contactsServices from '../services/contactsServices.js';

const getAllContacts = async ({ user: { id }, query }, res) => {
  const contacts = await contactsServices.listContacts(id, query);
  res.json([...contacts]);
};

const getOneContact = async (
  { user: { id: userId }, params: { id: contactId } },
  res,
) => {
  const contact = await contactsServices.getContactById(userId, contactId);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json(contact);
};

const deleteContact = async (
  { user: { id: userId }, params: { id: contactId } },
  res,
) => {
  const contact = await contactsServices.removeContact(userId, contactId);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json(contact);
};

const createContact = async ({ user: { id: userId }, body }, res) => {
  const contact = await contactsServices.addContact(userId, body);
  res.status(HttpCode[201].code).json(contact);
};

const updateContact = async (
  { user: { id: userId }, params: { id: contactId }, body },
  res,
) => {
  if (!Object.keys(body).length) {
    throw HttpError(HttpCode[404].code, 'Body must have at least one field');
  }
  const contact = await contactsServices.updateContact(userId, contactId, body);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json(contact);
};

const updateStatusContact = async (
  { user: { id: userId }, params: { id: contactId }, body },
  res,
) => {
  const contact = await contactsServices.updateContact(userId, contactId, body);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
