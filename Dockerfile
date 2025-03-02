# Build Stage
FROM node:18 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Chạy ứng dụng frontend (React/Vue/Angular)
CMD ["npm", "start"]
