import { readable, writable } from 'svelte/store';

export const commands = writable([""]);
export const currentCommand = writable("");

export const defaultCommandPropmt = readable("barham");
export const newFirstNamePrompt = readable("first name");
export const newLastNamePrompt = readable("last name")
export const newPhonePrompt = readable("phone");
export const searchContactPrompt = readable("enter contact first name, last name or phone number");
export const enterIndexPrompt = readable("Enter the index of the contact")