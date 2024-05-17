<script lang="ts">
  import { printContacts } from "./controllers/printContacts";
  import {
    commands,
    currentCommand,
    defaultCommandPropmt,
    newNamePrompt,
    newPhonePrompt,
  } from "./store";

  function clearProccess() {
    $commands = [];
  }

  let commandPrompt = $defaultCommandPropmt;
  let newName = "";
  let newPhone = "";
  let isInputting = false;

  async function handleEnter() {
    if (isInputting) {
      if (commandPrompt === $newNamePrompt) {
        newName = $currentCommand;
        commandPrompt = $newPhonePrompt;
      } else if (commandPrompt === $newPhonePrompt) {
        newPhone = $currentCommand;
        commandPrompt = $defaultCommandPropmt;
        isInputting = false;
      }

      $currentCommand = "";
      return;
    }

    if ($currentCommand === "print") {
      const result = await printContacts();
      $commands = [...$commands, $currentCommand, result];
    } else if ($currentCommand === "clear") {
      clearProccess();
    } else if ($currentCommand == "add") {
      commandPrompt = $newNamePrompt;
      isInputting = true;
    } else {
      $commands = [...$commands, `${$currentCommand} is not found`];
    }
    $currentCommand = "";
  }
</script>

<main class="space-y-4 my-4">
  {#each $commands as command}
    <p>{@html command}</p>
  {/each}
</main>

<form on:submit|preventDefault={handleEnter}>
  <label
    >{commandPrompt}:
    <input bind:value={$currentCommand} />
  </label>
</form>

<p>
  name: "{newName}" Phone:"{newPhone}"
</p>

<style>
</style>
