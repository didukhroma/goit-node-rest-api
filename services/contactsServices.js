import Contact from '../db/models/Contact.js';

const listContacts = (userId, searchQuery) => {
  console.log(searchQuery);
  if (Object.keys(searchQuery) === 1) {
    return Contact.findAll({
      where: {
        owner: userId,
        ...searchQuery,
      },
    });
  }
  const { page = 1, limit = 20 } = searchQuery;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return Contact.findAll({
    where: {
      owner: userId,
    },
    limit: normalizedLimit,
    offset,
  });
};

const getContactById = (userId, contactId) =>
  Contact.findOne({
    where: {
      id: contactId,
      owner: userId,
    },
  });

const removeContact = async (userId, contactId) => {
  const contact = await getContactById(userId, contactId);

  contact &&
    (await Contact.destroy({
      where: {
        id: contactId,
        owner: userId,
      },
    }));

  return contact;
};

const addContact = (userId, data) => Contact.create({ ...data, owner: userId });

const updateContact = async (userId, contactId, data) => {
  const result = await Contact.update(
    { ...data },
    { where: { id: contactId, owner: userId }, returning: true },
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
