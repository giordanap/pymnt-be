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

---

## How to run

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Steps

```bash
# 1. Copy the environment template and adjust values if needed
cp .env.example .env

# 2. Build the image and start all services
docker compose up --build
```

The API will be available at **http://localhost:3001**.
Prisma migrations are applied automatically on container start.

To stop all services:
```bash
docker compose down
```

To reset the database volume:
```bash
docker compose down -v
```

### Seed data (optional)

`apps/api/prisma/seed.sql` contains sample profile rows. Migrations run automatically on startup — the seed is **not** applied automatically so the `POST /profiles` endpoint can be exercised against an empty database.

To load the seed manually after the containers are running:

```bash
docker exec -i node-candidate-db psql -U admin -d challenge_db < apps/api/prisma/seed.sql
```
