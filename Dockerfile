FROM mhart/alpine-node
WORKDIR /usr/src/app
RUN mkdir -p uploads

RUN yarn global add nodemon
RUN yarn global add ts-node

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080
#CMD ["yarn", "server"]
