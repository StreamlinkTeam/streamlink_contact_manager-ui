FROM node:latest as node

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .



RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli && npm rebuild node-sass
#RUN npm audit fix
RUN npm run build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=node /app/dist /usr/share/nginx/html
