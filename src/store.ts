import { readable, writable } from 'svelte/store';

export const commands = writable([""]);
export const currentCommand = writable("");

export const defaultCommandPropmt = readable("barham");
export const newNamePrompt = readable("name");
export const newPhonePrompt = readable("phone");