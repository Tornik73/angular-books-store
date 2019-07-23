FROM node as builder
COPY package.json package-lock.json ./
WORKDIR /ng-app
COPY . .
RUN npm install
RUN npm run ng build --prod --output-path=dist
FROM nginx:1.14.1-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/front-end-angular /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
