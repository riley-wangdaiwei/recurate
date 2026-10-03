<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Recurate working rules (for AI coding agents AND the human builder)

## Before writing any code
This repo runs Next.js 16, which has BREAKING CHANGES vs older Next.js.
Training data may describe APIs that no longer exist. Before writing or
editing code, read the local Next.js docs at `node_modules/next/dist/docs/`
(resolved from the repo root) and heed any deprecation notices. When asking
an AI agent (e.g. Codex) to change code, ALWAYS include this instruction in
the prompt — otherwise it will answer from stale knowledge and you will pay
for the rework.

## Architecture rules
- Pages (`src/app/`) compose. Features (`src/features/`) compute.
  Components (`src/components/`) render. Storage (`src/lib/storage/`) persists.
- UI components never touch localStorage directly — they go through the
  `storage` object from `@/lib/storage`.
- New feature = new folder under `src/features/`. Old code stays untouched.
- One bug = one small, focused change. Never rewrite unrelated code in the
  same edit.

## Where things plug in
- `src/app/api/` — external services (Stripe webhooks, email, artist tools).
  Each integration gets its own `route.ts`.
- `src/features/commerce/` — the `CommerceService` interface. Today the
  implementation is `mock-service.ts`; swap it for a Stripe-backed one when
  payments go live. Pages and components do not change.
- `src/lib/storage/` — the `StorageAdapter` interface. Today the
  implementation is `local-adapter.ts`; swap it for `supabase-adapter.ts`
  when a real backend arrives. Nothing else changes.

## Bug workflow
See the "Builders Protocol" doc in Drive (startup folder): record the bug
(folder / page / symptom / expected), reproduce first, fix small, verify on
the live site, then close the entry.
