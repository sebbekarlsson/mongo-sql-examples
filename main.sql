CREATE DATABASE car_rental charset=utf8;

USE car_rental;

CREATE TABLE cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(256),
    tank_percentage INT
);

INSERT INTO cars (brand, tank_percentage) VALUES ("Volvo", 50);
INSERT INTO cars (brand, tank_percentage) VALUES ("Saab", 100);
INSERT INTO cars (brand, tank_percentage) VALUES ("Nissan", 70);
INSERT INTO cars (brand, tank_percentage) VALUES ("Toyota", 30);
INSERT INTO cars (brand, tank_percentage) VALUES ("Toyota", 60);

CREATE TABLE car_renters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    carId INT,
    email VARCHAR(256),
    FOREIGN KEY (carId) REFERENCES cars(id)
);

INSERT INTO car_renters (carId, email)
VALUES (3, "john.doe@doecompany.com");

INSERT INTO car_renters (carId, email)
VALUES (1, "sarah.doe@doecompany.com");

INSERT INTO car_renters (carId, email)
VALUES (2, "david.doe@doecompany.com");


SELECT * from cars WHERE id IN (
    SELECT carId FROM car_renters
);

SELECT * FROM car_renters, cars WHERE cars.id=car_renters.carId;

SELECT email, brand, tank_percentage FROM car_renters
JOIN cars
ON cars.id=car_renters.carId;