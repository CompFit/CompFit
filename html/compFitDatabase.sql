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
  password VARCHAR(64),
  salt VARCHAR(64),
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
  created VARCHAR(19),
  PRIMARY KEY(team_id),
  FOREIGN KEY(captain_id) REFERENCES users(user_id)
);

CREATE TABLE team_participation
(
  team_participation_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  user_id INT,
  created VARCHAR(19),
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
  #Overarching challenge name - challenge_name so challenges can have more than one exercise, but each exercise is stored in a different row in the challenges table
  #exercise_name VARCHAR(40),
  repetitions DOUBLE,
  units VARCHAR(20),
  task_type VARCHAR(20),
  status  VARCHAR(20) DEFAULT 'OPEN',
  created VARCHAR(19),
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
  repetitions DOUBLE,
  units VARCHAR(20),
  created VARCHAR(19),
  PRIMARY KEY(exercise_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE individual_progress
(
  individual_progress_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  user_id INT,
  challenge_id  INT,
  exercise_id INT,
  exercise_name VARCHAR(40),
  repetitions DOUBLE,
  units VARCHAR(20),
  created VARCHAR(19),
  PRIMARY KEY(individual_progress_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(team_id) REFERENCES teams(team_id),
  FOREIGN KEY(exercise_id) REFERENCES exercises(exercise_id),
  FOREIGN KEY(challenge_id) REFERENCES challenges(challenge_id)
);

CREATE TABLE challenge_progress
(
  challenge_progress_id INT NOT NULL AUTO_INCREMENT,
  team_id INT,
  challenge_id  INT,
  exercise_name VARCHAR(40),
  repetitions DOUBLE,
  units VARCHAR(20),
  created VARCHAR(19),
  PRIMARY KEY(challenge_progress_id),
  FOREIGN KEY(challenge_id) REFERENCES challenges(challenge_id)
);


INSERT INTO users (first_name, last_name, username) VALUES ('bob', 'Joe', 'billybob');
INSERT INTO users (first_name, last_name, username) VALUES ('Jane', 'doe', 'jjdoe');
insert into users (first_name, last_name, email, password, username) values ('Annie', 'Allen', 'aallen0@accuweather.com', 'GZq0qt2VL', 'aallen0');
insert into users (first_name, last_name, email, password, username) values ('Fred', 'Hicks', 'fhicks1@edublogs.org', 'IDHOvLjkY8', 'fhicks1');
insert into users (first_name, last_name, email, password, username) values ('Ruth', 'Frazier', 'rfrazier2@bing.com', 'BP35m3sGJj', 'rfrazier2');
insert into users (first_name, last_name, email, password, username) values ('Laura', 'Moore', 'lmoore3@buzzfeed.com', 'EorXgDZzMcA', 'lmoore3');
insert into users (first_name, last_name, email, password, username) values ('Wanda', 'Price', 'wprice4@usgs.gov', 'nVeA2UNc5h1', 'wprice4');
insert into users (first_name, last_name, email, password, username) values ('Rebecca', 'Torres', 'rtorres5@msu.edu', 'TEpO7nrChBA', 'rtorres5');
insert into users (first_name, last_name, email, password, username) values ('Virginia', 'Bailey', 'vbailey6@princeton.edu', 'V4bSeJNO', 'vbailey6');
insert into users (first_name, last_name, email, password, username) values ('Ruth', 'Harper', 'rharper7@dell.com', 'xRAVdkH9', 'rharper7');
insert into users (first_name, last_name, email, password, username) values ('Russell', 'Garrett', 'rgarrett8@bigcartel.com', 'IibF6kDQq', 'rgarrett8');
insert into users (first_name, last_name, email, password, username) values ('Henry', 'Medina', 'hmedina9@mediafire.com', 'LI1LvMSprtL', 'hmedina9');
insert into users (first_name, last_name, email, password, username) values ('Bobby', 'Hall', 'bhalla@boston.com', 'ypRCDJa24', 'bhalla');
insert into users (first_name, last_name, email, password, username) values ('Phyllis', 'Kelley', 'pkelleyb@state.tx.us', 'oh7UXx', 'pkelleyb');
insert into users (first_name, last_name, email, password, username) values ('Rebecca', 'Kennedy', 'rkennedyc@rediff.com', 'vNgwOk9EuqM', 'rkennedyc');
insert into users (first_name, last_name, email, password, username) values ('Wanda', 'Fowler', 'wfowlerd@lulu.com', 'TdemKPVjqCQ', 'wfowlerd');
insert into users (first_name, last_name, email, password, username) values ('Kathleen', 'Garza', 'kgarzae@parallels.com', 'Q0C0DiHepe', 'kgarzae');
insert into users (first_name, last_name, email, password, username) values ('George', 'Thomas', 'gthomasf@feedburner.com', '300bFUH2ZDY', 'gthomasf');
insert into users (first_name, last_name, email, password, username) values ('Carl', 'Wagner', 'cwagnerg@printfriendly.com', '1a0t3GhL', 'cwagnerg');
insert into users (first_name, last_name, email, password, username) values ('Sara', 'Johnson', 'sjohnsonh@taobao.com', 'qOWytzCmZ', 'sjohnsonh');
insert into users (first_name, last_name, email, password, username) values ('Jean', 'Perez', 'jperezi@apple.com', 'P5DoAP', 'jperezi');
insert into users (first_name, last_name, email, password, username) values ('Jason', 'Bennett', 'jbennettj@noaa.gov', 'mr8sEMHZty', 'jbennettj');
insert into users (first_name, last_name, email, password, username) values ('Alice', 'Gordon', 'agordonk@google.ru', 'Bs8ciP13', 'agordonk');
insert into users (first_name, last_name, email, password, username) values ('Scott', 'Wallace', 'swallacel@goodreads.com', 'sJRE3KhafoSa', 'swallacel');
insert into users (first_name, last_name, email, password, username) values ('Jacqueline', 'Clark', 'jclarkm@bloglines.com', 'KdAGRD', 'jclarkm');
insert into users (first_name, last_name, email, password, username) values ('Anna', 'Green', 'agreenn@chron.com', 'jIAn83KPL', 'agreenn');
insert into users (first_name, last_name, email, password, username) values ('Catherine', 'Richardson', 'crichardsono@sfgate.com', 'R0pLaCvUC', 'crichardsono');
insert into users (first_name, last_name, email, password, username) values ('Johnny', 'Duncan', 'jduncanp@census.gov', '86sE5SsPlp3q', 'jduncanp');
insert into users (first_name, last_name, email, password, username) values ('Joyce', 'Watson', 'jwatsonq@cloudflare.com', 'juNRGy', 'jwatsonq');
insert into users (first_name, last_name, email, password, username) values ('Patrick', 'Garcia', 'pgarciar@bizjournals.com', 'Rbx1Ke', 'pgarciar');
insert into users (first_name, last_name, email, password, username) values ('Beverly', 'Turner', 'bturners@oakley.com', 'Aqz1sAj', 'bturners');
insert into users (first_name, last_name, email, password, username) values ('Irene', 'Walker', 'iwalkert@microsoft.com', '4ZQhzkuDr7v', 'iwalkert');
insert into users (first_name, last_name, email, password, username) values ('Kathryn', 'Powell', 'kpowellu@canalblog.com', 'RZNroXOb3', 'kpowellu');
insert into users (first_name, last_name, email, password, username) values ('Jesse', 'Larson', 'jlarsonv@ovh.net', 'ZUyUUys', 'jlarsonv');
insert into users (first_name, last_name, email, password, username) values ('George', 'Reed', 'greedw@google.cn', 'R5tnXAD5na', 'greedw');
insert into users (first_name, last_name, email, password, username) values ('Christina', 'Day', 'cdayx@indiatimes.com', 'fLYYFgI7Sy', 'cdayx');
insert into users (first_name, last_name, email, password, username) values ('Kelly', 'Moreno', 'kmorenoy@hexun.com', 'QIRVyjy', 'kmorenoy');
insert into users (first_name, last_name, email, password, username) values ('David', 'Gutierrez', 'dgutierrezz@scientificamerican.com', 'AW2YUtY', 'dgutierrezz');
insert into users (first_name, last_name, email, password, username) values ('Michael', 'Day', 'mday10@newyorker.com', 'EsGojX', 'mday10');
insert into users (first_name, last_name, email, password, username) values ('Carl', 'Johnson', 'cjohnson11@blog.com', 'Ep3OCnXcgO', 'cjohnson11');
insert into users (first_name, last_name, email, password, username) values ('Frances', 'Mason', 'fmason12@liveinternet.ru', 'M3dhmuphA', 'fmason12');
insert into users (first_name, last_name, email, password, username) values ('Steve', 'Gordon', 'sgordon13@merriam-webster.com', 'LBHzuXrOS', 'sgordon13');




INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Tigers', '1', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Ligers', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Ligons', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Lions', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Sabertooths', '2', '/img/team_avatars/default-avatar.png');
INSERT INTO teams (team_name, captain_id, avatar) VALUES ('Cheetah', '1', '/img/team_avatars/default-avatar.png');


insert into teams (team_name, captain_id, avatar) values ('Matou', 39, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Sananrejo', 37, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Kerrobert', 32, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Guantun', 2, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Buchou', 35, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Odiongan', 33, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Sumbergayam', 18, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Orlovskiy', 7, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Capim Grosso', 25, '/img/team_avatars/default-avatar.png');
insert into teams (team_name, captain_id, avatar) values ('Niugan', 7, '/img/team_avatars/default-avatar.png');


INSERT INTO team_participation (team_id, user_id) VALUES ('1', '1');
INSERT INTO team_participation (team_id, user_id) VALUES ('2', '1');
INSERT INTO team_participation (team_id, user_id) VALUES ('1', '2');

insert into team_participation (team_id, user_id) values (1, 41);
insert into team_participation (team_id, user_id) values (1, 37);
insert into team_participation (team_id, user_id) values (1, 16);
insert into team_participation (team_id, user_id) values (1, 13);
insert into team_participation (team_id, user_id) values (1, 18);
insert into team_participation (team_id, user_id) values (1, 11);

insert into team_participation (team_id, user_id) values (2, 2);
insert into team_participation (team_id, user_id) values (2, 34);
insert into team_participation (team_id, user_id) values (2, 20);
insert into team_participation (team_id, user_id) values (2, 7);
insert into team_participation (team_id, user_id) values (2, 20);
insert into team_participation (team_id, user_id) values (2, 21);
insert into team_participation (team_id, user_id) values (2, 39);

insert into team_participation (team_id, user_id) values (3, 2);
insert into team_participation (team_id, user_id) values (3, 3);
insert into team_participation (team_id, user_id) values (3, 30);
insert into team_participation (team_id, user_id) values (3, 33);
insert into team_participation (team_id, user_id) values (3, 6);
insert into team_participation (team_id, user_id) values (3, 25);
insert into team_participation (team_id, user_id) values (3, 41);
insert into team_participation (team_id, user_id) values (3, 36);

insert into team_participation (team_id, user_id) values (4, 2);
insert into team_participation (team_id, user_id) values (4, 32);
insert into team_participation (team_id, user_id) values (4, 28);
insert into team_participation (team_id, user_id) values (4, 42);
insert into team_participation (team_id, user_id) values (4, 3);
insert into team_participation (team_id, user_id) values (4, 26);
insert into team_participation (team_id, user_id) values (4, 5);
insert into team_participation (team_id, user_id) values (4, 8);

insert into team_participation (team_id, user_id) values (5, 2);
insert into team_participation (team_id, user_id) values (5, 29);
insert into team_participation (team_id, user_id) values (5, 34);
insert into team_participation (team_id, user_id) values (5, 27);
insert into team_participation (team_id, user_id) values (5, 37);
insert into team_participation (team_id, user_id) values (5, 14);
insert into team_participation (team_id, user_id) values (5, 21);
insert into team_participation (team_id, user_id) values (5, 23);

insert into team_participation (team_id, user_id) values (6, 1);
insert into team_participation (team_id, user_id) values (6, 12);
insert into team_participation (team_id, user_id) values (6, 24);
insert into team_participation (team_id, user_id) values (6, 4);
insert into team_participation (team_id, user_id) values (6, 20);
insert into team_participation (team_id, user_id) values (6, 40);
insert into team_participation (team_id, user_id) values (6, 9);
insert into team_participation (team_id, user_id) values (6, 31);

insert into team_participation (team_id, user_id) values (7, 4);
insert into team_participation (team_id, user_id) values (7, 7);
insert into team_participation (team_id, user_id) values (7, 24);
insert into team_participation (team_id, user_id) values (7, 42);
insert into team_participation (team_id, user_id) values (7, 19);
insert into team_participation (team_id, user_id) values (7, 21);
insert into team_participation (team_id, user_id) values (7, 34);
insert into team_participation (team_id, user_id) values (7, 38);

insert into team_participation (team_id, user_id) values (8, 37);
insert into team_participation (team_id, user_id) values (8, 11);
insert into team_participation (team_id, user_id) values (8, 10);
insert into team_participation (team_id, user_id) values (8, 2);
insert into team_participation (team_id, user_id) values (8, 18);
insert into team_participation (team_id, user_id) values (8, 1);
insert into team_participation (team_id, user_id) values (8, 36);
insert into team_participation (team_id, user_id) values (8, 28);

insert into team_participation (team_id, user_id) values (9, 32);
insert into team_participation (team_id, user_id) values (9, 34);
insert into team_participation (team_id, user_id) values (9, 29);
insert into team_participation (team_id, user_id) values (9, 22);
insert into team_participation (team_id, user_id) values (9, 7);
insert into team_participation (team_id, user_id) values (9, 4);
insert into team_participation (team_id, user_id) values (9, 11);
insert into team_participation (team_id, user_id) values (9, 31);

insert into team_participation (team_id, user_id) values (11, 2);
insert into team_participation (team_id, user_id) values (11, 21);
insert into team_participation (team_id, user_id) values (11, 13);
insert into team_participation (team_id, user_id) values (11, 25);
insert into team_participation (team_id, user_id) values (11, 38);

insert into team_participation (team_id, user_id) values (12, 33);
insert into team_participation (team_id, user_id) values (12, 17);
insert into team_participation (team_id, user_id) values (12, 41);
insert into team_participation (team_id, user_id) values (12, 21);
insert into team_participation (team_id, user_id) values (12, 40);

insert into team_participation (team_id, user_id) values (13, 18);
insert into team_participation (team_id, user_id) values (13, 30);
insert into team_participation (team_id, user_id) values (13, 19);
insert into team_participation (team_id, user_id) values (13, 21);
insert into team_participation (team_id, user_id) values (13, 41);
insert into team_participation (team_id, user_id) values (13, 33);

insert into team_participation (team_id, user_id) values (14, 7);
insert into team_participation (team_id, user_id) values (14, 28);
insert into team_participation (team_id, user_id) values (14, 1);
insert into team_participation (team_id, user_id) values (14, 37);
insert into team_participation (team_id, user_id) values (14, 39);
insert into team_participation (team_id, user_id) values (14, 26);
insert into team_participation (team_id, user_id) values (14, 41);

insert into team_participation (team_id, user_id) values (15, 25);
insert into team_participation (team_id, user_id) values (15, 39);
insert into team_participation (team_id, user_id) values (15, 1);
insert into team_participation (team_id, user_id) values (15, 29);
insert into team_participation (team_id, user_id) values (15, 37);
insert into team_participation (team_id, user_id) values (15, 15);
insert into team_participation (team_id, user_id) values (15, 41);

insert into team_participation (team_id, user_id) values (16, 7);
insert into team_participation (team_id, user_id) values (16, 22);
insert into team_participation (team_id, user_id) values (16, 32);


INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name, repetitions, units)
VALUES ('2016-3-30', '2016-4-06', '1', '4', 'Pullups', 200, 'repetitions');

INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('1', '1', 'Pullups', 0, 'repetitions', UTC_TIMESTAMP());
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('4', '1', 'Pullups', 0, 'repetitions', UTC_TIMESTAMP());

INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name, repetitions, units)
VALUES ('2016-4-07', '2016-4-14', '2', '1', 'Swim', 20, 'Miles');
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('2', '2', 'Swim', 0, 'Miles', UTC_TIMESTAMP());
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('1', '2', 'Swim', 0, 'Miles', UTC_TIMESTAMP());

INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name, repetitions, units)
VALUES ('2016-4-07', '2016-4-14', '2', '1', 'Run', 15, 'Miles');
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('2', '3', 'Run', 0, 'Miles', UTC_TIMESTAMP());
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('1', '3', 'Run', 0, 'Miles', UTC_TIMESTAMP());

INSERT INTO challenges (start_date, end_date, to_team_id, from_team_id, task_name, repetitions, units)
VALUES ('2016-4-07', '2016-4-14', '2', '16', 'Pushups', 300, 'repetitions');
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('2', '4', 'Pushups', 0, 'repetitions', UTC_TIMESTAMP());
INSERT INTO challenge_progress (team_id, challenge_id, exercise_name, repetitions, units, created)
VALUES ('16', '4', 'Pushups', 0, 'repetitions', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('1', '2016-4-07', 'Pushups', 15, 'repetitions', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 1, 4, 1, 'Pushups', 0, 'repetitions', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('1', '2016-4-07', 'Pullups', 20, 'repetitions', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 1, 1, 2, 'Pullups', 0, 'repetitions', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('1', '2016-4-07', 'Situps', 30, 'repetitions', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('1', '2016-4-07', 'Run', 1, 'mile', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 1, 3, 4, 'Run', 1, 'mile', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (2, 1, 3, 4, 'Run', 1, 'mile', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('2', '2016-4-07', 'Run', 1.5, 'mile', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 2, 3, 5, 'Run', 1.5, 'mile', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (2, 2, 3, 5, 'Run', 1.5, 'mile', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('1', '2016-4-15', 'Swim', 2, 'kilometers', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (2, 1, 2, 6, 'Swim', 2, 'kilometers', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 1, 2, 6, 'Swim', 2, 'kilometers', UTC_TIMESTAMP());

INSERT INTO exercises (user_id, date_completed, exercise_name, repetitions, units, created)
VALUES('2', '2016-4-07', 'Swim', .5, 'miles', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (2, 2, 2, 7, 'Swim', .5, 'miles', UTC_TIMESTAMP());
INSERT INTO individual_progress (team_id, user_id, challenge_id, exercise_id, exercise_name, repetitions, units, created)
VALUES (1, 2, 2, 7, 'Swim', .5, 'miles', UTC_TIMESTAMP());
