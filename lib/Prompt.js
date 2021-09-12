const inquirer = require('inquirer');

class Prompt {
    constructor() {

    }

    menu() {
        return inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'Select a team member to add:',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee'],
                
            });
    }

    addDepartment() {
        // add department
    }

    addRole() {
        // add role
    }

    addEmployee() {
        return inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'first_name',
                    message: 'First Name: (Required)',
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
                    message: 'Last Name: (Required)',
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
                    message: 'Select a team member to add:',
                    choices: ['get all roles'],
                
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select a team member to add:',
                    choices: ['get all employees'],
                
                }
            ]);
    }
}

module.exports = Prompt;