/* Replace with your SQL commands */
CREATE TABLE `users` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `firstname` VARCHAR(50)  NOT NULL ,
    `lastname` VARCHAR(50)  NOT NULL ,
    `username` VARCHAR(50)  NOT NULL ,
    `email` VARCHAR(255) UNIQUE NOT NULL ,
    `hashedpassword` VARCHAR(255)  NOT NULL
);