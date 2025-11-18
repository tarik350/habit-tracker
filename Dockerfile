FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY public/_redirects /usr/share/nginx/html/_redirects
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
RUN mkdir -p /run/nginx \
    && mkdir -p /var/cache/nginx \
    && chmod -R 777 /run/nginx \
    && chmod -R 777 /var/cache/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]