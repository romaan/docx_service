FROM node

WORKDIR /home/node/app
EXPOSE 3000
COPY . .

VOLUME ["/home/node/app/data"]
RUN npm install

CMD ["npm", "run", "start"]
