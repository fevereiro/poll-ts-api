FROM node:12
WORKDIR /usr/src/poll-ts-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
CMD npm start