FROM node:14.9.0-alpine3.12

WORKDIR /app
COPY dist /app/
COPY package.json /app/

RUN npm install
COPY . /app

RUN adduser -s /bin/sh -D test
RUN chown test:test -R /app/src/
USER test

CMD node server.js