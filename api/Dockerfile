#this docker file builds API DEVELOPMENT server and then starts it

# pull official base image
FROM node:latest

# set working directory
WORKDIR /api

# add `/app/node_modules/.bin` to $PATH
ENV PATH /api/node_modules/.bin:$PATH
ENV HTTPS FALSE

# start app
CMD ["npm", "run-script build"]
CMD ["npm", "start"]
