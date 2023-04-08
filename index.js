// variable to utilize the mysql npm package, inquirer, fs module and console table
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
// const { resolveSoa } = require('dns');

// connection to the port
const PORT = process.env.PORT || 3001;



// connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
},
    console.log (`You are connected to the employees_db database.`)
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
 


// Variable set for the main question which would equate to the main menu when app is opened.

const mainQuestion =[
        {
            type: 'list',
            name: 'actions',
            message: 'Please select an action.',
            choices: ["View all departments", "View all roles", "View all employees",
                "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ];

function init () {
    let employee ="Employee";
    let manager = "Manager";

    inquirer.prompt([
        mainQuestion[0]
    ])
    .then((data) => {
        selectActions(data);
    })
};


// Assigning function to the main actions

function selectActions(data)
{
    switch (data.actions)
{
    case "View all departments":
        viewAllDepartments();
    case "View all roles":
        viewAllRoles();
    case "View all employees":
        viewAllEmployees ();
    case "Add an employee":
        addEmployee();
    case "Add a department":
        addDepartment();
    case "Add a role":
        addRole();
}}

// function to view all employees this will utilize a SQL query saved in the DB Query folder
function viewAllEmployees(){
    const sql = `SELECT 
    a.id, a.first_name, 
    a.last_name,
    employeerole.title,
    daprtment.dept_name,
    employeerole.salary, 
    CONCAT (b.first_name,' ', b.last_name) as manager
    FROM employee a 
    LEFT JOIN employeerole ON a.role_id = employeerole.id
    LEFT JOIN dapartment ON employeerole.department_id = department.id
    LEFT JOIN employee b ON a.manager_id = b.id;`;
db.promise().query(sql)
.then(([rows]) => {
    const table = cTable.getTable(rows);
    inquirer.prompt([ mainQuestion[0]])
    .then((data) => { selectActions(data);
    });
});
}


// function to add an employee (POST)

function addEmployee (){
    let managerArray =["None"];
    let roleArray =[];
    const sql = `SELECT CONCAT(first_name,' ', last_name) as manager FROM employee`;
    db.promise().query(sql)
    .then(([rows]) => {
        rows.forEach(x=> managerArray.push(x['manager']));
    });
const sql1= 'SELECT title FROM employeerole';
db.promise().query(sql1)
.then(([rows]) => {
    rows.forEach(x=> roleArray.push(x['title']));
});
inquirer.prompt([
    {
        type:"input",
        name: "employeefirstname",
        message: "Enter employee's first name."
    },
    {
        type:"input",
        name: "employeelastname",
        message: "Enter employee's last name."
    },
    {
        type:"list",
        name: "employeerole",
        message: "Select employee's role.",
        choices: roleArray
    },
    {
        type:"list",
        name: "employeemanager",
        message: "Select employee's manager ",
        choices: managerArray
    },
])

.then((data) => {
    const sql=`SELECT id FROM employeerole
    WHERE title = "${data.employeerole}"`;
    let roleId;
    db.promise().query(sql)
    .then(([rows]) => { 
    rows.forEach(x => {roleID =parstInt(x['id'])
});
const sql1 = `SELECT id FROM employee
WHERE CONCAT (first_name, ' ' , last_name) = "${data.employeemanager}"`;
let employeeId;
db.promise().query(sql1)
.then(([rows]) => {
if (data.employeemanager === "None") { 
    employeeId = null;
} else {
    rows.forEach(x=>employeeId =parstInt(x['id']));

}
let sql2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("${data.employeefirstname}", "${data.employeelastname}", ${roleId}, ${employeeId})`;
db.promise().query(sql2)
    .then(([rows]) => {
    });
console.log(`Added ${data.employeefirstname} ${data.employeelastname} to the database`);
inquirer.prompt([
    mainQuestion[0]
])
    .then((data) => {
        selectActions(data);
    });
});
});
});
}

// function to view all departments (GET)
function viewAllDepartments(){
        const sql = `SELECT * FROM department`;
        db.promise().query(sql)
            .then(([rows]) => {
                const table = cTable.getTable(rows);
                console.log(table);
                inquirer.prompt([
                    mainQuestion[0]
                ])
                    .then((data) => {
                        selectActions(data);
                    });
            });
    }

// function to add a department (POST)

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptname',
            message: 'Input department name.',
        }
    ])
        .then((data) => {
            let sql = `INSERT INTO department (dept_name) VALUES ("${data.deptname}")`;
            db.promise().query(sql)
                .then(([rows]) => {
                    console.log(`Added ${data.deptname} to the database`);
                    inquirer.prompt([
                        mainQuestion[0]
                    ])
                        .then((data) => {
                            selectActions(data);
                        });

                });
        });
}


// function to view all roles (GET)

function viewAllRoles (){
    const sql = `SELECT employeerole.id, employeerole.title, department.dept_name, employeerole.salary
    FROM employeerole
    JOIN department ON employeerole.department_id = department.id`;
db.promise().query(sql)
.then(([rows]) => {
const table = cTable.getTable(rows);
console.log(table);
inquirer.prompt([
    mainQuestion[0]
])
    .then((data) => {
        selectActions(data);
    });
});
}


// function to add a role (POST)
function addRole(){
    let deptArray = [];
    const sql = `SELECT dept_name FROM department`;
    db.promise().query(sql)
        .then(([rows]) => {
            rows.forEach(x => deptArray.push(x['dept_name']));
        });
    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'rolesalary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'roledept',
            message: 'Which department does the role belong too?',
            choices: deptArray
        },
    ])
        .then((data) => {
            const sql1 = `SELECT * FROM department`;
            let departmentId;
            db.promise().query(sql1)
                .then(([rows]) => {
                    rows.forEach(x => {
                        if (data.roledept === x['dept_name']) {
                            departmentId = parseInt(x['id']);
                        }
                    });
                    let sql = `INSERT INTO employeerole (title, salary, department_id) VALUES ("${data.rolename}", "${data.rolesalary}", ${departmentId})`;
                    db.promise().query(sql)
                        .then(([rows]) => {
                        });
                    console.log(`Added new role to the DB`);
                    inquirer.prompt([
                        mainQuestion[0]
                    ])
                        .then((data) => {
                            selectActions(data);
                        });
                });
        });

}

// Init function to start he application
init();