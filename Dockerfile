FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 8080
CMD ["yarn", "server"]