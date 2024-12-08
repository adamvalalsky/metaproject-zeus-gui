ARG BASE_IMAGE_NODE=node:21-alpine3.17

# install node_modules
FROM $BASE_IMAGE_NODE AS node_modules

COPY package.json package-lock.json /app/
RUN \
	cd /app/ &&\
	npm ci


# for dev and unit tests
FROM $BASE_IMAGE_NODE AS dev

WORKDIR /app
ENV NODE_ENV=development
COPY . /app
COPY --from=node_modules /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]
