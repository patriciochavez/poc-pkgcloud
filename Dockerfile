FROM patriciochavez/pkgcloud:v1
MAINTAINER <paula.salgado@telefonica.com><patricio.chavez@telefonica.com>
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]
