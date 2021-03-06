const inquirer = require('inquirer');

/*
    In a perfect world, I could write this class with a single inquirer 
    prompt and have the methods solely return question arrays
*/

class Prompt {
    constructor() {

    }

    menu(exit = false) {
        
        let options = [
            'View Employees by Department',
            'View Employees by Role',
            'View Employees by Manager',
            'View Department Salaries', 
            'View All Departments', 
            'View All Roles', 
            'View All Employees',
            'Add An Employee', 
            'Update Employee Role',
            'Update Employee Manager',
            'Delete An Employee',
            'Add A Role',
            'Delete A Role',
            'Add A Department',
            'Delete A Department'
        ];

        if (exit) {
            options.push('Exit');
        }

        return inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: options,
                
            }).then(menu => {
                return menu.action
            });
    }

    add(newObj, promptVars = false) {
        switch (newObj.constructor.name) {
            case 'Department':
                return this.addDepartment();
            case 'Role':
                return this.addRole(promptVars.departments);
            case 'Employee':
                return this.addEmployee(promptVars.roles, promptVars.employees);
        }
    }

    addDepartment() {
        return inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'Department Name: (Required)',
                    validate: name => {
                        if (name) {
                            return true;
                        } else {
                            return 'You need to enter a department name!';
                        }
                    }
                
            }).then(department => {
                return department;
            });
    }

    addRole(departmentPromise) {
        return departmentPromise.then( departments => {

            let allDepartments = [];

            departments.forEach(department => {
                allDepartments.push({
                    name: department.name,
                    value: department.id
                });
            });

            return inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'title',
                    message: 'What is the name of the role?',
                    validate: title => {
                        if (title) {
                            return true;
                        } else {
                            return 'You need to enter a role title!';
                        }
                    }
                    
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for the role?',
                    validate: salary => {
                        if (salary) {
                            return true;
                        } else {
                            return 'You need to enter a number great than 0.00!';
                        }
                    }
                    
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department do you want to assign the role?',
                    choices: allDepartments
                }
            ]).then(role => {
                return role;
            });
        });
    }

    addEmployee(rolePromise, employeePromise) {
        return rolePromise
            .then( roles => {
                let allRoles = [];
                
                roles.forEach(role => {
                    allRoles.push({
                        name: role.title,
                        value: role.id
                    });
                });

                return allRoles;
            })
            .then(allRoles => {
                return employeePromise.then( employees => {
                    let allEmployees = [];
    
                    employees.forEach(employee => {
                        allEmployees.push({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        });
                    });
    
                    return {
                        allRoles: allRoles,
                        allEmployees: allEmployees
                    };
                });
            })
            .then(data => {
                return inquirer
                    .prompt([
                        {
                            type: 'text',
                            name: 'first_name',
                            message: 'What is the employees first name?',
                            validate: firstName => {
                                if (firstName) {
                                    return true;
                                } else {
                                    return 'You need to enter a first name!';
                                }
                            }
                        },
                        {
                            type: 'text',
                            name: 'last_name',
                            message: 'What is the employees last name?',
                            validate: lastName => {
                                if (lastName) {
                                    return true;
                                } else {
                                    return 'You need to enter a last name!';
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'What is the employees role?',
                            choices: data.allRoles
                        
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'Who is the employees manager?',
                            choices: data.allEmployees
                        }
                    ])
                    .then(employee => {
                        return employee;
                    });
            });
    }

    select(newObj, message) {
        return newObj.index().then(objects => {
            let allObjects = [];

            objects.forEach(object => {
                allObjects.push({
                    name: newObj.label(object),
                    value: object.id
                });
            });

            allObjects.push({
                name: 'Cancel',
                value: 'Cancel'
            })

            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: message,
                        choices: allObjects
                    },
                ])
                .then(object => {
                    return object.id;
                });
        })
    }

    
}

module.exports = Prompt;