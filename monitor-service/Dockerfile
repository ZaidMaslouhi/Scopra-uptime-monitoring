FROM node:alpine

WORKDIR /app/monitor-service

COPY package.json .

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 8003

CMD [ "pm2-runtime", "--json", "src/index.js" ]