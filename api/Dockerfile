FROM node:5-slim

WORKDIR /home/flash-api

COPY package.json ./
RUN npm install

COPY ./ ./

EXPOSE 8080
CMD ["node_modules/db-migrate/bin/db-migrate", "up", "--verbose", "&&", "npm", "start"]
