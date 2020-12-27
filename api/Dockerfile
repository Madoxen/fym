#this docker file builds production
# pull official base image
FROM node:latest

# set working directory
WORKDIR /api

# add `/app/node_modules/.bin` to $PATH
ENV PATH /api/node_modules/.bin:$PATH
ENV HTTPS FALSE

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

#build typescript
RUN npm run-script build

# start app
CMD ["npm", "start"]
