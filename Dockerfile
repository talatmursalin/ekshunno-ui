FROM node:15 as builder

RUN apt-get update -y
RUN apt-get install -y python-minimal
# RUN apt-get install -y apt-utils build-essential

WORKDIR /app-ui

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

## production

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app-ui/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
