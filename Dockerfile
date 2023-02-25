FROM node:18.13.0 as builder

RUN apt update && \
  apt install -y protobuf-compiler

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install workspace dependencies
RUN npm install

COPY . ./

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
