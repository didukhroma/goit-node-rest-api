import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';
import validateBody from '../decorators/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from '../schemas/contactsSchemas.js';

const createContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);
const updateContactStatusMiddleware = validateBody(updateContactStatusSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsControllers.getAllContacts);

contactsRouter.get('/:id', authenticate, contactsControllers.getOneContact);

contactsRouter.delete('/:id', authenticate, contactsControllers.deleteContact);

contactsRouter.post(
  '/',
  createContactMiddleware,
  authenticate,
  contactsControllers.createContact,
);

contactsRouter.put(
  '/:id',
  updateContactMiddleware,
  authenticate,
  contactsControllers.updateContact,
);
contactsRouter.patch(
  '/:id/favorite/',
  updateContactStatusMiddleware,
  authenticate,
  contactsControllers.updateStatusContact,
);

export default contactsRouter;
