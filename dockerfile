from node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE ${API_PORT}

CMD ["npm", "start"]