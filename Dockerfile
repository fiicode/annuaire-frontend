FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY yarn.lock ./
COPY package.json ./
#COPY package-lock.json ./
RUN npm install --no-package-lock
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./
EXPOSE 3000
# start app
CMD ["npm", "start"]
