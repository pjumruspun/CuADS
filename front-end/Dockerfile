FROM node:14.17.0

RUN yarn global add nodemon

# Create app directory
WORKDIR /usr/src/app

#copy package files to app directory
COPY package*.json ./

# Install dependencies
RUN yarn install
RUN yarn global add react-scripts

# Copy code into container
COPY . .

# Should export the same port as FRONTEND_PORT in .env
EXPOSE 3000

CMD [ "yarn", "start" ]