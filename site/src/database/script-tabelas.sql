create database projetoi;
use projetoi;

create table usuario(
id int primary key auto_increment,
nome varchar (45),
email varchar(100),
cpf char(11),
senha varchar(60)
);
