
FROM node:20


WORKDIR /src


COPY package*.json ./
RUN npm install


COPY . .

RUN npx tsc

CMD ["node", "dist/server.js"]
