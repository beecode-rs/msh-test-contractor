FROM milosbugarinovic/msh-lib-base:node18.17.0-alpine3.18

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci       && \
    npm run lint && \
    npm run build
