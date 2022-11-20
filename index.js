const contactsOperations = require("./contacts.js");
// const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if(!product){
        throw new Error(`Product with id=${id} not found`);
            }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(name,email,phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
invokeAction({ action:"list" });