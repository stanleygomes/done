# Done

Monorepo de produtividade com autenticação, APIs de domínio/IA, interface web moderna e app desktop.

## 🌟 Sobre o projeto

O **Done** evoluiu para uma plataforma robusta, organizada em **Turborepo**, com aplicações e pacotes compartilhados em TypeScript para acelerar desenvolvimento, padronizar arquitetura e reutilizar código entre front-end e back-end.

## 🛠️ Stack principal

- **Monorepo:** Turborepo
- **Gerenciador de pacotes:** pnpm (`pnpm@10.31.0`)
- **Runtime:** Node.js `>=22`
- **Linguagem:** TypeScript
- **Lint/Format:** ESLint + Prettier
- **Web:** Next.js + React + Tailwind CSS
- **APIs:** Fastify + Zod + Drizzle
- **Desktop:** Electron

## 🏛️ Arquitetura do monorepo

### Apps (`/apps`)

- `auth-api`: serviço de autenticação (OTP/JWT, integrações de segurança e utilitários de e-mail).
- `core-api`: API de domínio principal.
- `ai-api`: API para recursos de IA.
- `web-ui`: aplicação web principal em Next.js.
- `desktop`: cliente desktop em Electron.

### Packages (`/packages`)

- `@done/entities`: entidades e validações compartilhadas.
- `@done/http`: cliente HTTP compartilhado.
- `@done/node-utils`: utilitários Node.js (logger, auth helpers etc.).
- `@done/search-ranker`: lógica de ranqueamento/busca.
- `@done/ui`: design system e componentes reutilizáveis.
- `@done/utils`: utilidades compartilhadas.
- `@done/eslint-config`: configuração central de ESLint.
- `@done/typescript-config`: configurações base de TypeScript.

## 🚀 Começando

### Pré-requisitos

- Node.js `>=22`
- pnpm `10.x`

### Instalação

```bash
pnpm install
```

### Scripts da raiz

| Script                 | Descrição                                           |
| :--------------------- | :-------------------------------------------------- |
| `pnpm run dev`         | Sobe apps em modo desenvolvimento (exceto desktop). |
| `pnpm run app:web`     | Sobe apenas o `web-ui`.                             |
| `pnpm run app:auth`    | Sobe apenas o `auth-api`.                           |
| `pnpm run app:core`    | Sobe apenas o `core-api`.                           |
| `pnpm run app:ai`      | Sobe apenas o `ai-api`.                             |
| `pnpm run app:desktop` | Sobe o desktop (Electron).                          |
| `pnpm run build`       | Build de todos os workspaces.                       |
| `pnpm run lint`        | Lint em todos os workspaces.                        |
| `pnpm run check-types` | Type-check em todos os workspaces.                  |
| `pnpm run check`       | `format:check + lint + check-types`.                |
| `pnpm run fix`         | `format + lint:fix + check-types`.                  |

## 🔧 Variáveis de ambiente

Cada app possui template próprio:

- `apps/auth-api/.env.template`
- `apps/core-api/.env.template`
- `apps/ai-api/.env.template`
- `apps/web-ui/.env.template`

Copie o template da aplicação desejada para `.env` e preencha os valores.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha feature'`)
4. Abra um Pull Request

## 📄 Licença

Distribuído sob licença MIT. Consulte o arquivo `LICENSE`.
