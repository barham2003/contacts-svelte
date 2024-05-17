<script lang="ts">
  import { afterUpdate } from "svelte";
  import { addContact, deleteContact, searchContacts } from "./actions";
  import { printContacts } from "./controllers/printContacts";
  import { searchAndPrintContacts } from "./controllers/searchContacts";
  import {
    commands,
    currentCommand,
    defaultCommandPropmt,
    enterIndexPrompt,
    newFirstNamePrompt,
    newLastNamePrompt,
    newPhonePrompt,
    searchContactPrompt,
  } from "./store";
  import type { Contact } from "./types";

  let commandPrompt = $defaultCommandPropmt;
  let newFirstName = "";
  let newPhone = "";
  let newLastName = "";

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight });
  }
  let foundContacts: Contact[] = [];
  function clearProccess() {
    $commands = [];
  }
  async function handleEnter() {
    if (commandPrompt !== $defaultCommandPropmt) {
      let lastCommandPrompt = commandPrompt;
      if (commandPrompt === $newFirstNamePrompt) {
        newFirstName = $currentCommand;
        commandPrompt = $newLastNamePrompt;
      } else if (commandPrompt === $newLastNamePrompt) {
        newLastName = $currentCommand;
        commandPrompt = $newPhonePrompt;
      } else if (commandPrompt === $newPhonePrompt) {
        newPhone = $currentCommand;
        const result = await addContact(newFirstName, newLastName, newPhone);
        $commands = [
          ...$commands,
          `${commandPrompt} ${$currentCommand}`,
          result,
        ];
        commandPrompt = $defaultCommandPropmt;
        $currentCommand = "";
        return;
      }

      if (commandPrompt === $searchContactPrompt) {
        const result = await searchAndPrintContacts($currentCommand);
        if (result.contacts.length === 0) {
          $commands = [...$commands, "Not found any contact"];
          $currentCommand = "";
          commandPrompt = $defaultCommandPropmt;
          return;
        }
        $commands = [...$commands, $currentCommand, result.html];
        foundContacts = result.contacts;

        commandPrompt = $enterIndexPrompt;
        $currentCommand = "";
        return;
      } else if (commandPrompt === $enterIndexPrompt) {
        const enteredIndex = +$currentCommand;
        if (
          enteredIndex === 0 ||
          !enteredIndex ||
          typeof enteredIndex === "string"
        ) {
          $commands = [...$commands, "invalid input"];
          commandPrompt = $defaultCommandPropmt;
          $currentCommand = "";
          return;
        }
        const enteredId = foundContacts.at(enteredIndex - 1)?.id;

        if (!enteredId) {
          $commands = [...$commands, "invalid input"];
          $currentCommand = "";
          commandPrompt = $defaultCommandPropmt;
          return;
        }
        const result = await deleteContact(enteredId);
        $commands = [
          ...$commands,
          `${lastCommandPrompt} ${$currentCommand} `,
          result,
        ];
        commandPrompt = $defaultCommandPropmt;
        $currentCommand = "";
        return;
      }

      $commands = [...$commands, `${lastCommandPrompt} ${$currentCommand} `];
      $currentCommand = "";
      return;
    }

    if ($currentCommand === "print") {
      const result = await printContacts();
      $currentCommand += "\n<br>" + result;
      // $commands = [...$commands, $currentCommand, result];
    } else if ($currentCommand === "clear") {
      $currentCommand = "";
      clearProccess();
      return;
    } else if ($currentCommand == "add") {
      commandPrompt = $newFirstNamePrompt;
    } else if ($currentCommand == "delete") {
      commandPrompt = $searchContactPrompt;
    } else {
      $commands = [...$commands, `${$currentCommand} is not found`];
      $currentCommand = "";
      return;
    }
    $commands = [...$commands, $currentCommand];

    $currentCommand = "";
  }

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<main class="mx-2">
  <section class="my-2">
    {#each $commands as command}
      <p>{@html command}</p>
    {/each}
  </section>

  <form on:submit|preventDefault={handleEnter}>
    <label
      >{commandPrompt}:
      <input bind:value={$currentCommand} />
    </label>
  </form>
</main>

<!-- <p>
  First Name: "{newFirstName}" Last Name: "{newLastName}" Phone:"{newPhone}"
</p> -->

<style>
</style>
