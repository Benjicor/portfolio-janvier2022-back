/* Replace with your SQL commands */
CREATE TABLE `users` (
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `firstname` VARCHAR(50)  NOT NULL ,
    `lastname` VARCHAR(50)  NOT NULL ,
    `username` VARCHAR(50)  NOT NULL ,
    `email` VARCHAR(255) UNIQUE NOT NULL ,
    `password` VARCHAR(255)  NOT NULL
);

INSERT INTO `users` (`firstname`, `lastname`, `username`, `email`, `password`) VALUES ('Benjamin', 'CORDREAUX', 'Benjicor', 'cordreaux.benjamin@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$mtNaoGzMkIcoSxI5jg/mVg$b0OqNdehUZe3UmGTo7rdLHqugGzwHLIC1w3tVsAyuVQ')