FROM node:22.11.0-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3050

CMD ["yarn", "start"]