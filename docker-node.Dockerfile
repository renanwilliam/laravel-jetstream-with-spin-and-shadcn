FROM node:20 as base

### Development
FROM base as development
ARG USER_ID

RUN usermod -u $USER_ID node

USER node
