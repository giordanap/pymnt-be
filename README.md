# Meeteam Backend Challenge (NestJS Enterprise)

Welcome to the Meeteam Technical Evaluation!

## Part 1: Deep Code Review & Refactor
The existing API code contains critical architecture and security errors that would fail in a production enterprise environment.
1. Identify and fix at least 4 major issues (Check Dependency Injection, Async flow, Secret Management, and Event Loop performance).
2. **Refactor to Enterprise Standards**: Demonstrate mastery of the NestJS request lifecycle (Pipes, Interceptors, DTOs).

## Part 2: Feature Implementation
- Create a new **Profiles** module following modular architecture.
- Expose a validated `POST /profiles` endpoint.
- Implement a DTO with strict validation rules.
- Save the profile data to a PostgreSQL table using **Prisma**.

### ⚠️ Infrastructure Note:
A pre-configured **PostgreSQL instance is provided** via Docker Compose. Do not waste time setting up a local database. Use the environment variables/credentials defined in the `docker-compose.yml` for your Prisma connection.

### Required Tech Stack:
- **Core:** Node.js, NestJS (Modular)
- **Database:** PostgreSQL, Prisma ORM
- **Infrastructure:** Docker Compose, pnpm, Turborepo
