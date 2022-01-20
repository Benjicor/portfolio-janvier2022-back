/* Replace with your SQL commands */
ALTER TABLE `images` ADD CONSTRAINT `fk_images_files_id` FOREIGN KEY(`files_id`)
REFERENCES `files` (`id`);