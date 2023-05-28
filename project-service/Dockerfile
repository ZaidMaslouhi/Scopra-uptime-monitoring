FROM node:alpine

WORKDIR /app/project-service

COPY package.json .

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 8002

CMD [ "pm2-runtime", "--json", "src/index.js" ]
