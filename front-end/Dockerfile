FROM node:latest
RUN npm install -g nodemon
# Create app directory
WORKDIR /usr/src/app
#copy package files to app directory
COPY package*.json ./
#install dependencies
RUN yarn install
#copy code into container
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]