-- Seeds to upload intiial values to SQL tables


-- Seed information to populate the department table, IDs should autopop
INSERT INTO department(dept_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");
       
-- Seed information to populate the role table
INSERT INTO role(title,salary,department_id)
VALUES ("Accountant", 125000,2),
       ("Accountant Manager", 160000,2),
       ("Lawyer", 190000,3)
       ("Legal Team Lead", 250000,3),
       ("Lead Engineer", 150000,1),
       ("Salesperson", 80000, 4),
       ("Sales Lead", 100000,4)
       ("Software Engineer", 120000,1);
       


-- See information to populate the employee table
INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES  
-- managers
        ("John", "Doe", 1, null),
        ("Ashley", "Rodriguez", 3, null),
        ("Kunal", "Singh", 5, null),
        ("Sarah", "Lourd", 7, null),
-- employees
        ("Mike", "Chan", 2, 1),
        ("Kevin", "Tupik", 4, 3),
        ("Malia", "Brown", 6, 5),
        ("Tom", "Allen", 8, 7);