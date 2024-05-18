import { readable, writable } from 'svelte/store';

export const commands = writable([""]);
export const currentCommand = writable("");
export const commandPrompt = writable("barham: ")

export const defaultCommandPropmt = readable("barham: ");
export const newFirstNamePrompt = readable("first name: ");
export const newLastNamePrompt = readable("last name: ");
export const newPhonePrompt = readable("phone: ");
export const searchContactPromptD = readable("enter contact first name, last name or phone number: ");
export const enterIndexPromptD = readable("Enter the index of the contact: ");

export const searchContactPromptU = readable("enter contact first name, last name or phone number to update: ")
export const enterIndexPromptU = readable("Enter the index of the contact to update: ");
export const enterUpdateChoice = readable("Enter 1 to update first name, enter 2 to update last name, enter 3 to update number: ")
export const updateFirstName = readable("new First Name: ")
export const updateLastName = readable("new Last Name: ")
export const updatePhone = readable("new Number: ")