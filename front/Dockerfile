# 첫 번째 단계: Node.js를 사용하여 React 애플리케이션 빌드
FROM node:lts as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# 두 번째 단계: Nginx로 빌드된 애플리케이션 서빙
FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx

WORKDIR /app
COPY --from=builder /usr/src/app/build ./build

CMD ["nginx", "-g", "daemon off;"]
