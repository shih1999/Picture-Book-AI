CREATE TABLE `Story`.`users`(
 `user_id` INT NOT NULL AUTO_INCREMENT,
 `email_address` VARCHAR(50) NOT NULL,
 `user_name` VARCHAR(50) NOT NULL,
 `user_password` VARCHAR(50) NOT NULL,
 PRIMARY KEY(`user_id`),
 UNIQUE INDEX `id_UNIQUE` (`user_id` ASC) VISIBLE);
 
SELECT * FROM users;


CREATE TABLE `Story`.`posts`(
 `post_id` INT NOT NULL AUTO_INCREMENT,
 `user_id` INT NOT NULL,
 `title` VARCHAR(50) NOT NULL,
 `created_at` DATETIME NOT NULL,
 `likes_count` INT NOT NULL DEFAULT 0,
 `comments_count` INT NOT NULL DEFAULT 0,
 `story_category` VARCHAR(50) NOT NULL DEFAULT 'others',
 `published` BIT(1) NOT NULL DEFAULT 0,
 PRIMARY KEY(`post_id`),
 CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE);

CREATE TABLE `Story`.`contents`(
 `page_id` INT NOT NULL AUTO_INCREMENT,
 `post_id` INT NOT NULL,
 `page_number` INT NOT NULL,
 `image_url` VARCHAR(50),
 `content` VARCHAR(50),
 PRIMARY KEY(`page_id`),
 CONSTRAINT `content_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE);
 
 
CREATE TABLE `Story`.`comments`(
 `comment_id` INT NOT NULL AUTO_INCREMENT,
 `post_id` INT NOT NULL,
 `user_id` INT NOT NULL,
 `text`  VARCHAR(100),
 `created_at` DATETIME NOT NULL,
 PRIMARY KEY(`comment_id`),
 CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
 CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE);
 
SELECT * FROM contents;
SELECT * FROM posts;
SELECT * FROM comments;