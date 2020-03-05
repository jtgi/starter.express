FROM node:12
RUN npm install nodemon -g

WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet

COPY . .