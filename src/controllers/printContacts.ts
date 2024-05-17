import { getContacts } from "../actions";

import type { Contact } from "../types";

export function ContactToTable(...rows: Contact[]) {
    return `
    <table>
    <thead>
    <th>First Name</th>
    <th>Last name</th>
    <th>Number</th>
    </thead>
    <tbody>
      ${rows
            .map(
                (row) =>
                    `<tr><td>${row.firstName}</td> <td>${row.lastName}</td>  <td>${row.number}</td><tr>\n`
            )
            .join("")}
    <tbody>
    </table>
  
    `;
}


export async function printContacts() {
    const contacts: Contact[] = await getContacts();
    const stringifiedContact = ContactToTable(...contacts);

    return stringifiedContact;
}
