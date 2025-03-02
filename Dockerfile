FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

CMD ["node", "-r", "@babel/register", "src/server.js"]
