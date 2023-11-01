FROM node:lts as builder

WORKDIR /usr/src/app

COPY . .

RUN ["/usr/local/bin/npm","install"]
RUN ["/usr/local/bin/npm","run","build"]
# RUN ["/usr/local/bin/npx", "prisma", "generate"]

FROM node:alpine

WORKDIR /app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/.env .
COPY --from=builder /usr/src/app/prisma ./prisma


RUN npm install 
RUN npx prisma generate

EXPOSE 5001
CMD ["npm", "run", "server"] 

