
-- GENRES
INSERT INTO Genero (Id, Name) VALUES 
(1, 'Fantasia'),
(2, 'Clásicos'),
(3, 'Infantil'),
(4, 'Distopico'),
(5, 'Aventura'),
(6, 'Realismo Mágico'),
(7, 'Novela'),
(8, 'Ciencia Ficción');

-- BOOKS
-- Mapped from books.json and previous SQL data
-- Columns: Id, GenreId, Title, Publisher, Author, CreatedAt, PageCount, Description, Image, Url
INSERT INTO Libro (Id, GenreId, Title, Editorial, Author, CreatedAt, PageCount, Description, Image, Url) VALUES
(1, 2, 'Don Quijote de la Mancha', 'Francisco de Robles', 'Miguel de Cervantes', '1605-01-16', 863,
'La historia narra las aventuras del hidalgo Don Quijote, quien enloquece tras leer libros de caballerías y decide convertirse en caballero andante.',
'https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg',
'https://cvc.cervantes.es/literatura/lee/coleccion/pdf/quijote.pdf'),

(2, 8, '1984', 'Secker & Warburg', 'George Orwell', '1949-06-08', 328,
'Una novela distópica que describe un régimen totalitario centrado en la vigilancia y el control social.',
'https://images.cdn2.buscalibre.com/fit-in/360x360/3a/2c/3a2c227d11a1026b4aa3d45d33bad4f6.jpg',
'https://www.philosophia.cl/biblioteca/orwell/1984.pdf'),

(3, 2, 'Hamlet', 'Nicholas Ling', 'William Shakespeare', '1603-07-26', 160,
'Tragedia sobre el príncipe Hamlet, quien busca vengar la muerte de su padre enfrentando dilemas de moral, locura y traición.',
'https://estacionlibro.com.ar/files/tmp/uncompressed/ofo7svijlay55cb3n1qz.jpg',
'https://www.suneo.mx/literatura/subidas/William%20Shakespeare%20Hamlet.pdf'),

(4, 5, 'Crimen y castigo', 'The Russian Messenger', 'Fiódor Dostoievski', '1866-01-01', 671,
'Un drama psicológico sobre Raskólnikov, un estudiante que comete un crimen y lucha con la culpa y su necesidad de redención.',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8s4H8_NH27XyD4Awip32AZZo8YQ97aNyY-Q&s',
'https://roscuba.ru/images/pdf/crimen_y_castigo_fiodor_dostoievski_es.pdf'),

(5, 2, 'La Odisea', 'Antigua Grecia', 'Homero', '0700-01-01', 500,
'Poema épico que narra el regreso de Odiseo tras la Guerra de Troya enfrentando criaturas, dioses y desafíos.',
'https://www.gutenberg.org/cache/epub/58221/images/cover.jpg',
'https://www.mendoza.edu.ar/wp-content/uploads/2020/04/La-Odisea-de-Homero.pdf'),

(6, 7, 'Orgullo y prejuicio', 'T. Egerton', 'Jane Austen', '1813-01-28', 279,
'Historia romántica y satírica sobre Elizabeth Bennet y el señor Darcy donde se exploran prejuicios y diferencias sociales.',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKF3cJiYh7KqmeEA5SMFlk4-8Qgz0ApbVbAQ&s',
'https://web.seducoahuila.gob.mx/biblioweb/upload/orgullo_y_prejuicio.pdf'),

(7, 7, 'Guerra y paz', 'The Russian Messenger', 'León Tolstói', '1869-01-01', 1225,
'Relato épico que retrata la invasión napoleónica y la vida aristocrática rusa a través de varias familias.',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGyR--7yiQk0hNJa7DWC7ubPsEX1ledju5g&s',
'https://casacanal.es/Materiales/biblioteca/clasicosesp/Le%C3%B3n%20Tolstoi/Guerra%20y%20Paz.pdf'),

(8, 2, 'Macbeth', 'Thomas Creede', 'William Shakespeare', '1606-01-01', 85,
'Una tragedia sobre la ambición, la culpa y las consecuencias del poder tras el ascenso y caída de Macbeth.',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew7-hy1mLd6jI1LSJGrtN2MH3Q-E0Q7bDZA&s',
'https://www.suneo.mx/literatura/subidas/Willam%20Shakespeare%20%20Macbeth.pdf'),

(9, 5, 'Los hermanos Karamázov', 'The Russian Messenger', 'Fiódor Dostoievski', '1880-01-01', 824,
'Reflexión filosófica sobre la moral, la fe y el libre albedrío a través del conflicto entre los hermanos Karamázov.',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOK3UtgIk7IhMQJUZvvDMH-ISJ673ryqdzXQ&s',
'https://www.argentina.gob.ar/sites/default/files/los_hermanos_karamazov_dostoyevski.pdf');
