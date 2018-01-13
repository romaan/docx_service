FROM node

PORT 3000

COPY . .

RUN npm install
RUN npm run start