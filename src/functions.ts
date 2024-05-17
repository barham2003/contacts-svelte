import { get } from 'svelte/store';
import { commandPrompt, commands, currentCommand, newLastNamePrompt, defaultCommandPropmt, enterIndexPrompt, newFirstNamePrompt, newPhonePrompt, searchContactPrompt } from './store';
import { addContact, deleteContact, searchContacts } from './actions';
import { printContacts } from './controllers/printContacts';
import { searchAndPrintContacts } from './controllers/searchContacts';
import type { Contact } from './types';

let newFirstName = "";
let newPhone = "";
let newLastName = "";
let foundContacts: Contact[] = [];

export function clearProccess() {
  currentCommand.set("");
  commands.set([]);
};

export const setNewFirstName = () => {
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

export async function Search() {
  const result = await searchAndPrintContacts(get(currentCommand));
  if (result.contacts.length === 0) {
    commands.update(cmds => [...cmds, "Not found any contact"]);
    commandPrompt.set(get(defaultCommandPropmt));
  } else {
    commands.update(cmds => [...cmds, result.html]);
    foundContacts = result.contacts;
    commandPrompt.set(get(enterIndexPrompt));
  }
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

export async function Add() {
  commandPrompt.set(get(newFirstNamePrompt));
}

export function toDelete() {
  commandPrompt.set(get(searchContactPrompt));
}

export async function printTable() {
  const result = await printContacts();
  commands.update(cmds => [...cmds, result]);
}
