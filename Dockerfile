FROM node:18-alpine

WORKDIR /app

COPY milk_delivery_app/package*.json ./
RUN npm install

COPY milk_delivery_app .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
