DROP DATABASE IF EXISTS compfit;

CREATE DATABASE compfit;

USE compfit;

CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  username VARCHAR(20),
  email VARCHAR(255),
  password VARCHAR(30),
  #salt
  avatar VARCHAR(255) NOT NULL,
  created VARCHAR(19),
  last_login VARCHAR(19),
  token CHAR(16) NULL,
  token_expire DATETIME NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE teams
(
  team_id INT NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(20),
  captain_id INT,
  avatar VARCHAR (255) NOT NULL,
  created DATE,
  PRIMARY KEY(team_id)
);

CREATE TABLE team_participation
(
  team_participation_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  user_id INT,
  created DATE,
  PRIMARY KEY(team_participation_id)
);

CREATE TABLE challenges
(
  challenge_id INT NOT NULL AUTO_INCREMENT,
  start_date  DATE,
  end_date  DATE,
  to_team_id  INT,
  from_team_id  INT,
  task_name VARCHAR(40),
  repetitions INT,
  units VARCHAR(20),
  task_type VARCHAR(20),
  status  VARCHAR(20),
  created VARCHAR(19),
  PRIMARY KEY(challenge_id)
);

CREATE TABLE exercises
(
  exercise_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  date_completed DATE,
  exercise_name VARCHAR(40),
  repetitions INT,
  units VARCHAR(20),
  created DATE,
  PRIMARY KEY(exercise_id)
);

CREATE TABLE challenge_progress
(
  challenge_progress_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  challenge_id  INT,
  exercise_id INT,
  repetitions INT,
  units VARCHAR(20),
  created DATE,
  PRIMARY KEY(challenge_progress_id)
);


INSERT INTO users (first_name, last_name, username, email, password, avatar)
VALUES ('bob', 'Joe', 'billybob', 'bbob@gmail.com', 'harpoon', '/img/user_avatars/default-avatar.png');
INSERT INTO users (first_name, last_name, username, avatar)
VALUES ('Jane', 'doe', 'jjdoe', '/img/user_avatars/default-avatar.png');

INSERT INTO teams (team_name, captain_id, avatar)
VALUES ('Tigers', '1', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar)
VALUES ('Ligers', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar)
VALUES ('Ligons', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar)
VALUES ('Lions', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id)
VALUES ('Sabertooths', '2');

INSERT INTO team_participation (team_id, user_id)
VALUES ('1', '1');
INSERT INTO team_participation (team_id, user_id)
VALUES ('2', '1');
INSERT INTO team_participation (team_id, user_id)
VALUES ('1', '2');
