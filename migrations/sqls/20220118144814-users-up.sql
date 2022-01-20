/* Replace with your SQL commands */
CREATE TABLE `users` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `firstname` VARCHAR(50)  NOT NULL ,
    `lastname` VARCHAR(50)  NOT NULL ,
    `username` VARCHAR(50)  NOT NULL ,
    `e-mail` VARCHAR(50)  NOT NULL ,
    `password` VARCHAR(255)  NOT NULL
);