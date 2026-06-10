FROM milosbugarinovic/msh-lib-base:node22.22.1-alpine3.23

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci        && \
    npm run lint  && \
    npm run build
