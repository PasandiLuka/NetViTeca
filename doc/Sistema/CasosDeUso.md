# Casos de Uso 

A continuación se describen los casos de uso integrados en el sistema, basados en las funciones disponibles en la interfaz y la lógica implementada.

## 1. Registrarse

- Actor: Usuario

- Qué hace:
El usuario crea una nueva cuenta ingresando sus datos, lo que le permite acceder al resto del sistema.

## 2. Iniciar sesión

- Actor: Usuario

- Qué hace: Accede al sistema ingresando email y contraseña, desbloqueando las funciones internas como catálogo, mis libros y administración.

## 3. Ver catálogo de libros

- Actor: Usuario

- Qué hace:
Accede al listado general de libros disponibles dentro de la biblioteca digital.

## 4. Buscar libros

- Actor: Usuario

- Qué hace:
Realiza búsquedas por nombre o coincidencias dentro del catálogo.

## 5. Ver detalles de un libro

- Actor: Usuario

- Qué hace:
Selecciona un libro para visualizar su información completa (autor, género, descripción, etc.).

## 6. Crear género

- Actor: Usuario administrador (implícito en el diseño actual)

- Qué hace:
Accede al formulario de creación de géneros y registra uno nuevo en el sistema.

## 7. Ver listado de géneros

- Actor: Usuario

- Qué hace:
Accede a la lista completa de géneros existentes.

## 8. Crear libro

- Actor: Usuario administrador (implícito)

- Qué hace:
Accede al formulario para registrar un nuevo libro, completando su título, autor, género y demás datos.

## 9. Editar libro

- Actor: Usuario administrador (implícito)

- Qué hace:
Modifica la información de un libro existente.

## 10. Eliminar libro

- Actor: Usuario administrador (implícito)

- Qué hace:
Elimina un libro del sistema.

## 11. Ver perfil

- Actor: Usuario

- Qué hace:
Accede a su perfil para ver información personal asociada a la cuenta.

## 12. Ver “Mis libros”

- Actor: Usuario

- Qué hace:
Consulta los libros asociados a su cuenta o agregados como parte de su colección personal.