FROM node:16

ENV NODE_ENV=production

COPY ["package.json", "packag-lock.json", "./"]

RUN npm install --production

WORKDIR /app

COPY . . 

CMD ["node", "main.js"]