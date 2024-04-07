FROM milosbugarinovic/msh-lib-base:node20.11.1-alpine3.19

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci        && \
    npm run lint  && \
    npm run build && \
    npm run build-cjs
