# ExoWorks

ExoWorks is a visual workflow engine for building and automating on-chain applications on Solana.

This repository contains:

- **@exoworks/sdk**: Core workflow primitives and execution engine
- **ExoWorks Dashboard**: Demo application built on the SDK

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+ (or npm)

### Installation

```bash
pnpm install
```

### Development

Start the dashboard development server:

```bash
pnpm dev
```

### Build

Build all packages:

```bash
pnpm build
```

## Project Structure

```
exoworks-monorepo/
├── packages/
│   └── sdk/          # @exoworks/sdk - Core SDK package
├── apps/
│   └── dashboard/    # ExoWorks Dashboard - Demo UI
└── docs/             # Documentation
```

## Documentation

- [Overview](./docs/overview.md) - High-level concept and features
- [Architecture](./docs/architecture.md) - Technical architecture
- [Workflows](./docs/workflows.md) - Example workflows

## License

MIT

