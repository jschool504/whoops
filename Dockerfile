FROM node:19.9

WORKDIR /app

COPY . .

RUN apt-get update
RUN npm i
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
