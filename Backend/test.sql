CREATE TABLE `Story`.`users`(
 `user_id` INT NOT NULL AUTO_INCREMENT,
 `email_address` VARCHAR(50) NOT NULL,
 `user_name` VARCHAR(50) NOT NULL,
 `user_password` VARCHAR(50) NOT NULL,
 PRIMARY KEY(`user_id`),
 UNIQUE INDEX `id_UNIQUE` (`user_id` ASC) VISIBLE);
 
 INSERT INTO users(
	email_address,
    user_name,
    user_password
)
VALUES("r12528025@ntu.edu.tw","r12528025","r12528025");
SELECT * FROM users;