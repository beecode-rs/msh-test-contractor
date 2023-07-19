FROM milosbugarinovic/msh-lib-base:node18.15.0-alpine3.17

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci       && \
    npm run lint && \
    npm run build
