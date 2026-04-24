# 🚀 MEAN Stack Task Manager (Containerized)

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Este proyecto consiste en el desarrollo y despliegue de una aplicación web de alto nivel utilizando la pila **MEAN** (MongoDB, Express, Angular y Node.js), implementando un desarrollo **Full Stack** unificado mediante JavaScript y TypeScript en todas sus capas.

---

## 🏛️ Arquitectura del Sistema

La arquitectura se divide en tres pilares fundamentales:

*   **🎨 FrontEnd (Angular 17+):** Aplicación de una sola página (SPA) con una interfaz **Premium Glassmorphism**. Ofrece una experiencia de usuario fluida, reactiva y visualmente impactante.
*   **⚙️ BackEnd (Node.js & Express):** Núcleo de procesamiento robusto que gestiona las peticiones HTTP y expone una **API REST** escalable para la comunicación de datos.
*   **🐳 Infraestructura (Docker):** La base de datos **MongoDB** se despliega de forma aislada mediante **Docker y Docker Compose**, garantizando un entorno consistente y fácil de orquestar.

---

## 🔄 Flujo de la Aplicación
El usuario interactúa con la interfaz de Angular enviando solicitudes al servidor. Estas son procesadas por el BackEnd, que realiza las operaciones necesarias en la base de datos MongoDB y devuelve una respuesta en formato JSON al cliente.

## 🌟 Características Principales
*   **🔗 Integración End-to-End:** Conexión fluida entre cliente, servidor y base de datos.
*   **🔌 API RESTful:** Estándares industriales para la comunicación entre capas.
*   **🛠️ Operaciones CRUD:** Gestión completa de los datos (Create, Read, Update, Delete).
*   **📦 Contenerización:** Uso de Docker para la gestión eficiente de servicios.
*   **🌱 Auto-Seeding:** El sistema se autoinicializa con datos de ejemplo para demostraciones inmediatas.

---

## 🛠️ Instalación y Ejecución

### 📋 Requisitos Previos
- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 🚀 Pasos para ejecutar

1. **Clonar el repositorio:**
   ```bash
   git clone <url-de-tu-repo>
   cd mean-presentation
   ```

2. **Iniciar la Base de Datos (Docker):**
   ```bash
   docker-compose up -d
   ```

3. **Ejecutar la Aplicación completa:**
   En la raíz del proyecto, ejecuta:
   ```bash
   npm run dev
   ```

### 🌐 Acceso
- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **Backend API:** [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)

---

## 👤 Autor
Este proyecto ha sido desarrollado íntegramente por:
*   **Nombre:** Alex (atc757)
*   **Email:** [atc757@inlumine.ual.es](mailto:atc757@inlumine.ual.es)
*   **Institución:** Universidad de Almería (UAL)

---

## 📝 Licencia
Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de usarlo para tus propias presentaciones! 🚀
