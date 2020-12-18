#this docker file builds API DEVELOPMENT server and then starts it

# pull official base image
FROM node:latest

# set working directory
WORKDIR /api

# add `/app/node_modules/.bin` to $PATH
ENV PATH /fymate/node_modules/.bin:$PATH
ENV HTTPS FALSE


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm build

# add app
COPY . ./

# start app
CMD ["npm", "start"]
