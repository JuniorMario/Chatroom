FROM keymetrics/pm2:10-alpine

RUN mkdir -p /app/node-server

WORKDIR /app/node-server

COPY yarn.lock package.json ./

RUN yarn install

COPY  package.json yarn.lock  ecosystem.config.js config.json  ./

EXPOSE 4001 9229
CMD pm2 start --no-daemon ecosystem.config.js
