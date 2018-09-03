/* Structure: 
    Dependencies: 
        mysql: for store's db, bamazon_DB
        inquirer: for user interface

    Connection
        create var connection to connect to mySql database
        create way to connect to mysql server and sql database

    Customer view
        Functions for the customers:
            I) Buy function
                A) query database for all the products --> connection.query("SELECT * FROM products", function(err, res)
                B) prompt user on what to buy.
                    1) choices is a function sort of object 
                        a) make an empty array variable to push query results into
                        b) return the variable after results have been pushed
                    2)  

                C) make a promise to retrieve chosen item's info

            II) How many units to buy
        
        Function for the store: Check to see if store has enough of product to meet customer request
            .then

            a) if stock_quantity != 0, console.log ("Out of stock.")
            b) if stock_quantity > 0
                update SQL database to reflect remaining quantity
                show the customer the total cost of purchase
                
    Manager view: Upping the challenge
        */

// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connection to Port and Database w/ prompt start after successful connection
var connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'root',
    database: 'bamazon_DB'
});

connection.connect(function(err) {
    if(err) throw err;
    promptstart();
   afterConnection();
});

function prompstart() {
    inquirer
        .prompt([ 
            {
            type:'rawlist',
            name:'start',
            message:'What would you like to buy?'
            choices:
            }
        ])
        .then(function(What))
}




function buy() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      inquirer
        .prompt([
            name
        ])
    });
  }
  