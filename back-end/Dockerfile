FROM node:14.15.1

RUN yarn global add nodemon

# Create app directory
WORKDIR /usr/src/app

#copy package files to app directory
COPY package*.json ./

#install dependencies
RUN yarn install

#copy code into container
COPY . .

EXPOSE 3001
CMD [ "yarn", "start" ]