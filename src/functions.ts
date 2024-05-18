import { get } from 'svelte/store';
import { commandPrompt, commands, currentCommand, newLastNamePrompt, defaultCommandPropmt, enterIndexPromptD, newFirstNamePrompt, newPhonePrompt, searchContactPromptD, enterIndexPromptU, searchContactPromptU, enterUpdateChoice, updateFirstName, updateLastName, updatePhone } from './store';
import { addContact, deleteContact, searchContacts, updateContact } from './actions';
import { printContacts } from './controllers/printContacts';
import { searchAndPrintContacts } from './controllers/searchContacts';
import type { Contact } from './types';

let newFirstName = "";
let newPhone = "";
let newLastName = "";
let foundContacts: Contact[] = [];
let toUpdateContactId = "";

export function clearProccess() {
  currentCommand.set("");
  commands.set([]);
};

export const setNewFirstName = (update: boolean = false) => {
  newFirstName = get(currentCommand);
  commandPrompt.set(get(newLastNamePrompt));
};

export function setNewLastName() {
  newLastName = get(currentCommand);
  commandPrompt.set(get(newPhonePrompt));
}

export async function setNewPhone() {
  newPhone = get(currentCommand);
  const result = await addContact(newFirstName, newLastName, newPhone);
  commands.update(cmds => [...cmds, result]);
  commandPrompt.set(get(defaultCommandPropmt));
}

export async function Search(method: string = "delete") {
  const result = await searchAndPrintContacts(get(currentCommand));
  if (result.contacts.length === 0) {
    commands.update(cmds => [...cmds, "Not found any contact"]);
    commandPrompt.set(get(defaultCommandPropmt));
  } else {
    commands.update(cmds => [...cmds, result.html]);
    foundContacts = result.contacts;

    if (method === "delete") commandPrompt.set(get(enterIndexPromptD));
    else if (method === "update") commandPrompt.set(get(enterIndexPromptU));
  }
}


export function selectUpdateContact() {
  const enteredIndex = +get(currentCommand);
  if (enteredIndex === 0 || !enteredIndex || typeof enteredIndex === "string") {
    commands.update(cmds => [...cmds, "invalid input"]);
    commandPrompt.set(get(defaultCommandPropmt));
    currentCommand.set("");
    return;
  }
  const enteredId = foundContacts.at(enteredIndex - 1)?.id;

  if (!enteredId) {
    commands.update(cmds => [...cmds, "invalid input"]);
    currentCommand.set("");
    commandPrompt.set(get(defaultCommandPropmt));
    return;
  }
  toUpdateContactId = enteredId
  commandPrompt.set(get(enterUpdateChoice));
}

export async function getUpdateField() {
  const updateChoice = +get(currentCommand);

  if (updateChoice === 1) {
    commandPrompt.set(get(updateFirstName))
  } else if (updateChoice === 2) {
    commandPrompt.set(get(updateLastName))
  } else if (updateChoice === 3) {
    commandPrompt.set(get(updatePhone))
  } else {
    commands.update(cmds => [...cmds, "invalid input"]);
    commandPrompt.set(get(defaultCommandPropmt));
    currentCommand.set("");
    return;
  }


}


export async function setUpdateFirstName() {
  const newUpdateFirstName = get(currentCommand)
  const message = await updateContact(toUpdateContactId, { firstName: newUpdateFirstName })
  commands.set([...get(commands), message])
  commandPrompt.set(get(defaultCommandPropmt))
}


export async function setUpdateLastName() {
  const newUpdateLastName = get(currentCommand)
  const message = await updateContact(toUpdateContactId, { lastName: newUpdateLastName })
  commands.set([...get(commands), message])
  commandPrompt.set(get(defaultCommandPropmt))
}

export async function setUpdatePhone() {
  const setUpdatePhone = get(currentCommand)
  const message = await updateContact(toUpdateContactId, { phone: setUpdatePhone })
  commands.set([...get(commands), message])
  commandPrompt.set(get(defaultCommandPropmt))
}


export async function deleteOneContact() {
  const enteredIndex = +get(currentCommand);
  if (enteredIndex === 0 || !enteredIndex || typeof enteredIndex === "string") {
    commands.update(cmds => [...cmds, "invalid input"]);
    commandPrompt.set(get(defaultCommandPropmt));
    currentCommand.set("");
    return;
  }
  const enteredId = foundContacts.at(enteredIndex - 1)?.id;

  if (!enteredId) {
    commands.update(cmds => [...cmds, "invalid input"]);
    currentCommand.set("");
    commandPrompt.set(get(defaultCommandPropmt));
    return;
  }
  const result = await deleteContact(enteredId);
  commands.update(cmds => [...cmds, result]);
  commandPrompt.set(get(defaultCommandPropmt));
}

export async function toAdd() {
  commandPrompt.set(get(newFirstNamePrompt));
}

export function toDelete() {
  commandPrompt.set(get(searchContactPromptD));
}

export function toUpdate() {
  commandPrompt.set(get(searchContactPromptU))
}

export async function printTable() {
  const result = await printContacts();
  commands.update(cmds => [...cmds, result]);
}
