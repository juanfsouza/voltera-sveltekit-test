<script lang="ts">
  import { goto } from '$app/navigation';
  import { useDebounce } from '$lib/utils/useDebounce';
  import { browser } from '$app/environment';

  export let data: { age: number | null; name: string };

  const { value: nameInput, debounced } = useDebounce(data.name || '', 600);

    $: if (browser && $debounced) {
    const params = new URLSearchParams(window.location.search);
    if ($debounced) {
        params.set('name', $debounced);
    } else {
        params.delete('name');
    }
    goto(`/?${params.toString()}`, { replaceState: true });
    }
</script>

<main>
  <h1>Age Estimator</h1>
  <label for="name">Digite um nome:</label>
  <input
    id="name"
    type="text"
    bind:value={$nameInput}
    placeholder="Ex: Juan"
    autocomplete="off"
  />

  {#if data.name && data.age !== null}
    <p>👤 Nome: <strong>{data.name}</strong></p>
    <p>🎂 Idade estimada: <strong>{data.age}</strong></p>
  {:else if data.name}
    <p>⚠️ Não foi possível estimar a idade para "{data.name}".</p>
  {/if}
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  main {
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 480px;
    margin: 5rem auto;
    padding: 2rem;
    background: #fafafa;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
  }

  label {
    font-weight: 600;
  }

  input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #0070f3;
    border-radius: 4px;
    outline: none;
    transition: border 0.2s ease;
  }

  input:focus {
    border-color: #0051a8;
  }

  p {
    margin: 0;
  }
</style>