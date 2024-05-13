ARG BASE_IMAGE_NODE

# install node_modules
FROM $BASE_IMAGE_NODE as node_modules

COPY package.json package-lock.json /app/
RUN \
	cd /app/ &&\
	npm install


# for dev and unit tests
FROM $BASE_IMAGE_NODE as dev

WORKDIR /app
ENV NODE_ENV=development
COPY . /app
COPY --from=node_modules /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]
