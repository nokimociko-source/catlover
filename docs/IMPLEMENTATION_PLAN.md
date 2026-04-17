# CatLover: Free-to-Scale Implementation Plan

## Goal
Ship quickly with near-zero cost now, while keeping an upgrade path to large-scale architecture (Spanner + Bigtable + Go services) later.

## Phase 0 (Now, free)
- Node.js monolith API for fast iteration.
- PostgreSQL + Redis in Docker for local and QA.
- JWT auth on protected routes.
- Socket.io for real-time signaling.

## Day 1-7 Checklist
1. Stabilize API skeleton and route wiring.
2. Add auth middleware and protect non-public endpoints.
3. Add local Docker stack (`postgres`, `redis`).
4. Add repository boundary in code (next step) to enable backend DB swaps.
5. Define STRIDE threat model and security checklist.
6. Add basic load test scenario for websocket reconnect storms.
7. Prepare migration backlog for Go microservices.

## Future Scale Targets
- Replace Node websocket layer with Go gateway service.
- Split services: auth, chat, presence, media, moderation.
- Move metadata to Spanner and message timeline to Bigtable.
- Keep payload contracts stable to avoid client rewrites.

## Non-Negotiable Security Rules
- E2EE protocol work starts before public beta.
- Never store private keys server-side.
- Enforce least privilege for DB/service accounts.
- Add pentest gate before production launch.
