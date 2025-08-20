ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_URL_SERVICE


FROM node:22-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache python3 make g++ && corepack enable && corepack prepare pnpm@10.8.1 --activate

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


# Use a multi-stage build to keep the final image small
FROM node:22-alpine
ENV PORT=8080
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=build /usr/src/app /usr/src/app

USER node
CMD ["sh", "-c", "serve","-s", "/usr/src/app", "-l", "${PORT}"]
