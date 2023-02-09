// variable to utilize the mysql npm package, inquirer, fs module and console table
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');

// connection to the port
const PORT = process.env.PORT || 3001;
const app = express();


// connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
},
    console.log(`Connected to the employee_db database.`)
);

// console.table command amend to use with my new database tables.
console.table([
    {
        name: 'foo',
        age: 10
    }, {
        name: 'bar',
        age: 20
    }
]);
0

// inquirer questions
inquirer
    .prompt([

        {
            type: 'choice',
            name: 'manager_name',
            message: 'What would you like to do?',
        },
    ])

// Verification that the app is connected.
app.listen(PORT, () => {
    console.log ('Server is running on port 3001')
});