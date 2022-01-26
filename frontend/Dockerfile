FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install
# 프로덕션의 경우
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]