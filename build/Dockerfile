FROM node:22-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache python3 make g++ && corepack enable && corepack prepare pnpm --activate

# BEGIN: Set environment variables for the build
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_URL_SERVICE

ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_URL_SERVICE=$VITE_URL_SERVICE
# END: Set environment variables for the build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


FROM caddy:alpine
COPY build/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /usr/src/app/dist /srv
