FROM node:latest

# create working directory
RUN apt-get update && apt-get install -y && mkdir /app_front
WORKDIR /app_front
#check later if PATH variable must be set
ENV PATH="./node_modules/.bin:$PATH"

# copy and install dependencies
COPY ./package*.json ./
RUN npm install

# copy all others than cached layer of deps (implicitly copies all files except those in docker ignore)
# COPY . .
# RUN npm run build

# start the application(if the docker-compose is not used, this is default start cmd)
CMD ["npm", "start"]