FROM node:18-alpine

WORKDIR /phamvannhat/backend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]
