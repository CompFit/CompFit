
DROP DATABASE IF EXISTS compofit;
CREATE DATABASE compfit;

USE compfit;



#Creating my Users table
CREATE TABLE Users (
    user_id           INT            NOT NULL,
    first_name        VARCHAR(20)    NOT NULL,
    last_name         VARCHAR(20)    NOT NULL,
    username          VARCHAR(30)    NOT NULL,
    email             VARCHAR(36)    NOT NULL,
    password          VARCHAR(30)    NOT NULL,
    #need to add salt to password
    -- avatar                           NOT NULL,
    created_timestamp DATE           NOT NULL,
    last_login        DATE           NOT NULL,
    PRIMARY KEY    (user_id)


#Inserting data into my Categories table
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (2468, 'Jackson', 'Teller', 'jteller34', 'jacksteller@gmail.com', '94%$yT3v', '2016-18-03', '2016-22-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (1938, 'Filip', 'Telford', 'fipsy888', 'ftelford@gmail.com', 'password1234', '2016-24-02', '2016-18-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (5834, 'Comedy', 'Gemma', 'Teller', 'mommaofdacrew66', 'gteller@aol.com', '1a2b3c4d', '2016-10-03', '2016-20-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (2835, 'Action', 'Alex', 'Trager', 'atrain48', 'alextrager@hotmail.com', '1234ABCD', '2016-12-03', '2016-15-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (9388, 'Thriller', 'Clay', 'Morrow', 'bigdaddy99', 'claymorrow10@aol.com', 'mysonsandI22', '2016-27-02', '2016-20-03');
insert into Users (user_id, first_name, last_name, username, email, password, created_Timestamp, last_login) values (3454, 'Family', 'Tara', 'Knowles', 'tKnowles10', 'taraknowles@gmail.com', 'pa$$word', '2016-26-02', '2016-21-03');
