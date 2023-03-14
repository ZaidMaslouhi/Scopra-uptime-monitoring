FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]