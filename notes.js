/*

For a node project with a an express server and mysql db, here is a good base project map:

* Setup git repo and clone to local machine
    - include .gitignore and README.md
* Pseudo-code neccessary objects and routes
* Setup server and required npm modules
    - run: npm init --y
    - run: npm install express mysql2
    - run: npm install jest --save-dev
    - update package.json file to use/start server.js and jest for testing
    - create server.js file
        - require express, db, and any routes
        - setup neccessary middleware
        - setup db connection
* Setup mysql database
    - create db folder and create connection.js, db.sql, schema.sql, seeds.sql
    - run: mysql -u root -p
    - source db, schema, and seed files in mysql
* Setup routes
    - create routes folder and add neccessary folders/files
    - test all api endpoints


Classes:
EmployeeTracker - app wrapper - start, action-menu, action-handler
Record - record handler - whitelisting, index, create, update, delete
Employee
Department
Role


start
menu: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

-all departments: formatted table, department.name and department.id
-all roles: job_title, role.id, role.department, role.salary
-all employees: formatted table, employee.id, employee.first_name, employee.last_name, job_titles, departments, salaries, and employee.managers
-add department: prompt to enter department name
-add role: prompt to enter name, salary, and department
-add employee: prompt to enter first name, last name, role, and manager
-update employee role: prompt to select employee and update role
-update employee department: prompt to select employee and update department *bonus*
-view employees by manager *bonus*
-view employees by department *bonus*
-delete department, role, and employee *bonus*
-view department by cumulative salary *bonus*

asynchronous queries: https://www.npmjs.com/package/mysql2

REQS:

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

BONUS: 
- Update employee managers.
- View employees by manager.
- View employees by department.
- Delete departments, roles, and employees.
- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

*/