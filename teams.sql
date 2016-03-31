DROP DATABASE IF EXISTS compfit;
CREATE DATABASE compfit;

USE compfit;

CREATE TABLE teams
(
  team_id INT NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(20),
  captain_id INT,
  avatar BLOB NOT NULL,
  created NOW(), #NOW stamps with current date and time
  PRIMARY KEY(team_id)
);
