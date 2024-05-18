import type { Contact } from "./types";


const API = "http://localhost:8080";


export async function getContacts(): Promise<Contact[]> {
    const res = await fetch("http://localhost:8080/contacts");
    const json = await res.json();

    return json;
}

export async function searchContacts(term: string) {
    const res = await fetch(`${API}/search-contacts?term=${term}`);
    const json = await res.json();
    return json.contacts;
}


export async function addContact(firstName: string, lastName: string, phone: string) {
    const res = await fetch(`${API}/contacts`, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, phone }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const json = await res.json()
    console.log(json)
    return json.message
}



export async function deleteContact(id: string) {
    const res = await fetch(`${API}/contacts/${id}`, { method: "DELETE" })
    const json = await res.json()
    console.log(json)
    return json.message
}

interface UpdateContact {
    firstName?: string
    lastName?: string
    phone?: string
}

export async function updateContact(id: string, updateContact: UpdateContact) {
    const res = await fetch(`${API}/contacts/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(updateContact),
    })

    const json = await res.json()

    return json.message
}