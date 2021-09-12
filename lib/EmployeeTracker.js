const Prompt = require('./Prompt');

const Department = require('./EmployeeTracker/Department');
const Role = require('./EmployeeTracker/Role');
const Employee = require('./EmployeeTracker/Employee');

class EmployeeTracker {
    constructor() {
        
    }

    start() {
        // render application illustration
        console.log("Employee Tracker");

        // testing only
        this.test();

        // start inquirer prompt
        new Prompt().menu().then(action => {
            this.actionHandler(action);
        });
    }

    actionHandler(action) {
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
                new Prompt().addDepartment()
                .then(department => {
                    new Department().create(department);
                });
                break;
            case 'Add Role': 
                new Prompt().addRole()
                .then(role => {
                    new Role().create(role);
                });
                break;
            case 'Add Employee': 
                new Prompt().addEmployee()
                .then(employee => {
                    new Employee().create(employee);
                });
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