CREATE TABLE Exercises
(
  exercise_id INT NOT NULL AUTO_INCREMENT,
  exercise_name VARCHAR(20),
  PRIMARY KEY(exercise_id)
);



#Inserting data into Exercises table
insert into Exercises (exercise_id, exercise_name) values (1, 'Running');
insert into Exercises (exercise_id, exercise_name) values (2, 'Jumping Jacks');
insert into Exercises (exercise_id, exercise_name) values (3, 'Push Ups');
insert into Exercises (exercise_id, exercise_name) values (4, 'Squats');  
insert into Exercises (exercise_id, exercise_name) values (5, 'Pull Ups');  
insert into Exercises (exercise_id, exercise_name) values (6, 'Cycling');
insert into Exercises (exercise_id, exercise_name) values (7, 'Planks');
insert into Exercises (exercise_id, exercise_name) values (8, 'Box Jumps'); 


#add more exercises
