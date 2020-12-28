#this docker file builds development enviroment and starts the server
# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV HTTPS FALSE


# start app
CMD ["npm", "start"]
