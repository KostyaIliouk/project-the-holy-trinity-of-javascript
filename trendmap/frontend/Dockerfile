FROM node:latest

WORKDIR /user/src/trendmap-frontend

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

# CMD ["pm2", "start", "node_modules/react-scripts/scripts/start.js"]
CMD ["npm", "start"]