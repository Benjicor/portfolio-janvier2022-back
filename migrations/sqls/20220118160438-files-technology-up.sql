/* Replace with your SQL commands */
CREATE TABLE `files_technology` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `files_id` INT  NOT NULL ,
    `technology_id` INT  NOT NULL,
    FOREIGN KEY(`files_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
    FOREIGN KEY(`technology_id`) REFERENCES `technology` (`id`) ON DELETE CASCADE
);