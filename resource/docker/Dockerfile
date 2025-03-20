FROM milosbugarinovic/msh-lib-base:node22.14.0-alpine3.21

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci        && \
    npm run lint  && \
    npm run build && \
    npm run build-cjs
