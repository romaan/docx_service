FROM node

WORKDIR /home/node/app
PORT 3000
COPY . .

VOLUME
RUN npm install

CMD npm run start