> [!WARNING]
> **ARCHIVED - Trailblazer v1 UI**
> 
> This repository has been **deprecated** as we have transitioned to **Trailblazer v2 - Gaming Hub**.


---

# Taiko Trailblazer UI

A modern web application built for the Taiko ecosystem, providing an intuitive interface for users to interact with Taiko's blockchain features and participate in the Trailblazer program.

## 🚀 What is Taiko Trailblazer?

Taiko Trailblazer is a community engagement program designed to onboard users to the Taiko ecosystem. The Trailblazer UI serves as the front-end interface that allows users to:

- Explore and interact with Taiko's Layer 2 blockchain
- Complete various tasks and challenges within the Taiko ecosystem
- Track progress and achievements in the Trailblazer program
- Connect with the broader Taiko community
- Experience decentralized applications built on Taiko

## 🛠️ Tech Stack

### Frontend Framework
- **Svelte/SvelteKit** - Modern, reactive web framework
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS

### Blockchain Integration
- **Wagmi** - React hooks library for Ethereum (adapted for Svelte)
- **Viem** - TypeScript interface for Ethereum
- **@reown/appkit** (formerly WalletConnect) - Wallet connection interface

### Data & State Management
- **Apollo Client** - GraphQL client for data fetching
- **GraphQL** - Query language for APIs with code generation

### Internationalization & UX
- **svelte-i18n** - Internationalization support
- **svelte-toast** - Toast notifications

## 📦 Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev:prod         # Start development in production mode
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test:unit        # Run unit tests
pnpm test:pw          # Run Playwright e2e tests
pnpm test:unit:coverage # Generate test coverage

# Code Quality
pnpm lint             # Check code formatting and linting
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format code with Prettier

# Code Generation
pnpm codegen:abi      # Generate contract ABIs
pnpm codegen:subgraph # Generate GraphQL types
```

## 🌐 Deployment

The application supports multiple deployment targets:
- **Vercel** (recommended)
- **Node.js** servers
- **Static hosting** (Netlify, GitHub Pages, etc.)


## 📄 License

This project is proprietary to the Taiko organization.
