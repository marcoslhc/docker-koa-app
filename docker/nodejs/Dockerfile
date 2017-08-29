FROM mhart/alpine-node:latest

RUN apk update && \
    apk add git && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /var/app

WORKDIR /var/app

ADD package.json /var/app
ADD tsconfig.json /var/app
ADD dist /var/app/dist
RUN npm install
## PRODUCTION MODE
ENV NODE_ENV=prod
CMD ["npm", "run", "serve"]
