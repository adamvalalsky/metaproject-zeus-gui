ARG BASE_IMAGE_NODE=node:21-alpine3.17
ARG BASE_IMAGE_NGINX=nginxinc/nginx-unprivileged:1.25.3-alpine

# install node_modules
FROM $BASE_IMAGE_NODE AS node_modules

COPY package.json package-lock.json /app/
RUN \
	cd /app/ &&\
	npm ci

FROM $BASE_IMAGE_NODE AS build

WORKDIR /app
ENV NODE_ENV=production
COPY . /app
COPY --from=node_modules /app/node_modules /app/node_modules
RUN ["npm", "run", "build"]

FROM $BASE_IMAGE_NGINX

COPY docker/prod/nginx/conf.d /etc/nginx/conf.d
COPY docker/prod/nginx/includes /etc/nginx/includes
COPY public /var/www/public
COPY --from=build /app/dist /var/www/web
