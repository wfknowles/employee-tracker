const Prompt = require('./Prompt');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

class EmployeeTracker {
    constructor() {
        
    }

    start() {
        // render application illustration
        console.log("Employee Tracker");

        // testing only
        this.test();

        // start inquirer prompt
        this.actionMenu();
    }

    actionMenu() {
        // render inquirer menu
        new Prompt().menu().then(action => {
            this.actionHandler(action);
        });
    }

    actionHandler(action) {
        // handle user response
        switch (action) {
            case 'View All Departments': 
                new Department.index();
                break;
            case 'View All Roles': 
                new Role.index();
                break;
            case 'View All Employees': 
                new Employee().index();
                break;
            case 'Add Department': 
                new Prompt().addDepartment();
                break;
            case 'Add Role': 
                new Prompt().addRole();
                break;
            case 'Add Employee': 
                new Prompt().addEmployee();
                break;
            case 'Update Employee': 
                new Prompt().updateEmployee();
                break;
        }
    }

    test() {
        console.log("--testing");

    }
}

module.exports = EmployeeTracker;