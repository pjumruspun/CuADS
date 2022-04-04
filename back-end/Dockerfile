FROM node:14.15.1

RUN yarn global add nodemon

# Create app directory
WORKDIR /usr/src/app

# Copy package files to app directory
COPY package*.json ./

# Install dependencies
RUN yarn install
RUN yarn global add @nestjs/cli@7.5.1

# FFMPEG dependencies
# Will be installed in /usr/bin/ffmpeg
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

# Copy code into container
COPY . .

# Should export the same port as BACKEND_PORT in .env
EXPOSE 3001

CMD [ "yarn", "start" ]