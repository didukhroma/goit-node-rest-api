import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';
import validateBody from '../decorators/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from '../schemas/contactsSchemas.js';

const createContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);
const updateContactStatusMiddleware = validateBody(updateContactStatusSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAllContacts);

contactsRouter.get('/:id', contactsControllers.getOneContact);

contactsRouter.delete('/:id', contactsControllers.deleteContact);

contactsRouter.post(
  '/',
  createContactMiddleware,
  contactsControllers.createContact,
);

contactsRouter.put(
  '/:id',
  updateContactMiddleware,
  contactsControllers.updateContact,
);
contactsRouter.patch(
  '/:id/favorite/',
  updateContactStatusMiddleware,
  contactsControllers.updateContact,
);

export default contactsRouter;
