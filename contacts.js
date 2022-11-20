const {v4: uuidv4} = require("uuid");

const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(_dirname, "db/contacts.json");
module.exports = contactsPath;

async function listContacts() {
    const data = await fs.readContact(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result;
}
  
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}
// const [removedContact] = contacts.splice(index, 1);
// await updateContacts(contacts);
// return removedContact;

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}


// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact, 
//   addContact,
// };