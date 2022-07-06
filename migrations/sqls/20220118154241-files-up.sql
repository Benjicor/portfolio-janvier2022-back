/* Replace with your SQL commands */
CREATE TABLE `files` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `title` VARCHAR(255)  NOT NULL ,
    `start_date` DATETIME  NOT NULL ,
    `end_date` DATETIME  NOT NULL ,
    `create_time` DATETIME  NOT NULL DEFAULT current_timestamp(),
    `src` VARCHAR(255) NULL ,
    `description` TEXT NOT NULL
);