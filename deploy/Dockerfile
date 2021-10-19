FROM node:14.9.0-alpine3.12

WORKDIR /app
COPY package.json /app/
COPY tsconfig.json /app/
COPY src ./src
RUN npm install
RUN npm run build
RUN ls -a
CMD ["npm", "start"]