FROM keymetrics/pm2:10-alpine

RUN mkdir -p /app/react

WORKDIR /app/react
ENV WEBSOCKETIP=app
COPY yarn.lock  package.json ./

RUN yarn install

COPY  package.json yarn.lock . ./

EXPOSE 3001 3002 3000 9229
CMD  yarn start
