
FROM node:alpine

WORKDIR /app/doofmanager

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npx", "http-server", "./dist", "-p 3000"]