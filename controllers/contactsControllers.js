import contactsServices from '../services/contactsServices.js';

import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';
import prepareMessage from '../helpers/prepareMessage.js';

const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.status(HttpCode[200].code).json({
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(HttpError(HttpCode[404].code, prepareMessage(e.message)));
  }
};

const getOneContact = async ({ params: { id } }, res, next) => {
  try {
    const contact = await contactsServices.getContactById(id);
    if (!contact) throw HttpError(HttpCode[404].code, HttpCode[404].status);
    res.status(HttpCode[200].code).json({ data: { contact } });
  } catch (e) {
    next(e);
  }
};

const deleteContact = async ({ params: { id } }, res, next) => {
  try {
    const contact = await contactsServices.removeContact(id);
    if (!contact) throw HttpError(HttpCode[404].code, HttpCode[404].status);
    res.status(HttpCode[200].code).json({ data: { contact } });
  } catch (e) {
    next(e);
  }
};

const createContact = (req, res) => {};

const updateContact = (req, res) => {};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
