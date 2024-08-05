import Contact from '../db/models/Contact.js';

const listContacts = () => Contact.findAll();

const getContactById = id => Contact.findByPk(id);

const removeContact = async id => {
  const contact = await getContactById(id);

  contact &&
    (await Contact.destroy({
      where: { id },
    }));

  return contact;
};
const addContact = data => Contact.create(data);

const updateContact = async (id, data) => {
  const result = await Contact.update(
    { ...data },
    { where: { id }, returning: true },
  );

  if (!result[0]) return result[0];
  const [updatedContact] = result[1];
  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
