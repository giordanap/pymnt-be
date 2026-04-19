FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@8.15.0

WORKDIR /app

# Copy workspace manifests before source — maximises Docker layer cache reuse.
# Dependencies are only reinstalled when these files change.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

# Install all workspace dependencies (devDependencies are required for the build step)
RUN pnpm install --frozen-lockfile

# Copy application source
COPY apps/api/ ./apps/api/

# Generate the Prisma client from the schema
RUN pnpm exec prisma generate --schema apps/api/prisma/schema.prisma

# Compile TypeScript via the NestJS CLI
RUN pnpm --filter api run build

EXPOSE 3001

# On container start: apply any pending migrations, then boot the compiled server.
# DATABASE_URL must be provided via the environment (see docker-compose.yml).
CMD ["sh", "-c", "pnpm exec prisma migrate deploy --schema apps/api/prisma/schema.prisma && node apps/api/dist/main.js"]
