# Arquitectura del Frontend 🏗️

El frontend de **NetViTeca** es una aplicación de página única (SPA) construida con **React 19** y **Vite**, diseñada para ser rápida, modular y fácil de mantener. Utiliza **TypeScript** para el tipado estático y **TailwindCSS** (v4) para el estilizado.

## 1. Patrones de Diseño 📐

El proyecto sigue una arquitectura de capas simplificada para el cliente:

### 1.  **Capa de Presentación (Pages & Components):**
* [cite_start]**Pages:** Actúan como contenedores de vistas (ej. `Home`, `Catalogo`, `MiPerfil`) [cite: 10-12]. Se encargan de obtener datos del contexto o API y pasarlos a los componentes.
* [cite_start]**Components:** Elementos reutilizables de UI (ej. `BookCard`, `Navbar`) [cite: 3-6]. Son mayormente "tontos" (presentacionales), recibiendo datos vía props.

### 2.  **Capa de Estado (Context API):**
* Se utiliza **React Context** para manejar el estado global de la aplicación, evitando el "prop drilling".
* [cite_start]**AuthContext:** Maneja la sesión del usuario (login, registro, logout) y la persistencia en `localStorage`[cite: 561].
* [cite_start]**MyBooksContext:** Gestiona la lógica de la biblioteca personal del usuario (agregar, eliminar libros, conteo de lecturas)[cite: 549].
* [cite_start]**ThemeContext:** Controla el tema (Claro/Oscuro/Sistema) de la interfaz[cite: 557].

### 3.  **Capa de Servicios (API Layer):**
* Ubicada en `src/api/`. Desacopla la lógica de red de los componentes.
* [cite_start]Utiliza una instancia de **Axios** configurada en `client.ts`[cite: 728].
* [cite_start]Los archivos `books.ts`, `auth.ts`, y `genres.ts` contienen métodos estáticos que realizan las llamadas HTTP y retornan promesas tipadas[cite: 720, 723, 731].

## 2. Estructura de Directorios 📂

```bash
src/
├── api/            # Llamadas HTTP (Axios) y mapeo de datos
├── assets/         # Recursos estáticos (imágenes, SVGs)
├── components/     # Componentes reutilizables (Botones, Cards, Modales)
├── context/        # Providers de React Context (Auth, Libros, Tema)
├── layout/         # Estructura base (Sidebar + Navbar + Outlet)
├── pages/          # Vistas principales (Rutas)
├── router/         # Configuración de React Router y Rutas Protegidas
├── styles/         # CSS global y configuraciones de Tailwind
├── types/          # Interfaces TypeScript (Modelos y Props)
└── utils/          # Funciones auxiliares (ej. cn para clases)
```