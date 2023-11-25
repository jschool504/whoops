FROM node:19.9

WORKDIR /app

COPY . .

RUN apt-get update
RUN npm i
RUN npx prisma generate

EXPOSE 3000
