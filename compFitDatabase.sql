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
  avatar BLOB NOT NULL,
  created DATE,
  last_login DATE,
  PRIMARY KEY(user_id)
);

CREATE TABLE teams
(
  team_id INT NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(20),
  captain_id INT,
  avatar BLOB NOT NULL,
  created DATE,
  PRIMARY KEY(team_id)
);

CREATE TABLE team_participation
(
  team_participation_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  user_id INT,
  created DATE,
  PRIMARY KEY(team_participation_id),
  FOREIGN KEY(team_id) REFERENCES teams(team_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
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
  created DATE,
  PRIMARY KEY(challenge_id),
  FOREIGN KEY(to_team_id) REFERENCES teams(team_id),
  FOREIGN KEY(from_team_id) REFERENCES teams(team_id)
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
  PRIMARY KEY(exercise_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
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
  PRIMARY KEY(challenge_progress_id),
  FOREIGN KEY(exercise_id) REFERENCES exercises(exercise_id),
  FOREIGN KEY(challenge_id) REFERENCES challenges(challenge_id)
);


INSERT INTO users (first_name, last_name, username)
VALUES ('bob', 'Joe', 'billybob');
INSERT INTO users (first_name, last_name, username)
VALUES ('Jane', 'doe', 'jjdoe');

INSERT INTO teams (team_name, captain_id)
VALUES ('Tigers', '1');
INSERT INTO teams (team_name, captain_id)
VALUES ('Ligers', '2');
INSERT INTO teams (team_name, captain_id)
VALUES ('Ligons', '2');
INSERT INTO teams (team_name, captain_id)
VALUES ('Lions', '2');
INSERT INTO teams (team_name, captain_id)
VALUES ('Sabertooths', '2');
INSERT INTO teams (team_name, captain_id)
VALUES ('Cheetah', '1');

INSERT INTO team_participation (team_id, user_id)
VALUES ('1', '1');
INSERT INTO team_participation (team_id, user_id)
VALUES ('2', '1');
INSERT INTO team_participation (team_id, user_id)
VALUES ('1', '2');

INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name)
VALUES ('2016-3-30', '2016-4-06', '1', '4', 'The 3 Ups');
INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name)
VALUES ('2016-4-07', '2016-4-14', '2', '1', 'Just Keep Swimming');
INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name)
VALUES ('2016-4-07', '2016-4-14', '2', '1', 'Run Forrest Run');

INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('1', '2016-4-07', 'Pushups');
INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('1', '2016-4-07', 'Pullups');
INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('1', '2016-4-07', 'Situps');

INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('1', '2016-4-07', 'Run');
INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('2', '2016-4-07', 'Run');
INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('1', '2016-4-15', 'Swim');
INSERT INTO exercises (user_id, date_completed, exercise_name)
VALUES('2', '2016-4-07', 'Swim');


