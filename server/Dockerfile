#  Dockerfile for Node Express Backend

FROM node:18.12-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 1111

CMD ["npm","run", "dev"]