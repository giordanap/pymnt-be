FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@8.15.1

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile

COPY apps/api/ ./apps/api/

RUN pnpm --filter api exec prisma generate --schema prisma/schema.prisma

RUN pnpm --filter api run build

EXPOSE 3001

CMD ["sh", "-c", "pnpm --filter api exec prisma migrate deploy --schema prisma/schema.prisma && node apps/api/dist/main.js"]