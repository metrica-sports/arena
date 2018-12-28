FROM node:carbon-alpine

EXPOSE 4567

RUN mkdir -p /opt/arena
WORKDIR /opt/arena
COPY package.json /opt/arena
COPY package-lock.json /opt/arena
RUN npm install --production

COPY . /opt/arena/

CMD ["npm", "start"]
