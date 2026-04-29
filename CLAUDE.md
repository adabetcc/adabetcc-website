# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal React + TypeScript + Vite website for adabet.cc. The project uses React 19 with React Compiler, Vite 8, and follows the latest TypeScript and ESLint standards.

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build locally |

## Architecture

**Key configuration files:**

- `vite.config.ts` - Vite configuration with React plugin and Babel (React Compiler preset)
- `eslint.config.js` - Flat ESLint config with React Hooks and React Refresh presets
- `tsconfig.json` - Root file referencing app and node configs
- `tsconfig.app.json` - App code config with strict rules (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`)
- `tsconfig.node.json` - Node/codegen config with stricter `skipLibCheck`

**Entry points:**

- `src/main.tsx` - Application entry point, renders `<StrictMode><App /></StrictMode>`
- `src/App.tsx` - Main application component with hero section, documentation links, and social links

**Design considerations:**

- React 19's React Compiler is enabled via Babel preset — impacts dev/build performance
- ESLint uses the new flat config format with type-aware base configs
- TypeScript enforces no-unused rules and erasable syntax (legacy JSX transformations)
- Production build outputs to `dist/` directory
- SVG icons are imported and referenced via `<use href="/icons.svg#...">`

## Notes

- The project has no test suite
- SVG assets live in `src/assets/` and are referenced from components
- CSS imports via `.css` files (e.g., `./index.css`, `./App.css`)