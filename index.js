// variable to utilize the mysql npm package, inquirer, fs module and console table
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const { resolveSoa } = require('dns');

// connection to the port
const PORT = process.env.PORT || 3001;



// connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
},
    console.log (`You are connected to the employee_db database.`)
);



// console.table command amend to use with my new database tables.
var values =[ 
    ["Mike","Chan", "Salesperson", "Sales", 80000, "John Doe"],
    ["Ashley","Rodriquez", "Lead Engineer", "Engineering", 150000, null],
    ["Kevin","Tupik", "Software Engineer", "Engineering", 120000, "Ashley Rodriguez"],
    ["Kunal","Singh", "Account Manager", "Finance", 160000, null],
    ["Malia","Brown", "Accountant", "Finance", 125000, "Kunal Singh"],
    ["Sarah","Lourd", "Legal Team Lead", "Legal", 250000, null],
    ["Tom","Allen", "Lawyer", "Legal", 190000, "Sarah Lourd"]
    

    
]
console.table(["First Name", "Last Name", "Role", "Deparment", "Salary","Manager"],values);
 


// Inquire prompt for main menu

inquirer
    .prompt([
        {
            type: 'list',
            name: 'main_menu',
            message: 'Please select an action.',
            choices: ["View all departments", "View all roles", "View all employees",
                "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        },
    ]);


// Verification that the app is connected.
app.listen(PORT, () => {
    console.log('Server is running on port 3001')
});