# Persistencia

La persistencia en el backend de NetViTeca está organizada en dos capas concretas: Data y Repository, con Core definiendo las abstracciones que ambas implementan o utilizan. No existen modelos propios de la capa, no se utiliza Entity Framework ni ORM, y toda la interacción con la base de datos se realiza mediante SQL manual y procedimientos almacenados definidos en `scripts/bd`.

## Capa Data

La capa Data contiene todo lo necesario para conectar con la base de datos y ejecutar operaciones SQL. Su rol es bajo nivel: no define modelos, no interpreta datos, no transforma objetos. Únicamente expone mecanismos crudos para ejecutar consultas.

Responsabilidades principales:

* Abrir conexiones a la base de datos.
* Ejecutar consultas SQL y stored procedures.
* Entregar los resultados en estructuras primitivas (DataTable, listas simples o estructuras equivalentes).
* Manejo básico de errores y excepciones de SQL.
* No contiene lógica de negocio.
* No contiene validaciones.
* No define entidades propias.

La capa Data depende únicamente de la configuración y de las rutas hacia los scripts SQL del proyecto.

## Capa Repository

La capa Repository toma los resultados crudos de Data y los convierte en estructuras que el resto del backend pueda consumir. Su función es intermedia: interpreta, asigna, combina y transforma datos.

Responsabilidades:

* Implementar las interfaces definidas en Core.
* Coordinar llamadas a la capa Data.
* Mapear los resultados de las consultas SQL hacia objetos de dominio definidos en Core.
* Ejecutar múltiples consultas cuando un caso lo requiera (por ejemplo, cargar un libro con sus autores).
* No define reglas de negocio.
* No realiza validaciones de sistema.
* No expone SQL directamente; todo pasa por Data.

La capa Repository es el puente entre SQL y el dominio. Si una tabla cambia, normalmente el impacto se maneja aquí.

## Capa Core

La capa Core define el lenguaje interno del backend: entidades del dominio, interfaces, contratos y servicios base. Todo lo que las otras capas usan para comunicarse está aquí.

En persistencia, Core aporta:

* Entidades del dominio (Libro, Usuario, Prestamo, etc.).
* Interfaces de repositorio (por ejemplo `ILibroRepository`).
* Contratos de servicios que dependen indirectamente de la persistencia.

Core no conoce SQL, no abre conexiones y no depende de Data.
Repository implementa Core.
Services consumen Core.

## Relación entre capas

Flujo típico en una operación de persistencia:

1. Service solicita datos a través de una interfaz de Core.
   Ej.: `ILibroRepository.ObtenerPorId(id)`

2. Repository implementa la interfaz.

   * Llama a la capa Data para ejecutar el SQL correspondiente.
   * Recibe estructuras crudas (tablas, filas, values).
   * Las convierte en una entidad de Core.

3. Data ejecuta la consulta SQL.

   * Abre conexión.
   * Ejecuta script o procedimiento.
   * Devuelve los resultados al Repository.

4. Service recibe una entidad lista para usar y continúa con la lógica.

Este diseño mantiene una clara separación:

* Data = bajo nivel, SQL puro
* Repository = interpretación y mapeo
* Core = contratos y dominio

## Scripts SQL

Todos los SQL utilizados por Data se encuentran en `scripts/bd`.
Incluyen:

* creación de tablas, relaciones e integridad
* consultas específicas del dominio
* procedimientos almacenados
* scripts organizados por módulos del sistema

Los scripts son la única fuente de verdad de la estructura de la base. Ningún ORM genera tablas, ni migra, ni interpreta modelos.

## Consideraciones

* El backend no usa Entity Framework ni ningún ORM.
* No existen modelos duplicados; las entidades de dominio están en Core.
* SQL es explícito y controlado por el equipo, no generado por herramientas.
* Los repositorios actúan como una capa anti-corrupción entre SQL y el dominio.
* Los servicios no acceden ni deberían acceder a Data directamente.

