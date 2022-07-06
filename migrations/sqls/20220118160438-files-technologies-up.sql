/* Replace with your SQL commands */
CREATE TABLE `files_technologies` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `files_id` INT  NOT NULL ,
    `technologies_id` INT  NOT NULL,
    FOREIGN KEY(`files_id`) REFERENCES `files` (`id`),
    FOREIGN KEY(`technologies_id`) REFERENCES `technologies` (`id`)
);