FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "packag-lock.json", "./"]

RUN npm install --production

COPY . . 

CMD ["node", "main.js"]