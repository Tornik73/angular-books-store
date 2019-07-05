FROM node:8

WORKDIR /nodeapp

# Bundle app source
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000




CMD [ "npm", "start" ]