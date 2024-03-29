USE employeetracker_db;

--View all departments
SELECT * FROM department

--View all roles
SELECT employeerole.id, employeerole.title, department.dept_name, employeerole.salary
FROM employeerole
JOIN department ON employeerole.department_id = department.id;

--View all employees
SELECT a.id, a.first_name, a.last_name, 
employeerole.title, department.dept_name, employeerole.salary, CONCAT(b.first_name, ' ', b.last_name) as manager
FROM employee a
LEFT JOIN employeerole ON a.role_id = employeerole.id
LEFT JOIN department ON employeerole.department_id = department.id
LEFT JOIN employee b ON a.manager_id = b.id;

--Add a department
INSERT INTO department (dept_name) VALUES (?)

--Add a role
INSERT INTO employeerole (title, salary, department_id) VALUES (?, ?, ?)

--Add an employee 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)

--Update an employee
UPDATE employee SET role_id = ${roleID} WHERE first_name = " " AND last_name = " "



