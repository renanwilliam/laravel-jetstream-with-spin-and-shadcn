FROM node:20 as base

### Development
FROM base as development
ARG USER_ID

RUN usermod -u $USER_ID node

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm install

CMD [ "npm", "run", "dev" ]
