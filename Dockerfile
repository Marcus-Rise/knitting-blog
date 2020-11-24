ARG NODE_VERSION=14

FROM node:${NODE_VERSION} AS dev
WORKDIR /app
USER node

CMD npm install \
    && npx next telemetry --disable \
    && npm run dev

FROM node:${NODE_VERSION}-alpine AS check
WORKDIR /app
ENV CI true

COPY package*.json ./

RUN npm ci
RUN npx next telemetry --disable

COPY pages ./pages
COPY public ./public
COPY src ./src
COPY ./*.js* ./
COPY ./*.ts* ./

RUN npm run lint
RUN npm run test

FROM check AS build

RUN npm run build
RUN npm prune --production && npm cache clear --force

FROM node:${NODE_VERSION} AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

CMD npm run start

