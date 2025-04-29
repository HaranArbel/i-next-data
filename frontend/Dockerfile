FROM node:22.15-slim AS build_stage

WORKDIR /app
COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:22.15-slim AS production

WORKDIR /webapp
RUN npm i -g serve

# Copy all the dist
COPY --from=build_stage /app/dist .

EXPOSE 80

CMD [ "serve", "-s", ".", "-l", "80" ]