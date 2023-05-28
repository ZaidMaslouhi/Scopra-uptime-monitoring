FROM node:alpine

WORKDIR /app/monitor-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD [ "npm", "start" ]