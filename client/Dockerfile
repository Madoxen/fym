#this docker file builds production
# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV HTTPS FALSE

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install create-react-app -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
