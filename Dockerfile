FROM node:lts-alpine3.17 AS development

LABEL author="NodeJS Team"

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine3.17 AS production

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN echo "NODE_ENV: $NODE_ENV"

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]