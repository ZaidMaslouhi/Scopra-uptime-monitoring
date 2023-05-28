FROM node:alpine

WORKDIR /app/project-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD [ "npm", "start" ]
