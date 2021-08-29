FROM node:16 

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app  
COPY ./package.json /usr/src/app/package.json  
RUN npm install -g  

EXPOSE 3000 

CMD ["npm", "start"] 