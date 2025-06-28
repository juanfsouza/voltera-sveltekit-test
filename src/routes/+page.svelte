<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { useDebounce } from '$lib/utils/useDebounce';

  export let data: {
    age: number | null;
    name: string;
    count: number | null;
    country: string | null;
    invalid: boolean;
    limitReached: boolean;
  };

  const { value: nameInput, debounced: nameDebounced } = useDebounce(data.name || '', 600);
  const { value: countryInput, debounced: countryDebounced } = useDebounce(data.country || '', 600);

  let darkMode = false;

  $: if (browser && (nameDebounced || countryDebounced)) {
    const params = new URLSearchParams(window.location.search);

    if ($nameDebounced) {
      params.set('name', $nameDebounced);
    } else {
      params.delete('name');
    }

    if ($countryDebounced) {
      params.set('country', $countryDebounced);
    } else {
      params.delete('country');
    }

    goto(`/?${params.toString()}`, { replaceState: true });
  }

  $: if (browser) {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
</script>

<button class="theme-toggle" on:click={() => darkMode = !darkMode}>
  {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
</button>

<main class:dark={darkMode}>
  <h1>🔍 Age Estimator</h1>
  <p>Digite seu <strong>primeiro nome</strong> e, se quiser, o <strong>país</strong> para obter uma estimativa de idade com base em dados globais.</p>

  <label for="name">Nome:</label>
  <input
    id="name"
    type="text"
    placeholder="Ex: Juan"
    bind:value={$nameInput}
    aria-label="Nome para estimar idade"
    autofocus
    autocomplete="off"
  />

  <label for="country">País (opcional):</label>
  <input
    id="country"
    type="text"
    placeholder="Ex: BR"
    bind:value={$countryInput}
    aria-label="País (opcional)"
    maxlength="2"
    autocomplete="off"
  />

  {#if $nameInput && !$nameDebounced}
    <p>⏳ Analisando nome...</p>
  {/if}

  {#if data.invalid}
    <p class="error">⚠️ Nome inválido! Use apenas letras (sem números ou símbolos).</p>
  {/if}

  {#if data.limitReached}
    <p class="error">🚫 Limite de requisições atingido! Tente novamente amanhã.</p>
  {/if}

  {#if data.name && data.age !== null && !data.invalid && !data.limitReached}
    <p>👤 Nome: <strong>{data.name}</strong></p>
    <p>🎂 Idade estimada: <strong>{data.age}</strong></p>
    {#if data.count !== null}
      <p>📊 Base de dados: <strong>{data.count.toLocaleString()} registros</strong></p>
    {/if}
    {#if data.country}
      <p>🌎 País: <strong>{data.country}</strong></p>
    {/if}
  {:else if data.name && !data.invalid && !data.limitReached}
    <p>⚠️ Não foi possível estimar a idade para "{data.name}".</p>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    background: #fafafa;
    transition: background 0.3s;
  }

  :global(body.dark) {
    background: #111;
  }

  .theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    border: 2px solid #111;
    border-radius: 4px;
    background: transparent;
    color: #111;
  }

  :global(body.dark) .theme-toggle {
    color: #eee;
    border-color: #eee;
  }

  main {
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 480px;
    margin: 5rem auto 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
    color: #111;
  }

  h1 {
    margin: 0;
  }

  label {
    font-weight: 600;
  }

  input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    outline: none;
  }

  input:focus {
    border-color: #111;
  }

  .error {
    color: red;
  }
</style>

<svelte:head>
  <script>
    export let darkMode;

    $: {
      if (typeof window !== 'undefined') {
        if (darkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      }
    }
  </script>
</svelte:head>
