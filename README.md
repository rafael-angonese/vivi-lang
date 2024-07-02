# 🦝 **Vivi Lang**


Visite: [`<https://vivi-lang.vercel.app/`](https://vivi-lang.vercel.app/)

---

# 🧪 **Tecnologias**

Principais tecnologias e ferramentas utilizadas para o desenvolvimento deste projeto:

Este projeto é um monorepo feito com o [yarn](https://yarnpkg.com/) contendo dois pacotes:

```
packages
├── compiler           # Compilador.
└── docs               # Documentação.

```

Compilador `/packages/compiler:`
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Vitest](https://vitest.dev/)

Documentação `/packages/docs:`
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://pt-br.reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

---


 🎮 **Ambiente de desenvolvimento**

Para executar o ambiente de desenvolvimento deste projeto é necessário possuir o node e yarn instalado em sua máquina.

```bash
# para verificar se possui o node instalado
$ node --version
v20.6.1
```

Possuir o gerenciador de pacotes `yarn`.

```bash
# para verificar se possui o yarn instalado
$ yarn --version
1.22.19
```

### 🐫 **Instale as dependências**

```bash
$ yarn install --frozen-lockfile

# Alternativamente você pode instalar as dependências sem ser exatamente do lock file
$ yarn install
```

### **🚀 Execute a aplicação**

```bash
$ yarn dev:docs
```

- O app estará rodando na porta 3000.
- Acesse [`<http://localhost:3000>`](http://localhost:3000)

---

# **🪼 Scrips**

Entenda o que cada script do package.json faz:

- `dev:compiler`: executa/sobe o ambiente de desenvolvimento do package compiler.
- `dev:docs`: executa/sobe o ambiente de desenvolvimento do package docs.
- `test`: Executa os testes.
- `build`: faz o build do projeto para o ambiente de produção.
---

# ⚖️ **Licença**

Não se aplica.

---

Feito com 💜, ☕ e um pouco de 🪄 💜 por Rafael Angonese
