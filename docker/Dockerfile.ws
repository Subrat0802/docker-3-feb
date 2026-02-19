FROM oven/bun:1-alpine

WORKDIR /user/src/app

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/ws-server ./apps/ws-server

RUN bun install
RUN bun run db:generate

COPY . .

EXPOSE 8081

CMD [ "bun", "run", "start:ws" ]