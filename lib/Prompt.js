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
        // add employee
    }

    addRole() {
        // add employee
    }

    addEmployee() {
        // add employee
    }
}

module.exports = Prompt;