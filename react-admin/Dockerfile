FROM node:12.8.0-alpine
WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install --silent
RUN npm install -g react-scripts --silent
COPY . .

RUN chown -R node:node .
USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
