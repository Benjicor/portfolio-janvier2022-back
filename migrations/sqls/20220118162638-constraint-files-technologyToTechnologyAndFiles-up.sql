/* Replace with your SQL commands */
ALTER TABLE `files_technology` ADD CONSTRAINT `fk_files_technology_files_id` FOREIGN KEY(`technology_id`)
REFERENCES `files` (`id`);

ALTER TABLE `files_technology` ADD CONSTRAINT `fk_files_technology_technology_id` FOREIGN KEY(`technology_id`)
REFERENCES `technology` (`id`);