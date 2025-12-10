# README – Frontend

Este proyecto corresponde al **Frontend** de la aplicación del Club de Básquet ET12. Aquí se detallan la estructura, tecnologías utilizadas, scripts principales y convenciones para mantener un desarrollo ordenado y escalable.

---

## 🚀 Tecnologías principales

* **Framework:** React + Vite
* **Lenguaje:** TypeScript
* **Estado y lógica:** Custom hooks + servicios
* **Estilos:** TailwindCSS
* **Ruteo:** React Router
* **Linting:** ESLint + Prettier

---

## 📂 Estructura del proyecto

```
frontend/
├── public/
├── src/
│   ├── api/           # Capa API → define endpoints y llamados HTTP
│   ├── core/          # Capa Core → modelos, tipos, entidades y lógica central
│   ├── data/          # Capa Data → DTOs, validaciones, mappers
│   ├── repository/    # Capa Repository → interacción abstracta con la API
│   ├── services/      # Capa Services → lógica de negocio del frontend
│   ├── components/    # Componentes reutilizables
│   ├── pages/         # Páginas del sistema
│   ├── hooks/         # Hooks personalizados
│   ├── utils/         # Utilidades generales
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

---

## 🧱 Arquitectura de Capas (frontal)

El frontend sigue una arquitectura modular inspirada en **Clean Architecture**, adaptada al ecosistema React.

### **1. API Layer (src/api/)**

* Define endpoints.
* Gestiona requests con fetch/axios.
* Maneja errores y tokens.

### **2. Core Layer (src/core/)**

* Entidades principales.
* Tipos globales.
* Reglas puras del dominio.

### **3. Data Layer (src/data/)**

* DTOs.
* Validaciones.
* Mappers entre API ↔ dominio.

### **4. Repository Layer (src/repository/)**

* Abstracción del acceso a datos.
* Expone métodos como `getPlayers()`, `saveTraining()`, etc.

### **5. Services Layer (src/services/)**

* Orquesta la lógica de negocio.
* Usa repositorios.
* Se comunica con hooks o componentes.

---

## 📦 Instalación

```bash
npm install
```

---

## ▶️ Scripts

```bash
npm run dev       # Ejecuta el servidor de desarrollo
npm run build     # Construcción para producción
npm run preview   # Previsualización del build
npm run lint       # Corre ESLint
```

---

## 🧭 Convenciones

* **PascalCase** → componentes y entidades.
* **camelCase** → funciones, variables y hooks.
* **kebab-case** → nombres de archivos.
* Evitar lógica de negocio en componentes.
* Hooks solo deben comunicarse con servicios o repos.

