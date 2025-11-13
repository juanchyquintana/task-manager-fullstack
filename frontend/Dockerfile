# frontend/Dockerfile

# App build
FROM node:20-alpine AS builder

WORKDIR /app

# --- ARGs que vienen desde docker-compose ---
ARG VITE_API_URL
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE

# Los exponemos como ENV para que Vite los lea en build time
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}

COPY package*.json ./
RUN npm install

COPY vite.config.* ./
COPY tsconfig*.json ./
COPY index.html ./
COPY src ./src
COPY public ./public
COPY tailwind.config.* postcss.config.* ./

RUN npm run build

# Runtime with nginx
FROM nginx:alpine

# Copiamos el build de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Config de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
