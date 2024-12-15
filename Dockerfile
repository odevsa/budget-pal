FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

COPY ./sample.env ./.env

RUN npx prisma generate
RUN npx prisma db push

RUN npm run build

EXPOSE 3099

CMD ["npm", "start"]
