FROM node:latest

WORKDIR /usr/src/trendmap-backend

COPY package.json package.json

RUN npm install

COPY . .

CMD ["node", "app.js"]