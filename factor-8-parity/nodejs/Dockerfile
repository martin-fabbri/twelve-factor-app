FROM node:10-alpine
RUN yarn global add ts-node
COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY index.ts .
EXPOSE 8000
CMD yarn server
