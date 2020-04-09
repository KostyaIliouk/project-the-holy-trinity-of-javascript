FROM node:latest

WORKDIR /usr/src/trendmap-frontend

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build