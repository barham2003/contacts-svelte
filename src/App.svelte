<script lang="ts">
  import { afterUpdate } from "svelte";
  import {
    commands,
    currentCommand,
    enterIndexPromptD,
    newFirstNamePrompt,
    newLastNamePrompt,
    newPhonePrompt,
    searchContactPromptD,
    commandPrompt,
    searchContactPromptU,
    enterIndexPromptU,
    enterUpdateChoice,
    updateFirstName,
    updateLastName,
    updatePhone,
  } from "./store";
  import {
    clearProccess,
    setNewFirstName,
    setNewLastName,
    setNewPhone,
    Search,
    deleteOneContact,
    toAdd,
    toDelete,
    printTable,
    toUpdate,
    selectUpdateContact,
    setUpdateFirstName,
    setUpdateLastName,
    setUpdatePhone,
    getUpdateField,
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
    if ($currentCommand === "print") printTable();
    else if ($currentCommand === "clear") clearProccess();
    else if ($currentCommand === "add") toAdd();
    else if ($currentCommand === "delete") toDelete();
    else if ($commandPrompt === $newFirstNamePrompt) setNewFirstName();
    else if ($commandPrompt === $newLastNamePrompt) setNewLastName();
    else if ($commandPrompt === $newPhonePrompt) await setNewPhone();
    else if ($commandPrompt === $searchContactPromptD) Search();
    else if ($commandPrompt === $enterIndexPromptD) deleteOneContact();
    else if ($currentCommand === "update") toUpdate();
    else if ($commandPrompt === $searchContactPromptU) Search("update");
    else if ($commandPrompt === $enterIndexPromptU) selectUpdateContact();
    else if ($commandPrompt === $enterUpdateChoice) getUpdateField();
    else if ($commandPrompt === $updateFirstName) setUpdateFirstName();
    else if ($commandPrompt === $updateLastName) setUpdateLastName();
    else if ($commandPrompt === $updatePhone) setUpdatePhone();
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
