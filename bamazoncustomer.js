// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

// Formatting
var line = ('--------------------------------------------------------------------------------------------------')
var dblLine = ('\n' + '===========================================' + '\n');

// Connection to Port and Database w/ prompt start after successful connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});


function start() {
    // Displays product info from Product table
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;

        console.log(dblLine + '\n\t Hello! And welcome to Bamazon! \n' + dblLine)
        console.log(' Here is what we have... \n' + line + '\n')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].Price + " | " + "QUANTITY: " + res[i].stock_quantity);
            console.log(line)
        }

        console.log(' ');
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please enter the ID of the product you would like to purchase. \n",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (ans) {
            // Input id is converted to index number and input quantity is parsed for calculations
            var shoppingCart = (ans.id) - 1;
            var itemQuantity = parseInt(ans.quantity);
            var grandTotal = parseFloat( (res[shoppingCart].price * itemQuantity) );

            // Compares shopping cart quantity with product quantity in database
            if (res[shoppingCart].stock_quantity >= itemQuantity) {
                // Updates quantity in database after purchase. {db table ref: changes based onn input}
                connection.query("UPDATE Products SET ? WHERE ?", [
                    { stock_quantity: (res[shoppingCart].stock_quantity - itemQuantity) },
                    { item_id: ans.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });

            } else {
                console.log("Sorry, we're out of stock!");
            }

            reprompt();
        })
    })
}

// Prompt to add on other items to shopping cart
function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (ans) {
        if (ans.reply) {
            start();
        } else {
            console.log("Farewell!");
        }
    });
}

start();

