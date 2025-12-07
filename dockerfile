
# ---------- 1. Base builder stage ----------

FROM node:20 AS builder

WORKDIR /app

# Copy root files first
COPY package.json package-lock.json ./

# Copy all workspaces (client, server, shared)
COPY client ./client
COPY server ./server
COPY shared ./shared

# Install all workspace deps
RUN npm install

# Build each workspace
RUN npm run build -w client
RUN npm run build -w server

# ---------- 2. Final production image ----------
FROM node:20-slim AS production

WORKDIR /app

# Copy dist and deps only
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]