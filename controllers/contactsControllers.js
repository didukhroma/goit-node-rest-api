import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';
import contactsServices from '../services/contactsServices.js';

const getAllContacts = async (_, res) => {
  const contacts = await contactsServices.listContacts();
  res.json({
    contacts,
  });
};

const getOneContact = async ({ params: { id } }, res) => {
  const contact = await contactsServices.getContactById(id);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json({ contact });
};

const deleteContact = async ({ params: { id } }, res) => {
  const contact = await contactsServices.removeContact(id);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json({ contact });
};

const createContact = async ({ body }, res) => {
  const contact = await contactsServices.addContact(body);
  res.status(HttpCode[201].code).json({ contact });
};

const updateContact = async ({ params: { id }, body }, res) => {
  if (!Object.keys(body).length) {
    throw HttpError(HttpCode[404].code, 'Body must have at least one field');
  }
  const contact = await contactsServices.updateContact(id, body);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json({ contact });
};

const updateStatusContact = async ({ params: { id }, body }, res) => {
  const contact = await contactsServices.updateContact(id, body);
  if (!contact) throw HttpError(HttpCode[404].code);
  res.json({ contact });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
