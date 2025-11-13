# 📘 To-Do App – Fullstack Challenge

Aplicación Fullstack para gestionar tareas con autenticación mediante Auth0, estado global con MobX, backend con Node.js + TypeScript, MongoDB y despliegue con Docker Compose.

Este README documenta completamente la instalación, arquitectura, ejecución local y ejecución vía Docker para la evaluación técnica.

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- ⚛️ React + TypeScript  
- 🎨 TailwindCSS  
- 🧩 MobX  
- 🔐 Auth0 React SDK  
- 🌐 Axios  
- ⚡ Vite  
- 🖥 NGINX (producción)

### **Backend**
- 🟦 Node.js + TypeScript  
- 🚀 ExpressJS  
- 🍃 MongoDB Atlas  
- 📐 Arquitectura modular (Controllers, Services, Repositories)  
- 🔐 Validación JWT con JWKS (Auth0, RS256)

### **Infraestructura**
- 🐳 Docker  
- 🐳 Docker Compose  
- 📦 Multi-Stage Builds  
- 🌍 Variables de entorno (.env)

---

# 🧩 Funcionalidades

## 🔐 Autenticación (Auth0)
- Login y Logout seguro  
- Refresh Tokens  
- Tokens guardados en `localStorage`  
- Validación en backend con Auth0 JWKS  
- Solo muestra tareas del usuario autenticado

## 📌 Gestión de Tareas
- Crear tareas  
- Listarlas  
- Editarlas  
- Eliminarlas  
- Estados: `pending`, `inProgress`, `completed`  
- Fecha de creación automática  
- Validación en formularios  
- Manejo visual de errores y carga  

## 🎨 UI/UX
- Diseño limpio y responsivo  
- Componentes reutilizables  
- Feedback visual  
- Grid responsivo con Tailwind  



# 📁 Estructura del Proyecto

## **Frontend**
    frontend/
        └── src/
        ├── api/
        ├── components/
        ├── hooks/
        ├── stores/
        ├── views/
        ├── App.tsx
        └── main.tsx


## **Backend**
    backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── repositories/
        ├── routes/
        ├── services/
        └── index.ts

---

# ⚙️ Variables de Entorno

## **Frontend (.env)**
    VITE_API_URL=http://localhost:3000
    VITE_AUTH0_DOMAIN=dev-xxxxxxxxxx.us.auth0.com
    VITE_AUTH0_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
    VITE_AUTH0_AUDIENCE=https://todo-api.example.com

## **Backend (.env)**
    FRONTEND_URL=http://localhost:5173
    DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/
    AUTH0_ISSUER_BASE_URL=https://dev-xxxxxxxxxx.us.auth0.com/
    AUTH0_AUDIENCE=https://todo-api.example.com
    PORT=3000

---

# ▶️ Ejecutar en Local (sin Docker)

## **Backend**
```bash
cd backend
npm install
npm run dev
```

## **Frontend**
```bash
cd frontend
npm install
npm run dev
```

La app quedará disponible en:
- Frontend → http://localhost:5173
- Backend → http://localhost:3000

## 🚀 Ejecutar con Docker Compose (Modo Producción)

### ⚠️ Pre-requisito
Crear un archivo **`.env`** en la raíz del proyecto (o usar variables de entorno del sistema):

Ejemplo:

```env
VITE_AUTH0_DOMAIN=dev-xxxxx...
VITE_AUTH0_CLIENT_ID=xxxxxx
VITE_AUTH0_AUDIENCE=https://todo-api.jdquintana.com

AUTH0_ISSUER_URL=https://dev-xxxxx.us.auth0.com/
AUTH0_AUDIENCE=https://todo-api.jdquintana.com
AUTH0_JWKS_URI=https://dev-xxxxx.us.auth0.com/.well-known/jwks.json
```

# 🐳 Ejecutar con Docker Compose (modo producción)

### ⚠️ Pre-requisito:

Crear `.env` global en la raíz o usar variables de entorno del sistema.

## **1️⃣ Build + up**

```bash
docker compose up --build
```

## **2️⃣ Acceder al Frontend**

```
http://localhost:5173
```

El backend queda publicado en:

```
http://localhost:3000
```

---

# 📦 Contenido del `docker-compose.yml`

```yaml
services:
  backend:
    build:
      context: ./backend
    container_name: todo-backend
    restart: unless-stopped
    depends_on:
      - mongo
    environment:
      NODE_ENV: production
      PORT: 3000
      MONGO_URI: ${DATABASE_URL}
      AUTH0_ISSUER_URL: ${AUTH0_ISSUER_BASE_URL}
      AUTH0_AUDIENCE: ${AUTH0_AUDIENCE}
      AUTH0_JWKS_URI: ${AUTH0_ISSUER_BASE_URL}.well-known/jwks.json
    ports:
      - "3000:3000"

  frontend:
    build:
      context: ./frontend
    container_name: todo-frontend
    restart: unless-stopped
    depends_on:
      - backend
    environment:
      VITE_AUTH0_DOMAIN: ${VITE_AUTH0_DOMAIN}
      VITE_AUTH0_CLIENT_ID: ${VITE_AUTH0_CLIENT_ID}
      VITE_AUTH0_AUDIENCE: ${VITE_AUTH0_AUDIENCE}
      VITE_API_URL: http://backend:3000
    ports:
      - "5173:80"

  mongo:
    image: mongo:6
    container_name: todo-mongo
    restart: unless-stopped
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

# 🧩 Patrones de Arquitectura Aplicados

### **Backend**
* ✔️ Service Layer
* ✔️ Repository Pattern
* ✔️ Middlewares para validación y JWT
* ✔️ DTOs tipados con TypeScript
* ✔️ Separación por responsabilidad

### **Frontend**
* ✔️ MobX como single source of truth
* ✔️ Stores globales desacoplados
* ✔️ Hooks personalizados (`useInitAuthToken`)
* ✔️ Componentes reutilizables y desacoplados


# 📜 Decisiones Técnicas
* Uso de **MobX** para un manejo global más simple que Redux en una prueba técnica → lectura más clara.
* Docker Multi-Stage para **imágenes livianas**.
* NGINX para servir el frontend → compatible con producción real.
* Auth0 con RS256 → mayor seguridad que HS256.
* Arquitectura **limpia y escalable** en backend.

---

# 📬 Contacto
Si necesitás ejecutar el proyecto o revisarlo:
📧 **[juan.diego@example.com](mailto:juan.diego@example.com)**
💼 **GitHub / LinkedIn disponibles en el CV**
