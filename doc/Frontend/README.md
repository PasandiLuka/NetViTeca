# NetViTeca - Frontend 📖

Este directorio contiene el código fuente de la interfaz de usuario de **NetViTeca**, un sistema de gestión para bibliotecas digitales modernas. La aplicación permite a los usuarios explorar catálogos, gestionar su biblioteca personal y administrar su perfil.

## 🚀 Tecnologías Principales

* **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estático estricto)
* **Estilos:** [TailwindCSS v4](https://tailwindcss.com/) + [Bootswatch](https://bootswatch.com/)
* **Enrutamiento:** [React Router Dom v7](https://reactrouter.com/)
* **Cliente HTTP:** [Axios](https://axios-http.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)

## 📂 Estructura del Proyecto

El código fuente se encuentra en la carpeta `src/` y sigue una estructura modular:

```text
src/
├── api/           → Servicios para comunicación con el Backend (.NET)
├── components/    → Piezas de UI reutilizables (BookCard, Navbar, Sidebar)
├── context/       → Estado global (Auth, MisLibros, Tema)
├── layout/        → Diseño principal de la aplicación
├── pages/         → Vistas completas (Home, Catálogo, Perfil, Auth)
├── router/        → Configuración de rutas y protección de acceso
├── styles/        → Hojas de estilo globales y configuración CSS
├── types/         → Definiciones de interfaces TypeScript (Modelos)
└── utils/         → Funciones de utilidad (ej. concatenación de clases)
```

## 🛠️ Instalación y Ejecución

Asegúrate de tener Node.js 18+ instalado.

    Instalar dependencias: Navega a la carpeta Front-End y ejecuta:
    Bash

npm install

Configurar Variables de Entorno (Opcional): Por defecto, la aplicación apunta a http://localhost:5017. Si tu backend corre en otro puerto, crea un archivo .env en la raíz de Front-End:
Fragmento de código

VITE_API_URL=http://tu-backend-url:puerto

Modo Desarrollo: Inicia el servidor local con recarga rápida (HMR):
```Bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

Construir para Producción:
```Bash
npm run build
```

✨ Funcionalidades Implementadas

    Autenticación: Login y Registro de usuarios con validación.

    Catálogo: Visualización de libros disponibles con filtros por género y búsqueda.

    Mis Libros: Gestión de biblioteca personal (agregar/quitar libros).

    Perfil: Edición de datos de usuario y preferencias (Modo oscuro/claro).

    Administración: Formularios para crear nuevos Libros y Géneros.

    Diseño Responsivo: Interfaz adaptable a móviles y escritorio mediante Tailwind.

🤝 Integración con Backend

El frontend espera conectarse a una API REST estructurada. Consulta la documentación en ../Backend/README.md o ../Sistema/API.md para detalles sobre los endpoints consumidos.