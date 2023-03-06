FROM node:16-alpine
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node . /app
RUN npm ci --only=production && npm cache clean --force
CMD [ "node", "index.js" ]