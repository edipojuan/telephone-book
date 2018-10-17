FROM node:alpine as builder

ARG env=sandbox

RUN apk update && apk add --no-cache make git

WORKDIR /app
COPY package.json package-lock.json  /app/
RUN npm install @angular/cli@6.0.3 -g
RUN cd /app && npm install
COPY .  /app

RUN cd /app && npm run build:$env

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
