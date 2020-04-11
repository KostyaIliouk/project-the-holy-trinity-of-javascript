FROM node:latest

WORKDIR /usr/src/trendmap-frontend

COPY package.json package.json

RUN npm install

COPY . .

ENV REACT_APP_LEAFLET_ACCESS_TOKEN=$REACT_APP_LEAFLET_ACCESS_TOKEN

RUN npm run build