FROM node:lts-alpine as builder

WORKDIR /app
ADD package.json .
ADD package-lock.json .
RUN npm ci
ADD . .

RUN npm run build

FROM nginx:1.17-alpine as nginx
ADD ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
