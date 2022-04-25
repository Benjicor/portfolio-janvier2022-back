/* Replace with your SQL commands */
CREATE TABLE `images` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `alt` VARCHAR(100)  NOT NULL,
    `src` VARCHAR(255)  NOT NULL,
    `create_date` DATETIME  NOT NULL DEFAULT current_timestamp(),
    `description` TEXT  NULL,
    `files_id` INT  NOT NULL,
    FOREIGN KEY(`files_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
);