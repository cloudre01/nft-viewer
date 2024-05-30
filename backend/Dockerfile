FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install && npm run build


FROM node:22-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3001 

CMD ["npm", "start"]

