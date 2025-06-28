# Voltera Frontend Test — SvelteKit + Agify

Bem-vindo! 🚀 Este repositório é minha solução para o desafio técnico da Voltera, desenvolvido em **SvelteKit** com foco em boas práticas, UX fluida, SSR e HTML5 válido — sem dependências externas.

---

### 📌 **Sobre o projeto**

Uma aplicação web para estimar a idade de uma pessoa com base no primeiro nome, utilizando a **API gratuita [Agify.io](https://agify.io)**.

---

### ✅ **Funcionalidades**

- 🔎 **Input em tempo real** com debounce (evita consultas excessivas)
- 🌐 **Consulta via função `load()`** no SvelteKit — SSR seguro
- 🔗 **URL dinâmica** (querystring) — permite compartilhar resultados
- ⚡ **Validação de input** (apenas letras)
- 🔄 **Mensagem de status** ("Analisando...") enquanto espera o debounce
- 🚫 **Tratamento de limite da API** (`429 Too Many Requests`)
- ♿ **Acessibilidade real** (labels, ARIA)
- 🎨 **Tema Claro/Escuro** com toggle no topo — usando **CSS puro**, sem libs
- 📄 **HTML5 válido**, clean e sem dependências externas

---

### 📸 **Preview**

![Screenshot_1](https://github.com/user-attachments/assets/79055fc4-9ee7-48cc-a93c-53caa64ef09c)

---

### 🧩 **Tecnologias**

- [SvelteKit](https://kit.svelte.dev/) (Svelte 4 ou 5)
- Vite para build e dev server
- HTML5 + CSS puro
- API: [Agify.io](https://agify.io)

---

### ⚙️ **Como rodar localmente**

1. Clone este repositório e iniciar:
   ```bash
   git clone https://github.com/juanfsouza/voltera-frontend-test.git

   npm install

   npm run dev
