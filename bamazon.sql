/*
Objectives

create database: bamazon
create table: products

*/
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(50,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Yukata", "Clothing", 90.00 , 5),
("Sparklers", "Toys and games" , 7.00 , 10), 
("Ice-shaver", "Home & Kitchen", 27.00 , 10), 
("Hawaiian shaved ice pack", "Food" , 30.00 , 10),
("Wind-chimes", "Outdoor Decor" , 39.00, 10),

("Bialetti espresso maker", "Home & Kitchen", 30.00 , 50), 
("Hairo manual box coffee grinder", "Home & Kitchen", 72.00 , 30),
("Killer-rabbit-with-very-sharp-teeth slippers", "Toys & games" , 49.99, 50),
("German steel chef knife", "Home & Kitchen", 60.00, 300),
("The Holy Grail" ,"Mythical object", 100000000000000.00 , 0);