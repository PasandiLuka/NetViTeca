-- USERS
INSERT INTO Usuario (Id, FullName, Username, Email, Password, Phone) VALUES 
(1, 'Lucca Pazanddi', 'LUKITA7956', 'lukita@gmail.com', Sha2('luka1234', 256), '1123456789'),
(2, 'Sebaz Serpa', 'SEBITA7956', 'sebita@gmail.com', Sha2('seba1234', 256), '1231234324');

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
'https://upload.wikimedia.org/wikipedia/commons/6/6b/Quijote_1855.jpg',
'https://cvc.cervantes.es/literatura/lee/coleccion/pdf/quijote.pdf'),

(2, 8, '1984', 'Secker & Warburg', 'George Orwell', '1949-06-08', 328,
'Una novela distópica que describe un régimen totalitario centrado en la vigilancia y el control social.',
'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
'https://www.ciudadseva.com/texto/1984/'),

(3, 2, 'Hamlet', 'Nicholas Ling', 'William Shakespeare', '1603-07-26', 160,
'Tragedia sobre el príncipe Hamlet, quien busca vengar la muerte de su padre enfrentando dilemas de moral, locura y traición.',
'https://upload.wikimedia.org/wikipedia/commons/2/20/Hamlet_Q1_title_page.jpg',
'https://www.gutenberg.org/files/1524/1524-pdf.pdf'),

(4, 5, 'Crimen y castigo', 'The Russian Messenger', 'Fiódor Dostoievski', '1866-01-01', 671,
'Un drama psicológico sobre Raskólnikov, un estudiante que comete un crimen y lucha con la culpa y su necesidad de redención.',
'https://upload.wikimedia.org/wikipedia/commons/4/47/Crimeandpunishmentcover.png',
'https://www.gutenberg.org/cache/epub/2554/pg2554-pdf.pdf'),

(5, 2, 'La Odisea', 'Antigua Grecia', 'Homero', '0700-01-01', 500,
'Poema épico que narra el regreso de Odiseo tras la Guerra de Troya enfrentando criaturas, dioses y desafíos.',
'https://upload.wikimedia.org/wikipedia/commons/5/5a/Francesco_Hayez_1813_Odisseo_nella_grotta_di_Polimemo.jpg',
'https://www.gutenberg.org/cache/epub/1727/pg1727-pdf.pdf'),

(6, 7, 'Orgullo y prejuicio', 'T. Egerton', 'Jane Austen', '1813-01-28', 279,
'Historia romántica y satírica sobre Elizabeth Bennet y el señor Darcy donde se exploran prejuicios y diferencias sociales.',
'https://upload.wikimedia.org/wikipedia/commons/1/15/Title_page_of_Pride_and_Prejudice%2C_the_first_edition.jpg',
'https://www.gutenberg.org/files/1342/1342-pdf.pdf'),

(7, 7, 'Guerra y paz', 'The Russian Messenger', 'León Tolstói', '1869-01-01', 1225,
'Relato épico que retrata la invasión napoleónica y la vida aristocrática rusa a través de varias familias.',
'https://upload.wikimedia.org/wikipedia/commons/4/4f/War-and-peace_1873.jpg',
'https://www.gutenberg.org/cache/epub/2600/pg2600-pdf.pdf'),

(8, 2, 'Macbeth', 'Thomas Creede', 'William Shakespeare', '1606-01-01', 85,
'Una tragedia sobre la ambición, la culpa y las consecuencias del poder tras el ascenso y caída de Macbeth.',
'https://upload.wikimedia.org/wikipedia/commons/7/7c/Macbeth_first_folio.jpg',
'https://www.gutenberg.org/files/1533/1533-pdf.pdf'),

(9, 5, 'Los hermanos Karamázov', 'The Russian Messenger', 'Fiódor Dostoievski', '1880-01-01', 824,
'Reflexión filosófica sobre la moral, la fe y el libre albedrío a través del conflicto entre los hermanos Karamázov.',
'https://upload.wikimedia.org/wikipedia/commons/d/d2/The_Brothers_Karamazov.jpg',
'https://www.gutenberg.org/cache/epub/28054/pg28054-pdf.pdf');

-- LIBRARY
INSERT INTO Biblioteca (UserId, BookId) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);