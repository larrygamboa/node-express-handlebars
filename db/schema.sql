-- Drops the burgers_db if it already exists --
DROP DATABASE IF EXISTS burgers_db;

-- Create the database burgers_db and specified it for use --
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN DEFAULT false
);