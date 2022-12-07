DROP DATABASE IF EXISTS todo_app;
CREATE DATABASE todo_app;
USE todo_app;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

create table users (id bigint unsigned auto_increment not null, name varchar(255) unique, password varchar(255), PRIMARY KEY (id));

INSERT INTO users
  (id, name, password)
VALUES (1,"ペン","root");

create table tasks (id bigint unsigned auto_increment not null, user_id bigint not null, content varchar(255) not null, PRIMARY KEY (id));

