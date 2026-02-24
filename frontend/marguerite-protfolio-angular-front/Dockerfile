FROM node:24 AS BUILD

WORKDIR /container/build/

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:alpine

ENV HOME /home/container
WORKDIR /home/container

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /container/build/dist/marguerite-protfolio-angular-front /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
