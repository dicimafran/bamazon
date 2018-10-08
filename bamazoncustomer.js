// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

// Formatting
var line = ('--------------------------------------------');
var dblLine = ('\n' + '===========================================' + '\n');

// Connection to Port and Database w/ prompt start after successful connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});


console.log(dblLine + '\n\t Hello! And welcome to Bamazon! \n' + dblLine)

connection.connect(function (err) {
    if (err) throw err;

    else {
        console.log('\t Here is what we have... \n' + line + '\n')
        productQuery();
    };
});

// Constructor function for product Info 

function ProductInfo(item_id, product_name, department_name, price, stock_quantity) {
    this.id = item_id;
    this.Product = product_name;
    this.Department = department_name;
    this.Price = price;
    this.Stock = stock_quantity;
};

ProductInfo.prototype.printInfo = function () {
    console.log(
        '\n' +
        '  Item id: ' + this.id + '\n' +
        '  Product name: ' + this.Product + '\n' +
        '  Department: ' + this.Department + '\n' +
        '  Price: $' + this.Price + '\n' +
        '  Stock ' + this.Stock + '\n' +
        '\n' + line
    );
};

function productQuery() {
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err;

        else {
            for (i = 0; i < response.length; i++) {
                const res = response;

                // Product info based on responses
                let inventoryInfo = new ProductInfo(
                    res[i].item_id,
                    res[i].product_name,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity
                );
                inventoryInfo.printInfo();

                // I want the names in a single array, not separated. 
                // How do I concatenate them for choices array in buyPrompt?
                const choiceNames= inventoryInfo.Product
                const choiceArray = [];
                choiceArray.push(choiceNames)
                console.log(choiceArray)
                
            };
        };
        connection.end();
    });
};


function buyPrompt(choices) {
    inquirer
        .prompt([
            {
                name: 'choice',
                message: '\n What would you like to buy?',
                type: 'list',
                choices: [choices]
            }
        ]).then(function (answer) {
            console.log(answer.choice)
        });
}




