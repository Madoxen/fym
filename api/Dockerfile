#this docker file builds production
# pull official base image
FROM node:latest

# set working directory
WORKDIR /api

# add `/app/node_modules/.bin` to $PATH
ENV PATH /api/node_modules/.bin:$PATH
ENV HTTPS FALSE

<<<<<<< HEAD
# start app
CMD ["npm", "run-script build"]
CMD ["npm", "start"]
=======
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g nodemon
RUN npm install

# add app
COPY . ./

#build typescript
RUN npm run-script build

# start app
CMD ["npm", "run-script" ,"start"]
>>>>>>> 26af0e751f9663eb7fd5fc2966f4c6e312fec657
