
FROM node:alpine

WORKDIR /app/doofclient

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]