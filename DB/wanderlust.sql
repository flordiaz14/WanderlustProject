SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET SQL_SAFE_UPDATES = 0;
-- -----------------------------------------------------
-- Schema wanderlust
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `wanderlust`;
CREATE SCHEMA IF NOT EXISTS `wanderlust`;
USE `wanderlust`;

-- -----------------------------------------------------
-- Table `wanderlust`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `url_image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_title` (`title` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`cities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `state` VARCHAR(80) NOT NULL,
  `country` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description_title` VARCHAR(250) NOT NULL,
  `description` VARCHAR(1500) NOT NULL,
  `direction` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `map` VARCHAR(500) NULL DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `category_id` BIGINT NOT NULL,
  `city_id` BIGINT NOT NULL,
  `politics_id` BIGINT NULL DEFAULT NULL,
  `created_by` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_idx` (`category_id` ASC) VISIBLE,
  INDEX `city_idx` (`city_id` ASC) VISIBLE,
  INDEX `product_has_politics` (`politics_id` ASC) VISIBLE,
  CONSTRAINT `category`
    FOREIGN KEY (`category_id`)
    REFERENCES `wanderlust`.`categories` (`id`),
  CONSTRAINT `city`
    FOREIGN KEY (`city_id`)
    REFERENCES `wanderlust`.`cities` (`id`),
  CONSTRAINT `product_has_politics`
    FOREIGN KEY (`politics_id`)
    REFERENCES `wanderlust`.`policies` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100),
  `role_id` INT NOT NULL,
   `validate` BIT,
  PRIMARY KEY (`id`),
  INDEX `rol_id_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `users_has_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `wanderlust`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`bookings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `start_time` VARCHAR(10) NOT NULL,
  `start_date` DATE NOT NULL,
  `finish_date` DATE NOT NULL,
  `product_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `product_has_bookings`
    FOREIGN KEY (`product_id`)
    REFERENCES `wanderlust`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_has_bookings`
    FOREIGN KEY (`user_id`)
    REFERENCES `wanderlust`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `wanderlust`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`features` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`features_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`features_products` (
  `products_id` BIGINT NOT NULL,
  `features_id` BIGINT NOT NULL,
  PRIMARY KEY (`products_id`, `features_id`),
  INDEX `fk_products_has_features_features1_idx` (`features_id` ASC) VISIBLE,
  INDEX `fk_products_has_features_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_features_features1`
    FOREIGN KEY (`features_id`)
    REFERENCES `wanderlust`.`features` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_products_has_features_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `wanderlust`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wanderlust`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `product_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `UK_url` (`url` ASC) VISIBLE,
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `product_has_images`
    FOREIGN KEY (`product_id`)
    REFERENCES `wanderlust`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `wanderlust`.`rates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`rates` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `rate` DOUBLE NOT NULL,
  `product_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `product_has_rates`
    FOREIGN KEY (`product_id`)
    REFERENCES `wanderlust`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `wanderlust`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`favorites` (
  `products_id` BIGINT NOT NULL,
  `users_id` BIGINT NOT NULL,
  PRIMARY KEY (`products_id`, `users_id`),
  INDEX `fk_products_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_products_has_users_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `wanderlust`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_products_has_favorites1`
    FOREIGN KEY (`products_id`)
    REFERENCES `wanderlust`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `wanderlust`.`policies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`policies` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `wanderlust`.`cancellation_policies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`cancellation_policies` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `policies_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `policies_has_cancellation_policies` (`policies_id` ASC) VISIBLE,
  CONSTRAINT `policies_has_cancellation_policies`
    FOREIGN KEY (`policies_id`)
    REFERENCES `wanderlust`.`policies` (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `wanderlust`.`rules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`rules` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `policies_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `policies_has_rules` (`policies_id` ASC) VISIBLE,
  CONSTRAINT `policies_has_rules`
    FOREIGN KEY (`policies_id`)
    REFERENCES `wanderlust`.`policies` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wanderlust`.`security_politics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wanderlust`.`security_politics` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `policies_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `policies_has_security_politics` (`policies_id` ASC) VISIBLE,
  CONSTRAINT `policies_has_security_politics`
    FOREIGN KEY (`policies_id`)
    REFERENCES `wanderlust`.`policies` (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- INSERCION DE DATOS
-- -----------------------------------------------------
-- Tabla categories
-- -----------------------------------------------------
INSERT INTO categories (id, title, description,url_image) VALUES 
(DEFAULT, 'Hoteles', 'Sentirte en casa ya es un hecho. ¡Elegí el hotel ideal!','https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
(DEFAULT, 'Hostels', 'Viví nuevas experiencias en comunidad al mejor precio.' ,'https://images.unsplash.com/photo-1445991842772-097fea258e7b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'),
(DEFAULT, 'Glampings','Disfrutá la naturaleza, acampando con todo el glamour.' ,'https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
(DEFAULT, 'Resorts','Relajarte y divertirte en el mismo lugar es posible. ¡Elegí tu mejor opción!'  ,'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170');

-- -----------------------------------------------------
-- Tabla features
-- -----------------------------------------------------
INSERT INTO features (icon,name) VALUES
('air','Aire Acondicionado'),
('car','Estacionamiento gratuito'),
('check','Check in'),
('creditcard','Acepta tarjetas de crédito'),
('pool','Pileta'),
('kitchen','Cocina'),
('noParty','Prohibido hacer fiestas'),
('pet','Se aceptan mascotas'),
('smockingOff','Prohibido fumar'),
('tv','Televisión'),
('wifi','Wifi');

-- -----------------------------------------------------
-- Tabla cities
-- -----------------------------------------------------
INSERT INTO cities (name,state,country) VALUES
('San Carlos de Bariloche','Rio Negro','Argentina'),
('Cafayate','Salta','Argentina'),
('San Carlos','Salta','Argentina'),
('Ciudad Autonoma de Buenos Aires','Buenos Aires','Argentina'),
('San Antonio de Areco','Buenos Aires','Argentina'),
('San Telmo','Buenos Aires','Argentina'),
('Lobos','Buenos Aires','Argentina'),
('San Rafael','Mendoza','Argentina'),
('Malargüe','Mendoza','Argentina'),
('Río Cuarto','Cordoba','Argentina'),
('Carhué','Buenos Aires','Argentina');


INSERT INTO `policies` (`id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20);



-- -----------------------------------------------------
-- Tabla products
-- -----------------------------------------------------

INSERT INTO products (name, description_title, description ,direction,location,map,capacity, category_id, city_id,politics_id,created_by) VALUES
('Llao Llao Resort','El hotel más exclusivo de la Patagonia argentina','Enmarcado por los picos de los cerros López y Tronador y los lagos Moreno y Nahuel Huapi, Llao Llao cuenta con un gran parque de 15 hectáreas integrando al campo de golf de 18 hoyos, marina, playa, solarium, piscina climatizada interna y externa tipo infinity, Spa y Health Club con sauna, Fitness Center y otras actividades recreativas. En el diseño interior se utilizaron materiales originales tales como la madera de ciprés y pino hemlock, trabajados en tablas y en medios rústicos. El Resort cuenta con dos alas: Ala Bustillo y Ala Moreno. La primera posee 162 habitaciones de las cuales 11 son Studios y 12 son Suites con vista a los lagos Moreno, Nahuel Huapi y cerro López. El Ala Moreno dispone de 43 Studios y Suites de Lujo: 23 Studios Lago Moreno de Lujo, 17 Suites Lago Moreno de Lujo, 2 Master Suites Lago Moreno de Lujo y 1 Suite Royal Lago Moreno de Lujo. Llao Llao posee cuatro restaurants, para disfrutar de la más variada propuesta gastronómica, ya sea cocina internacional y típica de primer nivel, como nuestro afamado Té Llao Llao enmarcado en una espectacular vista a los jardines del Resort y al Lago Nahuel Huapi.','Av. Ezequiel Bustillo, Km 25','A 20,3 Km del centro','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5195706269214!2d-71.53345224985695!3d-41.05763417919418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a886f9dea0175%3A0x3a42b93d77aef41f!2sLlao%20Llao%20Hotel%20%26%20Resort!5e0!3m2!1ses!2sar!4v1654610923888!5m2!1ses!2sar',10,4,1,1,2),
('Crans Montana','Una experiencia de 3 estrellas al precio de 1 estrella','Situado a menos de cinco minutos del Lago Nahuel Huapi se encuentra el Crans Montana, un hotel de 3 estrellas de ambiente agradable emplazado en una moderna edificación de ocho plantas. Dispone de habitaciones con decoración sencilla, muebles de diseño y suelo de parquet. Incluyen sistema de calefacción centralizada, televisor con canales por cable, caja de seguridad y minibar, así como baño propio con secador de cabello. El hotel Crans Montana tiene escuela de esquí, además de terraza con solárium, sala de juegos, espacios para reuniones y eventos con centro de negocios, área de ocio infantil y recepción 24 horas con consigna de equipaje y guardaesquís. Hay conexión wifi gratuita, servicio de traslados y servicio de videovigilancia. A diario se sirve un completo desayuno buffet en el hotel, que cuenta también con un restaurante y un bar de cócteles y aperitivos. La Catedral de Nuestra Señora del Nahuel Huapi queda a menos de 200 metros.','Palacios 140','1,3 km del centro de la ciudad','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12020.225184091836!2d-71.303816!3d-41.133297!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x94576392472968e6!2sHotel%20Crans%20Montana!5e0!3m2!1ses-419!2sar!4v1654575299787!5m2!1ses-419!2sar',10,1,1,2,2),
('Esencia Glamping','Experiencias únicas a viajeros de todo el mundo que llegan a la Patagonia argentina en busca de nuevos momentos','Esta propuesta incluye diferentes modelos de hospedaje, según la locación y la categoría. Hay “bell tents” de cuatro o seis metros de diámetro que se utilizan para los campamentos nómades (“pop-up”). Pueden funcionar como habitación single o familiar con una cama matrimonial y una o dos singles. La estética es de safari africano, ideal además para festivales y casamientos. Los domos geodésicos también están preparados para campamentos nómades: son carpas portátiles cien por ciento impermeables que tienen calefacción de tiro balanceado, piso y doble tela. También hay “domos pop-up” que se arman en 45 minutos y cuentan con ventilación de alta montaña. Son domos cuatro estaciones para expediciones, ideales para glampings en cualquier circunstancia.','El Tero 380','A 12 Km del lago Perito Moreno','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.0241572864156!2d-71.43680568458274!3d-41.1121634792904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a712bfda390a3%3A0x14d0a158036c6e38!2sEl%20Tero%20380%20r8400%2C%20San%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses-419!2sar!4v1654566030206!5m2!1ses-419!2sar',10,3,1,3,5),
('La Justina Hostel','Tu casa, lejos de casa','Este alojamiento está a 10 minutos a pie de la playa. A solo 5 manzanas del centro de Bariloche y a 6 manzanas del pintoresco lago Nahuel Huapi, el albergue La Justina ofrece bonitos alojamientos de estilo rural bien decorados, con muebles de madera rústica y conexión inalámbrica a internet gratuita.','Quaglia 726','A 5 cuadras del centro de la ciudad','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.7707893576517!2d-71.31365337185989!3d-41.13952941303905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b6c95df2e3b%3A0xa19b16caa7f143ff!2sLa%20Justina%20Hostel!5e0!3m2!1ses-419!2sar!4v1654572006796!5m2!1ses-419!2sar',10,2,1,4,5),
('Wine Resort Viñas ','Donde cada estancia es única','Viñas de Cafayate Wine Resort está localizado en Cafayate. Ofrece piscina al aire libre todo el año, wi-fi gratis en zonas comunes y estacionamiento gratis, así como valet parking. El alojamiento sirve diariamente el desayuno, el cual se ofrece en el restaurante. También dispone de bar. El personal de la propiedad proporcionará servicio a la habitación. Entre las comodidades se destacan servicio de guarda-equipaje gratis, recepción de paquetes gratis, sala de reuniones y tiendas en la propiedad. Los huéspedes también podrán disfrutar de jardín y solárium. Por un costo adicional, la propiedad cuenta con servicio de traslado al aeropuerto, servicio de traslado en los alrededores y servicio de lavandería.','25 de Mayo, Camino al Divisadero. Fca. Calchaquí S/N','A 3 km de la plaza principal','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14334.767515107058!2d-66.0023956!3d-26.0763244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x943895647f70bc64!2sWine%20Resort%20Vi%C3%B1as%20de%20Cafayate!5e0!3m2!1ses-419!2sar!4v1654611554729!5m2!1ses-419!2sar',10,4,2,5,5),
('Grace Cafayate','Descubre cómo se sienten las estrellas con el mejor servicio en el Grace Cafayate','El Grace Cafayate ofrece pileta al aire libre y pileta cubierta y está situado en Cafayate, rodeado por viñedos preciosos y con vistas panorámicas a los Andes. Además, proporciona wifi gratis y se encuentra a 2 km del centro de la localidad. Las habitaciones disponen de TV de pantalla plana con canales vía satélite, aire acondicionado, terraza, baño privado con ducha, bata de baño y secador de pelo y minibar. Algunas de ellas tienen vistas a las montañas. El Grace Cafayate cuenta con spa, restaurante gourmet a la carta, abierto en determinados días y a horas concretas, mostrador de información turística, consigna de equipaje y servicio de planchado. En las inmediaciones se pueden practicar diversas actividades, como equitación. Este hotel de lujo también alberga una enoteca, un bar junto a la pileta y un jardín. El alojamiento se encuentra a 2,7 km de los viñedos de Cafayate y a 14 km de los viñedos de San Carlos.','Ruta Nacional 40, km 4340, 4427','A 2,3 km del centro','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14333.744490315206!2d-65.957283!3d-26.0846786!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfd43bc411a1c8ae6!2sGrace%20Cafayate%20Hotel!5e0!3m2!1ses-419!2sar!4v1654573658800!5m2!1ses-419!2sar',10,1,2,6,2),
('Siilu Wasi Glamping','Reconectar con la naturaleza y la paz del silencio','Esta propuesta busca combinar la aventura de acampar con la comodidad de una habitación de hotel. Cada uno de sus domos cuenta con baño privado, frigobar, pava eléctrica, aire acondicionado, equipo de mate, mesa, reposeras y hamaca paraguaya.','Ruta Nacional 40, Payogastilla. Valles Cachaquíes. Km. 4392, 4427','A 50 km de Cafayate','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14380.110531929313!2d-66.0235288!3d-25.7035091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x19c793f2ec3c28fc!2sSiilu%20Wasi!5e0!3m2!1ses-419!2sar!4v1654567784421!5m2!1ses-419!2sar',3,3,3,7,2),
('Hostal Andino','Una aventura en Cafayate','Disponemos de una infraestructura excelente que hará de su estadía un momento inolvidable. Además de ofrecer distancias cortas a los atractivos turísticos que lo trasladarán al interior de nuestra cultura. Contamos con amplias salas equipadas con todos los equipos necesarios para poder organizar eventos o reuniones. También, ofrecemos a nuestros huéspedes, una hermosa piscina para disfrutar bajo el sol de los Valles. Déjese sorprender por nuestros servicios y atenciones, mientras disfruta de cada rincón de Cafayate.','San Carlos 80','A solo 300 m de la plaza principal','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.8282124647862!2d-65.97336438510587!3d-26.071870083496826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941f316bbc9882db%3A0x18ee2e880a4503b7!2sHostal%20Andino!5e0!3m2!1ses-419!2sar!4v1654571979833!5m2!1ses-419!2sar',10,2,2,8,5),
('Amerian Buenos Aires Park Hotel','Confort y la mejor ubicación en el corazón de la ciudad','Amérian Park Hotel Buenos Aires cuenta con 152 habitaciones, salones para eventos y convenciones y ofrece todos los servicios y comodidades orientados a satisfacer las necesidades de sus huéspedes en sus viajes de negocios o placer. Además, Amérian Buenos Aires Park Hotel tiene en su desayunador con alimentos aptos para celíacos y a la carta americano. Es un hotel que cuida de sus huéspedes y del medio ambiente con su certificación Bronce de Hoteles Más Verdes.','Reconquista 699, esq. Viamonte. Bº San Nicolás','A 1,8 Km del Obelisco','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105093.4920288014!2d-58.442496009927325!3d-34.59982139029047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb591facb5%3A0xcea7d8b90c3adef7!2sAmerian%20Buenos%20Aires%20Park%20Hotel!5e0!3m2!1ses-419!2sar!4v1654574339088!5m2!1ses-419!2sar',10,1,4,9,5),
('Pampas de Areco','Estilo, comodidad y hospitalidad','Ubicado estratégicamente en la llanura pampeana, a pocos minutos del casco histórico de San Antonio de Areco, una de las poblaciones más antiguas y tradicionales de la región, y a solo 90 minutos de la Ciudad de Buenos Aires ,convierte a Pampas de Areco Resort & Spa en un punto de encuentro entre la tradición y el placer. Posee una imagen tradicional y majestuosa, con proporciones clásicas y generosas, propias del estilo neocolonial.','Ruta Provincial N° 41, km 271 (7116)','A 7 km del centro de San Antonio de Areco','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3295.529606182142!2d-59.48868678490039!3d-34.31152958053614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bbeb443d4c5525%3A0x3bbf16c2cb93cc3c!2sPampas%20de%20Areco%20Hotel%20%26%20Spa!5e0!3m2!1ses-419!2sar!4v1654561758424!5m2!1ses-419!2sar',10,4,5,10,5),
('Puerto Limón ','Vení a sumar aventuras y amistades','Puerto Limón, está en San Telmo, el barrio bohemio de Buenos Aires. Desde hace algo más de 10 años recibimos viajeros de todas partes del mundo. Este año nos renovamos para generar un espacio de interacción social más cómodo y amplio. Aquí pasa todo, encuentros, asado, coworking, noches de cerveza artesanal, conversaciones apasionadas sobre futbol, amores y sueños compartidos. Nos gustaría invitarte a que nos visites y sientas Puerto Limón, uno de tus lugares favoritos del planeta. Veni... te va gustar.','Chacabuco 1080','A 2 km del Obelisco','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13133.403917376738!2d-58.3756898!3d-34.6205698!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xab5784d4b9c1db70!2sPuerto%20Lim%C3%B3n%20Hostel!5e0!3m2!1ses-419!2sar!4v1654571937981!5m2!1ses-419!2sar',10,2,6,11,2),
('Refugio Natural Glamping','Disfrutá de la naturaleza en la ciudad','Carpas de lujo con la comodidad de un hotel, acampe tradicional, deportes náuticos, pesca, cabalgatas, rural bike, naturaleza, fogones y una cervecería con una vista inigualable del atardecer sobre la laguna de Lobos. Refugio Glamping es el lugar de escapada más cercano donde podrás encontrar tranquilidad absoluta y contacto real con lo natural.','Avenida nº 5','A 6 km del Parador Fotográfico de Lobos','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.543177141302!2d-59.13686938475172!3d-35.29248258028679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bda7a54536051d%3A0x1d90b97d9a7aa468!2sREFUGIO%20-%20Natural%20Glamping!5e0!3m2!1ses-419!2sar!4v1654567543838!5m2!1ses-419!2sar',10,3,7,12,2),
('Valle Grande','Conectate con la naturaleza del valle','Ubicado a 30 Km de la ciudad de San Rafael, en el Valle Grande del Cañón del Atuel, nuestro hotel está emplazado a la vera del rio. 700 metros de costa maravillosa y cautivante. Un predio de 2,5 hectáreas equilibradamente distribuido que cuenta con lugares de servicios, esparcimiento, comida, recreación y alojamiento. Un edificio de montaña cálido y confortable destinado a que te desconectes de tu rutina y puedas conectarte sólo con la naturaleza. Personal calificado, entrenado y servicial, pendiente de tus necesidades y deseos. Un restaurante con cocina típica y vinos autóctonos dispuesto para tu disfrute. Actividades de turismo aventura contratadas a prestadores de confianza destinadas a formar recuerdos y vivencias inolvidables.','Ruta 173 km 35, Valle Grande, Cañon del Atuel','A 30 km del centro de la ciudad','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13101.543911739325!2d-68.5092012!3d-34.8213868!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfff1d360e2df98c2!2sHotel%20Valle%20Grande!5e0!3m2!1ses-419!2sar!4v1654580902022!5m2!1ses-419!2sar',10,4,8,13,2),
('Termas de Cacheuta','Viví la naturaleza desde las montañas mendocinas','Rodeado por la Cordillera de los Andes y por las aguas del Río Mendoza, Termas Cacheuta Hotel & Spa Termal es un destino tradicional de la provincia de Mendoza. El Hotel & Spa Termal cuenta con 16 habitaciones con baño con agua termal, calefacción y todo lo necesario para que nuestros huéspedes disfruten de su estadía desconectándose del mundo para relajarse y encontrarse a uno mismo. Su ubicación privilegiada y su exclusivo Spa Termal constituyen su principal atractivo. Son más de 10 piletones de piedra junto al río con diferentes temperaturas e hidroterapias los que invitan a disfrutar en contacto con la naturaleza. La Fango Terapia y la Gruta complementan y hacen de su Spa Termal un lugar único.','Ruta Provincial Nº 82, KM 38','A 5 km de la ciudad','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.4200783588235!2d-69.11672118481187!3d-33.01906158089962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967de863d948ffff%3A0x4346965ddb40b015!2sHotel%20%26%20Spa%20Termas%20Cacheuta!5e0!3m2!1ses-419!2sar!4v1654575079306!5m2!1ses-419!2sar',10,1,8,14,2),
('Real del Pehuenche','Viví la montaña','Construido con Domos Geodésicos, energía solar y un diseño funcional, Real del Pehuenche hará de tu estadía en la cordillera del límite, una experiencia única. Nuestro equipo, altamente capacitado, brindará la seguridad necesaria para realizar actividades de montaña todo el año. Confort y el servicio personalizado, para que te sientas a gusto.','Ruta Nacional 145 Kilómetro 72','A 34 Km de Las Loicas','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.232679943643!2d-70.38285458528156!3d-35.96573643833339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967a7f9add34eeb3%3A0xc4f13bc0c236e128!2sReal%20del%20Pehuenche!5e0!3m2!1ses!2sar!4v1654651148568!5m2!1ses!2sar',10,3,9,15,5),
('Sigrum Hostel','Con la mejor atención, para disfrutar en familia','El SIGRUM está situado en San Rafael, a 500 metros de la plaza central de San Martín, y ofrece alojamiento con salón compartido, aparcamiento privado gratuito, jardín y zona de barbacoa. Ofrece servicio de habitaciones y terraza. El alojamiento cuenta con recepción 24 horas, servicio de enlace con el aeropuerto, cocina compartida y conexión WiFi gratuita en todas las instalaciones. Este albergue sirve un desayuno continental. El SIGRUM se encuentra a 2,3 km del parque Hipólito Yrigoyen y a 27 km del valle Grande. El aeropuerto más cercano es el de San Rafael, ubicado a 7 km del alojamiento. ¡Hablamos tu idioma!','San Juan 155','A 7 Km del aeropuerto San Rafael','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8643934428806!2d-68.32918119285739!3d-34.607590424685284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9679077f4ffb3b2d%3A0xd8bc2fa57dd08c1d!2sHostel%20Sigrum!5e0!3m2!1ses!2sar!4v1654572948045!5m2!1ses!2sar',10,2,8,16,5),
('Unique Executive Central','Vive una experiencia inolvidable','Ubicado a metros del prestigioso Teatro Colón y cercano a la calle Florida, la peatonal turística por excelencia en Bs. As. Con buen acceso a los aeropuertos nacional e internacional, así como también a las líneas de subtes de la ciudad. El hotel ofrece servicio de desayuno y habitaciones luminosas y amplias. Su decoración combina diseño, arte y modernidad en todas sus instalaciones brindando una experiencia única para sus huéspedes. Las habitaciones cuentan con TV LCD por cable, teléfono, aire acondicionado frío/calor individual, baño con bañera, secador de cabello y kit de baño, cofre de seguridad, y acceso a Internet de alta velocidad sin cargo.','Diagonal Norte Roque Saenz Peña 1178','A metros del Obelisco','https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6568.085696215379!2d-58.383300000000006!3d-34.603078!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac5ff068017%3A0xd6a504766f44a2e7!2sAv.%20Pres.%20Roque%20S%C3%A1enz%20Pe%C3%B1a%201178%2C%20C1012%20CABA%2C%20Argentina!5e0!3m2!1sen!2sin!4v1655265336208!5m2!1sen!2sin',10,1,4,17,5),
('Palermo Bridge','Espacios unicos. Lugares de encuentros','El Palermo Bridge ofrece servicio de conserjería, habitaciones hipoalergénicas, salón compartido, wifi gratis en todas las instalaciones y jardín. El alojamiento se encuentra a 1,8 km de los jardines japoneses de Buenos Aires, a 1,9 km de la plaza Serrano y a 2,9 km del Museo de Arte Latinoamericano de Buenos Aires (MALBA). Hay recepción 24 horas, servicio de cambio de divisa y cocina compartida. Las habitaciones disponen de aire acondicionado, escritorio, hervidor de agua, heladera, minibar, caja fuerte, TV de pantalla plana, balcón y baño privado con bidet. Todas las habitaciones del Palermo Bridge incluyen ropa de cama y toallas. Cerca del alojamiento hay varios lugares de interés, como el parque ecológico de Buenos Aires, el parque El Rosedal y los Bosques de Palermo. El aeropuerto Jorge Newbery, situado a 3 km del Palermo Bridge, es el más cercano. Se proporciona servicio de link con el aeropuerto por un adicional. Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes.','Godoy Cruz 2782','A 1,3 Km de los lagos de Palermo','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.041689649898!2d-58.42691028533472!3d-34.577811663633696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59b0c69615b%3A0x471b20b97677bcce!2sPalermo%20Bridge!5e0!3m2!1ses!2sar!4v1655267302182!5m2!1ses!2sar',10,1,4,18,2),
('Suipacha Suites','Una experiencia de lujo','El Hotel Suipacha Suites es un alojamiento de 4 estrellas situado en Buenos Aires Capital Federal, en una de sus zonas privilegiadas, a un corto paseo del microcentro, del Obelisco y de Puerto Madero. Su emplazamiento ofrece una doble ventaja: la proximidad a todo y el alejamiento de los congestionamientos urbanos. Ofrece una amplia variedad de habitaciones decoradas con materiales finos, ambiente cómodo y una buena dotación de prestaciones, que incluye aire acondicionado, calefacción, cuarto de baño con aseo, ducha y secador de pelo, ropa de cama, televisión y, en algunos casos, cocina con menaje, microondas y frigorífico. El restaurante del hotel ofrece platos regionales, especialmente carnes argentinas, pastas y truchas, así como vinos de algunas de las mejores bodegas del país. En sus instalaciones, además, hay alquiler de coches, climatización en los espacios comunes, ascensores, jardín y una eficiente recepción 24 horas al día, así como tareas de lavandería y limpieza en seco.','Suipacha 1235, Retiro','A pocas calles del microcentro','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.415806031365!2d-58.38213618477059!3d-34.59364568046209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3e72f54292456d03!2zMzTCsDM1JzM3LjEiUyA1OMKwMjInNDcuOCJX!5e0!3m2!1ses!2sar!4v1655268217639!5m2!1ses!2sar',10,1,4,19,2),
('Sarmiento Palace Hotel','La mejor opcion para su estadia','El Sarmiento Palace Hotel dispone de centro de fitness y de terraza con bañera de hidromasaje. Ofrece conexión WIFI gratis y sirve un desayuno buffet diario. Las habitaciones del Hotel Sarmiento Palace cuentan con aire acondicionado y suelo de moqueta. Algunas de ellas tienen bañera de hidromasaje y TV de pantalla plana. Además, alberga un bar y zona de parrilla compartida, así como terraza en la azotea con bañera de hidromasaje.','Sarmiento 1953','A 1 Km del Obelisco','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.938280722793!2d-58.396652285333644!3d-34.605722165110095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac1fdf03c41%3A0xcc527f9a21e5dc7f!2sSarmiento%20Palace%20Hotel!5e0!3m2!1ses!2sar!4v1655269222781!5m2!1ses!2sar',10,1,4,20,2);


-- -----------------------------------------------------
-- Tabla features_products
-- -----------------------------------------------------
INSERT INTO `features_products` (`products_id`,`features_id`) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,10),
(1,11),
(2,1),
(2,2),
(2,3),
(2,4),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(3,2),
(3,3),
(3,4),
(3,8),
(4,1),
(4,4),
(4,6),
(4,7),
(4,9),
(4,10),
(4,11),
(5,1),
(5,2),
(5,3),
(5,4),
(5,5),
(5,6),
(5,9),
(5,10),
(5,11),
(6,1),
(6,2),
(6,3),
(6,4),
(6,5),
(6,6),
(6,7),
(6,8),
(6,10),
(6,11),
(7,2),
(7,4),
(7,7),
(7,8),
(7,10),
(8,1),
(8,2),
(8,4),
(8,6),
(8,7),
(8,8),
(8,9),
(8,10),
(8,11),
(9,1),
(9,2),
(9,3),
(9,4),
(9,5),
(9,6),
(9,7),
(9,10),
(9,11),
(10,1),
(10,2),
(10,3),
(10,4),
(10,5),
(10,6),
(10,7),
(10,10),
(10,11),
(11,2),
(11,4),
(11,5),
(11,6),
(11,7),
(11,10),
(11,11),
(12,2),
(12,4),
(12,7),
(12,8),
(12,10),
(13,1),
(13,2),
(13,3),
(13,4),
(13,5),
(13,6),
(13,7),
(13,9),
(13,10),
(13,11),
(14,1),
(14,2),
(14,3),
(14,4),
(14,5),
(14,6),
(14,8),
(14,10),
(14,11),
(15,2),
(15,4),
(15,7),
(15,8),
(15,10),
(16,1),
(16,4),
(16,6),
(16,7),
(16,10),
(16,11),
(17,1),
(17,2),
(17,3),
(17,4),
(17,6),
(17,7),
(17,8),
(17,9),
(17,10),
(17,11),
(18,1),
(18,2),
(18,3),
(18,4),
(18,6),
(18,7),
(18,8),
(18,9),
(18,10),
(18,11),
(19,1),
(19,2),
(19,3),
(19,4),
(19,6),
(19,7),
(19,8),
(19,9),
(19,10),
(19,11),
(20,1),
(20,2),
(20,3),
(20,4),
(20,6),
(20,7),
(20,8),
(20,9),
(20,10),
(20,11);


-- -----------------------------------------------------
-- Tabla rates
-- -----------------------------------------------------

INSERT INTO `rates` (`rate`,`product_id`) VALUES
(5,1),
(3,2),
(3,3),
(3,4),
(4,5),
(4,6),
(3,7),
(3,8),
(4,9),
(3,10),
(3,11),
(4,12),
(4,13),
(4,14),
(4,15),
(5,16);
-- -----------------------------------------------------
-- Tabla images
-- -----------------------------------------------------

INSERT INTO images (title, url, product_id) VALUES
('llaollao-resort-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/llaollao-resort-bedroom.jpg',1),
('llaollao-resort-suit','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/llaollao-resort-suit.jpg',1),
('llaollao-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/llaollao-bathroom.jpg',1),
('llaollao-lake','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/llaollao-lake.jpg',1),
('llaollao-livingroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/llaollao-livingroom.jpg',1),
('hotel-restaurant','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-restaurant.jpg',2),
('hotel-oudoor','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-oudoor.jpg',2),
('hotel-fireplace','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-fireplace.jpg',2),
('hotel-balcony','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-balcony.jpg',2),
('hotel-hall_2','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-hall_2.jpg',2),
('glamping-mountain','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-mountain.jpg',3),
('glamping-kayak','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-kayak.jpg',3),
('glamping-camp','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-camp.jpg',3),
('glamping-tent','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-tent.jpg',3),
('glamping-activity','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-activity.jpg',3),
('hostel-bedroom_4','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-bedroom_4.jpg',4),
('hostel-livingroom-justina','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-livingroom-justina.jpg',4),
('hostel-bedroom2-justina','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-bedroom2-justina.jpg',4),
('hostel-dinninroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-dinninroom.jpg',4),
('hostel-scene-justina','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-scene-justina.jpg',4),
('resort-scene','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-scene.jpg',5),
('resort-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-breakfast.jpg',5),
('resort-activity','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-activity.jpg',5),
('resort-relax','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-relax.jpg',5),
('resort-swimmingpool_5','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-swimmingpool_5.jpg',5),
('hotel-hall_6','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-hall_6.jpg',6),
('hotel-wine','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-wine.jpg',6),
('hotel-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-bathroom.jpg',6),
('hotel-swimmingpool','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-swimmingpool.jpg',6),
('hotel-living','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-living.jpg',6),
('glamping-bedroom_7','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-bedroom_7.jpg',7),
('glamping-domo_7','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-domo_7.jpg',7),
('glamping-entry','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-entry.jpg',7),
('glamping-bedroom2','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-bedroom2.jpg',7),
('glamping-domo2_7','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-domo2_7.jpg',7),
('hostel-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-breakfast.jpg',8),
('hostel-livingroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-livingroom.jpg',8),
('hostel-swimming-pool','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-swimming-pool.jpg',8),
('hostel-relax','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-relax.jpg',8),
('hostel-gameroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-gameroom.jpg',8),
('amerian-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/amerian-bedroom.jpg',9),
('amerian-livingroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/amerian-livingroom.jpg',9),
('amerian-reception','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/amerian-reception.jpg',9),
('amerian-bar','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/amerian-bar.jpg',9),
('amerian-dinningroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/amerian-dinningroom.jpg',9),
('pampas-resort-livingroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/pampas-resort-livingroom.jpg',10),
('pampas-resort-swimmingpool','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/pampas-resort-swimmingpool.jpg',10),
('pampas-resort-gym','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/pampas-resort-gym.jpg',10),
('pampas-resort-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/pampas-resort-bedroom.jpg',10),
('pampas-resort-swimmingpool2','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/pampas-resort-swimmingpool2.jpg',10),
('hostel-sum','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-sum.jpg',11),
('hostel-bedroom_11','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-bedroom_11.jpg',11),
('hostel-kitchen','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-kitchen.jpg',11),
('hostel-garden','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-garden.jpg',11),
('hostel-drink','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hostel-drink.jpg',11),
('glamping-green','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-green.jpg',12),
('glamping-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-breakfast.jpg',12),
('glamping-bedroom_12','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-bedroom_12.jpg',12),
('glamping-sky','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-sky.jpg',12),
('glamping-night','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-night.jpg',12),
('resort-outdoor','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-outdoor.jpg',13),
('resort-tennis','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-tennis.jpg',13),
('resort-golf','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-golf.jpg',13),
('resort-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-bedroom.jpg',13),
('resort-swimmingpool_13','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/resort-swimmingpool_13.jpg',13),
('hotel-window','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-window.jpg',14),
('hotel-food','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-food.jpg',14),
('hotel-nature','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-nature.jpg',14),
('hotel-mountain','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-mountain.jpg',14),
('hotel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/hotel-bedroom.jpg',14),
('glamping-domo_15','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-domo_15.jpg',15),
('glamping-allDomos','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-allDomos.jpg',15),
('glamping-domo2_15','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-domo2_15.jpg',15),
('glamping-domo3','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-domo3.jpg',15),
('glamping-esqui','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/glamping-esqui.jpg',15),
('sigrum-hostel-facade','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sigrum-hostel-facade.jpg',16),
('sigrum-hostel-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sigrum-hostel-breakfast.jpg',16),
('sigrum-hostel-dinningroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sigrum-hostel-dinningroom.jpg',16),
('sigrum-hostel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sigrum-hostel-bedroom.jpg',16),
('sigrum-hostel-livingroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sigrum-hostel-livingroom.jpg',16),
('unique-hotel-facade','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/unique-hotel-facade.jpg',17),
('unique-hotel-lobby','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/unique-hotel-lobby.jpg',17),
('unique-hotel-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/unique-hotel-breakfast.jpg',17),
('unique-hotel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/unique-hotel-bedroom.jpg',17),
('unique-hotel-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/unique-hotel-bathroom.jpg',17),
('bridge-hotel-principal','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/bridge-hotel-principal.jpg',18),
('bridge-hotel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/bridge-hotel-bedroom.jpg',18),
('bridge-hotel-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/bridge-hotel-bathroom.jpg',18),
('bridge-hotel-lobby','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/bridge-hotel-lobby.jpg',18),
('bridge-hotel-bedroom2','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/bridge-hotel-bedroom2.jpg',18),
('suipacha-hotel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/suipacha-hotel-bedroom.jpg',19),
('suipacha-hotel-bedroom2','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/suipacha-hotel-bedroom2.jpg',19),
('suipacha-hotel-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/suipacha-hotel-breakfast.jpg',19),
('suipacha-hotel-lobby','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/suipacha-hotel-lobby.jpg',19),
('suipacha-hotel-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/suipacha-hotel-bathroom.jpg',19),
('sarmiento-hotel-bedroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sarmiento-hotel-bedroom.jpg',20),
('sarmiento-hotel-facade','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sarmiento-hotel-facade.jpg',20),
('sarmiento-hotel-breakfast','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sarmiento-hotel-breakfast.jpg',20),
('sarmiento-hotel-bathroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sarmiento-hotel-bathroom.jpg',20),
('sarmiento-hotel-dinningroom','https://the-cruds-bucket.s3.us-east-2.amazonaws.com/imagens_grupo5/sarmiento-hotel-dinningroom.jpg',20);


-- -----------------------------------------------------
-- Tabla roles
-- -----------------------------------------------------
INSERT INTO roles (name) VALUES
('USER'),
('ADMIN');

-- -----------------------------------------------------
-- Tabla users
-- -----------------------------------------------------

INSERT INTO users (name,surname,email,password,city,role_id,validate) VALUES
('Luis','Miguel','luis_miguel@gmail.com','Luis1234',"Cordoba",1,0),
('Freddie','Mercury','freddie_mercury@gmail.com','Freddie1234',"Ciudad Autonoma de Buenos Aires",2,0),
('Cosme','Fulanito','cosme_fulanito@gmail.com','Cosme1234',"San Carlos de Bariloche",1,0),
('Fulano','De tal','fulano_de tal@gmail.com','Fulano1234',"Villa Carlos Paz",1,0),
('Gustavo','Cerati','gustavo_cerati@gmail.com','Gustavo1234',"Cosquin",2,0),
('Mario','Mario','mario_mario@gmail.com','Mario1234',"San Carlos de Bariloche",1,0),
('Luigi','Mario','luigi_mario@gmail.com','Luigi1234',"Ciudad Autonoma de Buenos Aires",1,0);

-- -----------------------------------------------------
-- Tabla bookings
-- -----------------------------------------------------
INSERT INTO bookings (start_time,start_date,finish_date,product_id,user_id) VALUES
('13:25:53','2022:07:02','2022:07:17',1,1),
('14:25:53','2022:07:01','2022:07:06',3,3),
('15:25:53','2022:07:18','2022:08:03',7,4),
('15:25:53','2022:07:18','2022:08:03',7,5),
('15:25:53','2022-07-18','2022-08-03',7,6),
('16:25:53','2022:06:28','2022:07:11',10,7);

-- -----------------------------------------------------
-- Tabla favorites
-- -----------------------------------------------------

INSERT INTO `favorites` (`users_id`,`products_id`) VALUES 
(1 ,2) ,
(2 ,2) ,
(1 ,3) ,
(4 ,1) ,
(1 ,17) ;

INSERT INTO `cancellation_policies` (`description`,`policies_id`) VALUES 
('No se admiten cancelaciones una vez realizada la reserva',1),
('Cancelación hasta 24 horas previas al inicio de la reserva',2),
('En caso de cancelación, no se realizará reembolso',2),
('Cancelación hasta 72 horas previas al inicio de la reserva',3),
('En caso de cancelación, sólo se reembolsará el 50% de la reserva',3),
('Cancelación hasta 48 horas previas al inicio de la reserva',4),
('En caso de cancelación, sólo se reembolsará el 25% de la reserva',4),
('Seleccioná la fecha de tu estadía para visualizar las políticas de cancelación',5),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',5),
('Cancelación hasta 24 horas previas al inicio de la reserva',6),
('La cancelación no será reembolsable en temporada alta',6),
('En caso de cancelación, sólo se reembolsará el 25% de la reserva',6),
('Cancelación hasta 72 horas previas al inicio de la reserva',7),
('El monto de reembolso por cancelación dependerá del tipo de habitación',7),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',7),
('Cancelación hasta 48 horas previas al inicio de la reserva',8),
('El monto de reembolso por cancelación dependerá del tipo de temporada',8),
('Cancelación hasta 72 horas previas al inicio de la reserva',9),
('En caso de cancelación, sólo se reembolsará el 10% de la reserva',9),
('Cancelación hasta 24 horas previas al inicio de la reserva',10),
('La cancelación no será reembolsable en temporada alta',10),
('En caso de cancelación, sólo se reembolsará el 25% de la reserva',10),
('Cancelación hasta 48 horas previas al inicio de la reserva',11),
('El monto de reembolso por cancelación dependerá del tipo de temporada',11),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',11),
('No se admiten cancelaciones una vez realizada la reserva',12),
('Seleccioná la fecha de tu estadía para visualizar las políticas de cancelación',13),
('Cancelación hasta 24 horas previas al inicio de la reserva',14),
('El monto de reembolso por cancelación dependerá del tipo de habitación',14),
('Cancelación hasta 48 horas previas al inicio de la reserva',15),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',15),
('La cancelación no será reembolsable en temporada alta',15),
('Cancelación hasta 72 horas previas al inicio de la reserva',16),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',16),
('En caso de cancelación, sólo se reembolsará el 50% de la reserva',16),
('Cancelación hasta 24 horas previas al inicio de la reserva',17),
('La cancelación no será reembolsable en temporada alta',17),
('En caso de cancelación, sólo se reembolsará el 25% de la reserva',17),
('Seleccioná la fecha de tu estadía para visualizar las políticas de cancelación',18),
('Cancelación hasta 12 horas previas al inicio de la reserva',19),
('El monto de reembolso por cancelación dependerá del tipo de habitación',19),
('En caso de cancelación, sólo se reembolsará mediante transferencia bancaria',19),
('Seleccioná la fecha de tu estadía para visualizar las políticas de cancelación',20);

INSERT INTO `rules` (`description`,`policies_id`) VALUES 
('Check-in:14:00',1),
('Check-out:10:00',1),
('No fumar en espacios cerrados',1),
('Check-in:14:00',2),
('Check-out:11:00',2),
('No se admiten mascotas',2),
('Check-in:13:00',3),
('Check-out:10:00',3),
('Se admiten mascotas bajo petición',3),
('Check-in:13:00',4),
('Check-out:11:00',4),
('No se permiten fiestas',4),
('Check-in:14:00',5),
('Check-out:10:00',5),
('No se pueden añadir camas supletorias en este alojamiento',5),
('Check-in:13:00',6),
('Check-out:10:00',6),
('Los niños a partir de 3 años se considerarán adultos en este alojamiento',6),
('Check-in:14:00',7),
('Check-out:10:00',7),
('Este alojamiento solo acepta pagos en efectivo',7),
('Check-in:13:00',8),
('Check-out:11:00',8),
('No se pueden celebrar despedidas de soltero o soltera ni fiestas similares',8),
('Check-in:14:00',9),
('Check-out:11:00',9),
('No hay cunas ni camas supletorias disponibles',9),
('Check-in:13:00',10),
('Check-out:10:00',10),
('Se pueden alojar niños a partir de 2 años',10),
('Check-in:14:00',11),
('Check-out:10:00',11),
('Los niños a partir de 11 años se considerarán adultos en este alojamiento',11),
('Check-in:14:00',12),
('Check-out:11:00',12),
('Los huéspedes deben minimizar el ruido de 02:00 a 07:00',12),
('Check-in:13:00',13),
('Check-out:10:00',13),
('Los clientes deben minimizar el ruido de 23:00 a 07:00',13),
('Check-in:14:00',14),
('Check-out:10:00',14),
('No se pueden añadir camas supletorias en este alojamiento',14),
('Check-in:14:00',15),
('Check-out:11:00',15),
('A partir de los 10 años, los niños abonan el 100% por noche',15),
('Check-in:13:00',16),
('Check-out:11:00',16),
('Todas las cunas y camas supletorias están sujetas a disponibilidad',16),
('Check-in:14:00',17),
('Check-out:10:00',17),
('Se pueden alojar niños de cualquier edad',17),
('Check-in:13:00',18),
('Check-out: 10:00',18),
('No se pueden alojar niños',18),
('Check-in:14:00',19),
('Check-out:11:00',19),
('Se pueden alojar niños a partir de 10 años',19),
('Check-in:14:00',20),
('Check-out:10:00',20),
('No se pueden celebrar fiestas/eventos',20);

INSERT INTO `security_politics` (`description`,`policies_id`) VALUES 
('Nuestro personal atiende a las pautas sanitarias establecidas localmente debido al COVID',1),
('Cámaras de seguridad en áreas comunes',1),
('Acceso con tarjeta',1),
('El alojamiento aplica medidas sanitarias y de seguridad en respuesta al COVID',2),
('Llave de acceso',2),
('Personal médico/de enfermería de guardia',2),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',3),
('Alarma de seguridad',3),
('Cámaras de seguridad fuera del alojamiento',3),
('Este alojamiento ha adoptado medidas de distanciamiento físico estrictas debido al COVID',4),
('Cámaras de seguridad en las zonas comunitarias',4),
('Llave de acceso',4),
('El alojamiento aplica medidas sanitarias y de seguridad en respuesta al COVID',5),
('Seguridad 24 horas',5),
('Cámaras de seguridad fuera del alojamiento',5),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',6),
('Cámaras de seguridad en las zonas comunitarias',6),
('Caja fuerte en todas las habitaciones',6),
('Nuestro personal atiende a las pautas sanitarias establecidas localmente debido al COVID',7),
('Acceso con tarjeta',7),
('Cámaras de seguridad en las zonas comunitarias',7),
('El alojamiento aplica medidas sanitarias y de seguridad en respuesta al COVID',8),
('Extintores',8),
('Caja fuerte en todas las habitaciones',8),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',9),
('Llave de acceso',9),
('Cámaras de seguridad fuera del alojamiento',9),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',10),
('Detectores de humo',10),
('Acceso con tarjeta',10),
('Este alojamiento ha adoptado medidas de distanciamiento físico estrictas debido al COVID',11),
('Alarma de seguridad',11),
('Caja fuerte en todas las habitaciones',11),
('Nuestro personal atiende a las pautas sanitarias establecidas localmente debido al COVID',12),
('Cámaras de seguridad en las zonas comunitarias',12),
('Extintores',12),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',13),
('Cámaras de seguridad fuera del alojamiento',13),
('Alarma de seguridad',13),
('Este alojamiento ha adoptado medidas de distanciamiento físico estrictas debido al COVID',14),
('Detectores de humo',14),
('Llave de acceso',14),
('Nuestro personal atiende a las pautas sanitarias establecidas localmente debido al COVID',15),
('Cámaras de seguridad en áreas comunes',15),
('Extintores',15),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',16),
('Acceso con tarjeta',16),
('Seguridad 24 horas',16),
('Este alojamiento ha adoptado medidas de distanciamiento físico estrictas debido al COVID',17),
('Cámaras de seguridad en áreas comunes',17),
('Detectores de humo',17),
('Nuestro personal atiende a las pautas sanitarias establecidas localmente debido al COVID',18),
('Detectores de humo',18),
('Llave de acceso',18),
('Es obligatorio llevar mascarilla en todas las zonas comunes interiores debido al COVID',19),
('Extintores',19),
('Alarma de seguridad',19),
('Este alojamiento ha adoptado medidas de distanciamiento físico estrictas debido al COVID',20),
('Cámaras de seguridad fuera del alojamiento',20),
('Seguridad 24 horas',20);





 /* DELIMITER $$
create procedure insertFavourite()
begin
	set @usuario_j = 0;
	set @cantidad_usuarios = (select count(*) from users);
	set @cantidad_productos = (select count(*) from products);
	if ((@cantidad_productos != 0)&(@cantidad_usuarios != 0)) THEN
		llenando_usuarios:loop
			set @usuario_j = @usuario_j +1;
			set @producto_j = 0;
			llenando_productos:loop
				set @producto_j = @producto_j +1;
				INSERT INTO `favorites` (`users_id`,`products_id`) VALUES (@usuario_j , @producto_j) ;
				if @producto_j = @cantidad_productos THEN
					leave llenando_productos;
				end if;
			end loop;	
			if @usuario_j = @cantidad_usuarios THEN 
				leave llenando_usuarios;
			end if;	
		end loop;
	end if;
end$$
DELIMITER ;
call insertFavourite(); */

-- -----------------------------------------------------
-- Funciones y procedimientos
-- -----------------------------------------------------

use wanderlust;
SET GLOBAL log_bin_trust_function_creators = 1;
drop procedure if exists vectorDisponibilidad;
drop procedure if exists llenandoReservas;
drop procedure if exists fechas_disponibles;
drop function if exists index2date;
drop procedure if exists chequeando_existencia_de_valor;
drop procedure if exists availableById;	
drop procedure if exists chequeando_disponibilidad;
drop procedure if exists vector_productos_disponibles;
drop function if exists format_date;
drop function if exists interval_date_JSON;

DELIMITER $$
create procedure vectorDisponibilidad()
begin
	declare j int;
	set j=1;
    drop table if exists disponibilidad;
	CREATE TEMPORARY TABLE disponibilidad (id int, valor int);
	creando_vector_vacio:loop
		INSERT INTO disponibilidad (id, valor) VALUES (j,0);
		set j=j+1;
		if j=DATEDIFF(DATE_ADD(now(),interval 1 YEAR),now())+101 THEN
			leave creando_vector_vacio;
		end if;
	end loop;
end$$
DELIMITER ;


DELIMITER $$
create procedure llenandoReservas(id_product BIGINT)
begin
	declare j BIGINT;
	call vectorDisponibilidad();
	set @id_inicial = (select min(id) from bookings where product_id=id_product);
	set @id_final = (select max(id) from bookings where product_id=id_product);
	set j= @id_inicial - 1 ;
	llenando:loop
		set j=j+1;
		set @idproducto = (select product_id from bookings where id=j);
		if @idproducto = id_product THEN
			set @fecha_inicial = (select start_date from bookings where id=j);
			set @fecha_final = (select finish_date  from bookings where id=j);
			set @puntero_inicial = (select datediff(@fecha_inicial , now())+100) ;
			set @puntero_final =  (select datediff(@fecha_final , now())+100) ;
			UPDATE disponibilidad SET valor=valor+1 WHERE id between @puntero_inicial and @puntero_final ;
		end if;
		if j = @id_final THEN
			leave llenando;
		end if;
	end loop;
end$$
DELIMITER ;


DELIMITER $$
create procedure fechas_disponibles(id_product BIGINT,available_rooms int)
begin
	declare m int;
	declare n int;
	set n=0;
	set m=0;
	call llenandoReservas(id_product);
    drop table if exists indices_disponibles;
	CREATE TEMPORARY TABLE indices_disponibles (id int, indice int, ocupacion int, indice_siguiente int, ocupacion_siguiente int);
	set @total_dias = (select count(*) from disponibilidad);
	buscando_disponibilidad:loop
		set m=m+1;
		set @ocupadas = (select valor from disponibilidad where id = m);
		set @ocupadas_siguiente = (select valor from disponibilidad where id = m+1);
		if @ocupadas_siguiente != @ocupadas THEN
			set n=n+1;
			insert into indices_disponibles (id,indice,ocupacion,indice_siguiente,ocupacion_siguiente) values (n,m,@ocupadas , m+1, @ocupadas_siguiente) ;
		end if;
		if m+1=@total_dias THEN
			leave buscando_disponibilidad;
		end if;
	end loop;
end$$
DELIMITER ;

DELIMITER $$
create function index2date(ind int)
returns date
begin
	declare fecha date;
	set fecha = now()+interval (ind-100) day;
	return fecha;
end$$
DELIMITER ;

DELIMITER $$
create procedure chequeando_existencia_de_valor (id_del_producto bigint)
begin
	set @i = 0;
	set @cantidad_registros = (select count(*) from bookings);
	recorriendo_reservas:loop
		set @i = @i +1;
		set @producto = (select product_id from bookings where id = @i ); 
		if id_del_producto = @producto THEN
		set @existe = 1;
		leave recorriendo_reservas;
		else
		set @existe = 0;
		end if;
		if @cantidad_registros = @i THEN
		leave recorriendo_reservas;
		end if;
	end loop;
end$$
DELIMITER ;

DELIMITER $$
create procedure availableById(id_product BIGINT)
begin
	declare q int;
	call chequeando_existencia_de_valor(id_product);
    set @capacity = (select capacity from products where id=id_product);
	if @existe = 1 THEN
		call fechas_disponibles(id_product, @capacity);
        drop table if exists table_availableById;
		CREATE TEMPORARY TABLE table_availableById (id int, inicio_periodo date, fin_periodo date, lugares_disponibles int);
		set q=0;
		set @inicio = now(); 
		set @total_periodos = (select count(*) from disponibilidad);
		set @total_registros = (select count(*) from indices_disponibles);
		armando_tabla:loop
			set q=q+1;
			set @ind_fin = (select indice from indices_disponibles where id=q);
			set @plazas = @capacity-(select ocupacion from indices_disponibles where id=q);
			set @fin := index2date(@ind_fin) ;
			insert into table_availableById (id,inicio_periodo,fin_periodo,lugares_disponibles) values (q,@inicio , @fin , @plazas) ;
			set @ind_inicio = (select indice_siguiente from indices_disponibles where id=q); 
			set @inicio := index2date(@ind_inicio) ;
			if @total_registros = q THEN
			set @ind_fin = @total_periodos ;
			set @fin := index2date(@ind_fin) ;
			set @plazas = @capacity-(select ocupacion_siguiente from indices_disponibles where id=q);
			insert into table_availableById (id,inicio_periodo,fin_periodo,lugares_disponibles) values (q+1,@inicio , @fin , @plazas) ;
			leave armando_tabla;
			end if; 
		end loop;
	else
		drop table if exists table_availableById;
		CREATE TEMPORARY TABLE table_availableById (id int, inicio_periodo date, fin_periodo date, lugares_disponibles int);
		call vectorDisponibilidad();
		set @total_periodos = (select count(*) from disponibilidad);
		set @ind_fin = @total_periodos ;
		set @fin := index2date(@ind_fin) ;
		insert into table_availableById (id,inicio_periodo,fin_periodo,lugares_disponibles) values (1,now() , @fin , @capacity) ;
	end if;
end$$
DELIMITER ;

DELIMITER $$
create procedure chequeando_disponibilidad(start_date date, finish_date date, producto_id BIGINT)
begin
	drop table if exists disponibilidad;
	call availableById(producto_id);
	set @j = 0;
	set @cantidad_periodos = (select count(*) from table_availableById);
	recorriendo_fechas:loop
		set @j = @j +1;
		set @inicio = (select inicio_periodo from table_availableById where id = @j) ;
		set @fin = (select fin_periodo from table_availableById where id = @j) ;
		set @cantidad_lugares = (select lugares_disponibles from table_availableById where id = @j) ;
		if ((start_date >= @inicio and start_date <= @fin and @cantidad_lugares = 0) or (finish_date >= @inicio and finish_date <= @fin and @cantidad_lugares = 0)) THEN
		set @valor = 0;
		leave recorriendo_fechas;
		else
		set @valor = 1;
		end if;
		if @j = @cantidad_periodos THEN
			leave recorriendo_fechas;
		end if;
	end loop;
end$$
DELIMITER ;


DELIMITER $$
create procedure vector_productos_disponibles(start_date date, finish_date date)
begin
	set @total_productos = (select count(*) from products);
	set @k = 0;
	set @m = 0;
    DROP TABLE if exists productos_disponibles;
	CREATE TEMPORARY TABLE productos_disponibles (
		id bigint,
		producto bigint,
		name varchar(50),
		description_title varchar(250),
		description varchar(1500),
		direction varchar(100),
		location varchar(100),
		map varchar(500),
		capacity int,
		city_id bigint,
		rate double
		);

	buscando_productos_disponibles_en_fecha:loop
		set @k = @k +1;
		drop table if exists table_availableById;
		drop table if exists indices_disponibles;
		call chequeando_disponibilidad(start_date,finish_date,@k) ;
		if  @valor = 1 THEN
		set @m = @m +1;
		set @name = (select name from products where id = @k) ;
		set @description_title = (select description_title from products where id = @k) ; 
		set @description = (select description from products where id = @k) ; 
		set @direction = (select direction from products where id = @k) ; 
		set @location = (select location from products where id = @k) ; 
		set @map = (select map from products where id = @k) ; 
		set @capacity = (select capacity from products where id = @k) ; 
		set @city_id = (select city_id from products where id = @k) ;
		set @rate = (select rate from rates where product_id = @k) ; 
		 
		insert into productos_disponibles (
			id, producto, name, description_title, description, direction, location, map, capacity, city_id, rate)
		 values (
			@m ,
			@k ,
			@name ,
			@description_title ,
			@description ,
			@direction ,
			@location ,
			@map ,
			@capacity ,
			@city_id ,
			@rate) ;
		end if;
		if @total_productos = @k THEN
		leave buscando_productos_disponibles_en_fecha;
		end if;
	end loop;
end$$
DELIMITER ; 



DELIMITER $$
create function format_date(fecha varchar(50))
returns date
begin
	set @fecha_formateada = str_to_date(replace(fecha,'-','.'), GET_FORMAT(DATE,'EUR'));
	return @fecha_formateada ;
end$$
DELIMITER ;

DELIMITER $$
create function interval_date_JSON(date1 date, date2 date)
returns JSON
begin
	set @stay =concat('{"STAY":["',date1,'","',date2,'"]}');
	return @stay ;
end$$
DELIMITER ;

DELIMITER $$
create procedure availableById_print(id_product BIGINT)
begin
	call availableById(id_product);
    select * from table_availableById;
end$$
DELIMITER ;

DELIMITER $$
create procedure availableByDate(start_date date, finish_date date)
begin
	call vector_productos_disponibles(start_date, finish_date);
    select * from productos_disponibles;
end$$
DELIMITER ;

/* DELIMITER $$
create procedure availableByDateCity(start_date date, finish_date date, city bigint)
begin
	call vector_productos_disponibles(start_date, finish_date);
    select 
	ROW_NUMBER() OVER(ORDER BY producto) AS id,
	producto,
	name,
	description_title,
	description,
	direction,
	location,
	map,
	capacity,
	city_id,
	rate
	from productos_disponibles where city_id = city;
end$$
DELIMITER ; */

/* nuevo codigo */

DELIMITER $$
create procedure availableByDateCity(start_date date, finish_date date, city varchar(80))
begin
	
	call vector_productos_disponibles(start_date, finish_date);
	set @id_ciudad = (select id from cities where name = city);
	
    select 
	ROW_NUMBER() OVER(ORDER BY producto) AS id,
	producto,
	name,
	description_title,
	description,
	direction,
	location,
	map,
	capacity,
	city_id,
	rate
	from productos_disponibles where city_id = @id_ciudad ;
end$$
DELIMITER ;



/*fin  nuevo codigo */



DELIMITER $$
create procedure dates_not_available(id_product BIGINT)
begin
	call availableById( id_product ) ;
	select id, inicio_periodo , fin_periodo from table_availableById where lugares_disponibles = 0;		
end$$
DELIMITER ;