FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY ./sample.env ./.env

RUN npx prisma generate

RUN npm run build

EXPOSE 3099

CMD ["npm", "run", "docker"]
