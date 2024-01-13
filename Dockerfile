FROM node:16-alpine as build

WORKDIR /react-cv/


COPY package.json package-lock.json /react-cv/

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /react-cv/build /usr/share/nginx/html

