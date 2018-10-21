FROM node:alpine

ENV HOME=/home/app/server_node/

COPY package.json package-lock.json $HOME/server_node/

WORKDIR $HOME/server_node

RUN npm install --silent --progress=false

COPY . $HOME/server_node/

CMD ["npm", "start"]