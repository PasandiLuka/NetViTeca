# Servicios

La capa Services contiene la lógica de negocio del backend. Su función es coordinar operaciones, aplicar reglas del dominio y orquestar el uso de los repositorios definidos en Core. Esta capa no conoce SQL, no manipula conexiones y no accede a Data en forma directa.

Los servicios operan exclusivamente a través de interfaces de Core y reciben o devuelven entidades del dominio, asegurando que el resto del sistema se mantenga aislado de la persistencia.

## Rol de los servicios

Los servicios representan las reglas, procesos y operaciones reales del sistema.
Se encargan de:

* Validar datos antes de ejecutar operaciones.
* Coordinar múltiples repositorios cuando el caso lo requiere.
* Aplicar reglas específicas del dominio (negocio).
* Gestionar transacciones lógicas (no necesariamente de base de datos).
* Procesar, filtrar, calcular y transformar información.
* Proveer operaciones de alto nivel listas para consumir desde la API.

No exponen detalles internos: siempre trabajan sobre las entidades definidas en Core.

## Interacción con Core

Core define:

* Las interfaces que los servicios deben implementar (por ejemplo: `ILibroService`, `IUsuarioService`).
* Las entidades que manipulan los servicios (Libro, Usuario, Préstamo, etc.).
* Contratos y reglas que el servicio debe respetar.

Los servicios implementan esas interfaces, mientras que otras capas los consumen a través de ellas.
Esto mantiene el código desacoplado y fácilmente testeable.

## Interacción con Repository

Los servicios dependen de los repositorios para obtener o persistir datos.

Flujo típico:

1. El servicio recibe una solicitud (desde la API o desde otra operación interna).
2. Valida parámetros y valores.
3. Llama a uno o varios repositorios.
4. Combina y transforma resultados si es necesario.
5. Devuelve una entidad, colección o resultado final.

El servicio no sabe ni le interesa cómo los repositorios obtienen los datos.

## Responsabilidades típicas de los servicios

* Validar entidades antes de guardar o actualizar.
* Comprobar existencia de registros antes de modificarlos.
* Aplicar restricciones de dominio (por ejemplo: un libro no se puede prestar si no hay ejemplares disponibles).
* Calcular valores derivados, métricas o estados.
* Coordinar operaciones encadenadas (por ejemplo: registrar un préstamo + marcar ejemplar como prestado).
* Gestionar flujos completos que combinan varias entidades (usuarios, libros, préstamos, etc.).

## Qué NO hacen los servicios

* No acceden directamente a SQL.
* No construyen consultas.
* No generan conexiones.
* No manejan DataTables ni estructuras crudas.
* No implementan lógica de presentación.
* No realizan logging de bajo nivel.

Todo eso corresponde a otras capas (Data, Repository, API, Logger, etc.).

## Ejecución del flujo con servicios

Ejemplo ilustrativo del paso a paso:

1. La API recibe una petición:
   `POST /prestamos/crear`

2. El controlador llama al servicio:
   `prestamoService.CrearPrestamo(request)`

3. El servicio:

   * Valida disponibilidad del libro.
   * Consulta repositorio de usuarios.
   * Consulta repositorio de libros.
   * Verifica reglas del sistema.
   * Inserta el préstamo a través del repositorio.
   * Actualiza estado del ejemplar.

4. Devuelve el resultado a la API.

Los servicios son el “cerebro” del backend.

## Transacciones y consistencia

Los servicios coordinan las operaciones como una transacción lógica, aunque la transacción técnica esté en Repository o SQL.

Si una operación requiere varios pasos críticos, el servicio asegura que:

* se ejecuten en el orden correcto
* se revierta o compense si algo falla
* se cumplan todas las reglas del dominio

No se usan migraciones ni automatismos: todo está bajo control del desarrollador.

## Ventajas de esta capa

* Lógica concentrada y ordenada.
* Fácil de testear (mocks de repositorio).
* Independencia total de la persistencia.
* Cambios de base de datos no afectan la lógica.
* API más limpia y sin duplicación de reglas.