import type { Contact } from "./types";

export async function getContacts(): Promise<Contact[]> {
    const res = await fetch("http://localhost:8080/contacts");
    const json = await res.json();

    return json;
}
