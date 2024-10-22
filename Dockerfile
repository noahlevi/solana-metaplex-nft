FROM node:20

# app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# dependencies
COPY package.json /usr/src/app/

# make sure to clean node_modules during build
RUN rm -rf node_modules && npm install

# copy app source
COPY . /usr/src/app

EXPOSE 4000
CMD [ "npm", "start" ]