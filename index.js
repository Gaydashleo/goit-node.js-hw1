const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const contactsOperations = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.list();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.get(id);
      if(!contact){
        throw new Error(`Product with id=${id} not found`);
            }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.add(name,email,phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.remove(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);


