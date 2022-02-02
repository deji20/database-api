FROM node
WORKDIR /database

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]