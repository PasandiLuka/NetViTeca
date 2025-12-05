INSERT INTO Usuario (nombreCompleto, nombreUsuario, correo, contrasena, numeroTelefono) VALUES 
('Lucca Pazanddi', 'LUKITA7956', 'lukita@gmail.com', 'luka1234', '1123456789'),
('Sebaz Serpa', 'SEBITA7956', 'sebita@gmail.com', 'seba1234', '1231234324');

INSERT INTO Genero (idGenero, genero) VALUES 
(1, 'Fantasia'),
(2, 'Clásicos'),
(3, 'Infantil'),
(4, 'Distopico'),
(5, 'Aventura');

INSERT INTO Libro (idGenero, titulo, editorial, autor, fechaCreacion, cantidadPaginas) VALUES 
(1, 'Cien años de soledad', 'Sudamericana', 'Gabriel García Márquez', '1967-06-05', 417),
(2, 'Don Quijote de la Mancha', 'Francisco de Robles', 'Miguel de Cervantes', '1605-01-16', 863),
(3, 'El Principito', 'Reynal & Hitchcock', 'Antoine de Saint-Exupéry', '1943-04-06', 96),
(1, 'La casa de los espíritus', 'Plaza & Janés', 'Isabel Allende', '1982-01-01', 448),
(4, '1984', 'Secker & Warburg', 'George Orwell', '1949-06-08', 328),
(2, 'Hamlet', 'Nicholas Ling', 'William Shakespeare', '1603-07-26', 160),
(3, 'Matar a un ruiseñor', 'J.B. Lippincott & Co.', 'Harper Lee', '1960-07-11', 281),
(5, 'El señor de los anillos', 'Allen & Unwin', 'J.R.R. Tolkien', '1954-07-29', 1178),
(4, 'Fahrenheit 451', 'Ballantine Books', 'Ray Bradbury', '1953-10-19', 194),
(5, 'Crimen y castigo', 'The Russian Messenger', 'Fiódor Dostoievski', '1866-01-01', 671),
(1, 'Rayuela', 'Rayuela', 'Julio Cortázar', '1963-06-28', 736),
(2, 'La odisea', 'Ancient Greece Press', 'Homero', '0700-01-01', 500),
(3, 'Orgullo y prejuicio', 'T. Egerton', 'Jane Austen', '1813-01-28', 279),
(4, 'Brave New World', 'Chatto & Windus', 'Aldous Huxley', '1932-08-30', 311),
(5, 'Guerra y paz', 'The Russian Messenger', 'León Tolstói', '1869-01-01', 1225),
(1, 'La sombra del viento', 'Planeta', 'Carlos Ruiz Zafón', '2001-04-01', 487),
(2, 'Macbeth', 'Thomas Creede', 'William Shakespeare', '1606-01-01', 85),
(3, 'El amor en los tiempos del cólera', 'Oveja Negra', 'Gabriel García Márquez', '1985-04-05', 348),
(4, 'Animal Farm', 'Secker & Warburg', 'George Orwell', '1945-08-17', 112),
(5, 'Los hermanos Karamázov', 'The Russian Messenger', 'Fiódor Dostoievski', '1880-01-01', 824);

INSERT INTO Biblioteca (idUsuario, idLibro) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);