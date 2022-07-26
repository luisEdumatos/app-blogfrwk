FROM nginx:alpine
COPY dist/app-blogfrwk/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf