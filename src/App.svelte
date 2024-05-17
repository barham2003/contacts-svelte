<script lang="ts">
  import { afterUpdate } from "svelte";
  import {
    commands,
    currentCommand,
    enterIndexPrompt,
    newFirstNamePrompt,
    newLastNamePrompt,
    newPhonePrompt,
    searchContactPrompt,
    commandPrompt,
  } from "./store";
  import {
    clearProccess,
    setNewFirstName,
    setNewLastName,
    setNewPhone,
    Search,
    deleteOneContact,
    Add,
    toDelete,
    printTable,
  } from "./functions";

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight });
  }

  async function handleEnter() {
    if ($currentCommand === "") return;
    $commands = [
      ...$commands,
      `<label class="text-green-700">${$commandPrompt}</label> ${$currentCommand} `,
    ];
    if ($commandPrompt === $newFirstNamePrompt) setNewFirstName();
    else if ($commandPrompt === $newLastNamePrompt) setNewLastName();
    else if ($commandPrompt === $newPhonePrompt) await setNewPhone();
    else if ($commandPrompt === $searchContactPrompt) Search();
    else if ($commandPrompt === $enterIndexPrompt) deleteOneContact();
    else if ($currentCommand === "print") printTable();
    else if ($currentCommand === "clear") clearProccess();
    else if ($currentCommand == "add") Add();
    else if ($currentCommand == "delete") toDelete();
    else {
      $commands = [...$commands, `${$currentCommand} is not found`];
    }
    $currentCommand = "";
  }

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<main class="mx-2">
  <section>
    {#each $commands as command}
      <p>{@html command}</p>
    {/each}
  </section>

  <form on:submit|preventDefault={handleEnter}>
    <label>
      <span class=" text-green-700">
        {$commandPrompt}
      </span>
      <input bind:value={$currentCommand} />
    </label>
  </form>
</main>

<style>
</style>
