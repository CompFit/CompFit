


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
  created DATE,
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




#Inserting data into my Categories table
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (2468, 'Jackson', 'Teller', 'jteller34', 'jacksteller@gmail.com', '94%$yT3v', '2016-18-03', '2016-22-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (1938, 'Filip', 'Telford', 'fipsy888', 'ftelford@gmail.com', 'password1234', '2016-24-02', '2016-18-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (5834, 'Gemma', 'Teller', 'mommaofdacrew66', 'gteller@aol.com', '1a2b3c4d', '2016-10-03', '2016-20-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (2835, 'Alex', 'Trager', 'atrain48', 'alextrager@hotmail.com', '1234ABCD', '2016-12-03', '2016-15-03');

insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (9388, 'Clay', 'Morrow', 'bigdaddy99', 'claymorrow10@aol.com', 'mysonsandI22', '2016-27-02', '2016-20-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (3454, 'Tara', 'Knowles', 'tKnowles10', 'taraknowles@gmail.com', 'pa$$word', '2016-26-02', '2016-21-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (9934, 'Lyla', 'Dvorak', 'ldvor11', 'lDvorak@aol.com', 'il0vepug$24', '2016-18-02', '2016-22-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (3904, 'Nero', 'Padilla', 'npaddles', 'neropadilla@gmail.com', 'mYpAsSwOrD10', '2016-02-02', '2016-23-03');

insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (8293, 'Ally', 'Lowen', 'alowen3', 'allylowen@hotmail.com', '123456789', '2016-08-02', '2016-20-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (6477, 'Henry', 'Lin', 'linsanity11', 'henrylin@gmail.com', 'qwerty10', '2016-01-03', '2016-18-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (1244, 'Romero', 'Parada', 'theRparade', 'rparada@aol.com', 'drAgonking24', '2016-13-02', '2016-10-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (3332, 'Luann', 'Delaney', 'ldelaney', 'ldelaney@gmail.com', 'loveme33', '2016-16-02', '2016-14-03');



#inserting data into my Teams
insert into teams (team_id, team_name, captain_id, created) values (24, 'hodbodmommas', 10001, '2016-18-02');
insert into teams (team_id, team_name, captain_id, created) values (36, 'fitfunfresh', 20002, '2016-18-02');
insert into teams (team_id, team_name, captain_id, created) values (48, 'thunder', 30003, '2016-18-02');


#inserting data into Team Participation
insert into team_participation(team_id, user_id, created) values (24, 1938, '2016-18-03');
insert into team_participation(team_id, user_id, created) values (24, 2468, '2016-22-03');
insert into team_participation(team_id, user_id, created) values (24, 2835, '2016-15-03');
insert into team_participation(team_id, user_id, created) values (24, 5834, '2016-20-03');

insert into team_participation(team_id, user_id, created) values (36, 9388, '2016-20-03');
insert into team_participation(team_id, user_id, created) values (36, 3904, '2016-23-03');
insert into team_participation(team_id, user_id, created) values (36, 9934, '2016-22-03');
insert into team_participation(team_id, user_id, created) values (36, 3454, '2016-21-03');

insert into team_participation(team_id, user_id, created) values (48, 6477, '2016-18-03');
insert into team_participation(team_id, user_id, created) values (48, 3332, '2016-14-03');
insert into team_participation(team_id, user_id, created) values (48, 1244, '2016-10-03');
insert into team_participation(team_id, user_id, created) values (48, 8293, '2016-20-03');


#inserting data into challenges
insert into challenges (challenge_id, start_date, end_date, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (1, '2016-10-02', '2016-17-02', 36, 24, 'Run', 10, 'miles', 'run', 'pending', '2016-10-02');  
insert into challenges (challenge_id, start_data, end_data, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (2, '2016-11-02', '2016-18-02', 36, 48, 'Pushups', '5', 'pushups', 'do', 'pending', '2016-11-02');
insert into challenges (challenge_id, start_data, end_data, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (3, '2016-12-03', '2016-19-03', 48, 24, 'Burpees', '500', 'burpees', 'do', 'pending', '2016-12-02');
insert into challenges (challenge_id, start_data, end_data, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (4, '2016-13-03', '2016-20-03', 48, 36, 'Benchpress 200,000 pounds', '200', 'pounds', 'benchpress', 'pending', '2016-13-02');
insert into challenges (challenge_id, start_data, end_data, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (5, '2016-14-03', '2016-21-03', 24, 36, 'Squats', '3000000', 'squats', 'do', 'pending', '2016-14-02');
insert into challenges (challenge_id, start_data, end_data, to_team_id, from_team_id, task_name, repetitions, units, task_type, status, created) values (6, '2016-15-03', '2016-22-03', 24, 48, 'Run' '100,000', 'meters', 'run', 'pending', '2016-15-02');

#inserting data into exercises
insert into exercises(exercise_id, user_id, date_completed, exercise_name, repetitions, units, created) values (1, 1938, '2016-11-02', 'Run', 2, 'miles', '2016-11-02');
insert into exercises(exercise_id, user_id, date_completed, exercise_name, repetitions, units, created) values (2, 3454, '2016-13-02', 'Run', 1, 'miles', '2016-13-02');
insert into exercises(exercise_id, user_id, date_completed, exercise_name, repetitions, units, created) values (3, 6477, '2016-18-03', 'Burpees', 60, 'burpees', '2016-18-03');
insert into exercises(exercise_id, user_id, date_completed, exercise_name, repetitions, units, created) values (4, 3904, '2016-15-03', 'Squats', 1000, 'sqauts', '2016-15-03');

#inserting data into challenge_progress
insert into challenge_progress (challenge_progress_id, team_id, challenge_id, exercise_id, repetitions, units, created) values (10, 24, 1, 2, 1, 'miles', '2016-23-03')
insert into challenge_progress (challenge_progress_id, team_id, challenge_id, exercise_id, repetitions, units, created) values (20, 36, 5, 4, 1000, 'squats', '2016-23-03')
insert into challenge_progress (challenge_progress_id, team_id, challenge_id, exercise_id, repetitions, units, created) values (30, 48, 3, 2, 60, 'burpees', '2016-23-03')




