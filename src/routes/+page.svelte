<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { debounce } from '$lib/utils/debounce';
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';

  export let data: { age: number | null; name: string };

  const nameInput = writable(data.name || '');

  const updateQuery = debounce((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('name', value);
    } else {
      params.delete('name');
    }
    goto(`/?${params.toString()}`, { replaceState: true });
  }, 600);

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value.trim();
    nameInput.set(value);
    updateQuery(value);
  };
</script>

<main>
  <h1>Age Estimator</h1>
  <input
    type="text"
    placeholder="Digite um nome..."
    bind:value={$nameInput}
    on:input={handleInput}
    autocomplete="off"
  />

  {#if data.name && data.age !== null}
    <p>Nome: {data.name}</p>
    <p>Idade estimada: {data.age}</p>
  {:else if data.name}
    <p>Não foi possível estimar a idade para "{data.name}".</p>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 5rem auto;
    font-family: sans-serif;
  }

  input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #333;
    border-radius: 4px;
    outline: none;
  }

  input:focus {
    border-color: #0070f3;
  }

  p {
    margin: 0;
  }
</style>
