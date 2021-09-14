const Prompt = require('./Prompt');

const Department = require('./EmployeeTracker/Department');
const Role = require('./EmployeeTracker/Role');
const Employee = require('./EmployeeTracker/Employee');

const cTable = require('console.table');

class EmployeeTracker {
    constructor() {
        
    }

    // Starts application
    start() {
        // render application illustration
        console.log("Employee Tracker");

        // render menu
        this.actionMenu();
    }

    // CLI menu
    actionMenu(exit = false) {
        //render menu
        new Prompt().menu(exit)
        .then( action => {
            //handle response
            this.actionHandler(action)
            .then(() => {
                //re-render menu
                this.actionMenu(true);
            });
        });
    }

    // Handles CLI selection
    actionHandler(action) {
        switch (action) {
            // View All
            case 'View All Departments': 
                return new Department().index()
                .then(department => {
                    console.log(`\n\n>> All Departments\n`);
                    console.table(department);
                });
            case 'View All Roles': 
                return new Role().all()
                .then(role => {
                    console.log(`\n\n>> All Roles\n`);
                    console.table(role);
                });
            case 'View All Employees': 
                return new Employee().all()
                .then(employee => {
                    console.log(`\n\n>> All Employees\n`);
                    console.table(employee);
                });

            // View By
            case 'View Employees by Department': 
                return new Prompt().selectDepartment(new Department().index(), 'Which department do you want to search by?')
                .then(department_id => {
                    return new Department().read(department_id)
                    .then(department => {
                        return {
                            department: department,
                            employees: new Employee().findByDepartment(department.id)
                        };
                    })
                    .then(data => {
                        return data.employees.then(employees => {
                            console.log(`\n\n>> Employees Within ${data.department.name} Department\n`);
                            console.table(employees);
                            return employees;
                        });
                    });
                });
            case 'View Employees by Role': 
                return new Prompt().selectRole(new Role().index(), 'Which role do you want to search by?')
                .then(role_id => {
                    return new Role().read(role_id)
                    .then(role => {
                        return {
                            role: role,
                            employees: new Employee().findByRole(role.id)
                        };
                    })
                    .then(data => {
                        return data.employees.then(employees => {
                            console.log(`\n\n>> Employees With ${data.role.title} Role\n`);
                            console.table(employees);
                            return employees;
                        });
                    });
                });
            case 'View Employees by Manager': 
                return new Prompt().selectEmployee(new Employee().index(), 'Which manager do you want to search by?')
                .then(manager_id => {
                    return new Employee().read(manager_id)
                    .then(manager => {
                        return {
                            manager: manager,
                            employees: new Employee().findByManager(manager.id)
                        };
                    })
                    .then(data => {
                        return data.employees.then(employees => {
                            console.log(`\n\n>> Employees Managed By ${data.manager.first_name} ${data.manager.last_name}\n`);
                            console.table(employees);
                            return employees;
                        });
                    });
                });
            case 'View Department Salaries': 
                return new Department().budget()
                .then(departments => {
                    console.log('departments', departments);
                    console.log(`\n\n>> Total Salaries Per Department\n`);
                    console.table(departments);
                });
            

            // Add
            case 'Add A Department': 
                return new Prompt().addDepartment()
                .then(department => {
                    return new Department(department).create();
                })
                .then(department => {
                    console.log(`>> ${department.name} succesfully created!\n`);
                    return department;
                });
            case 'Add A Role': 
                return new Prompt().addRole(new Department().index())
                .then(role => {
                    console.log('role', role);
                    return new Role(role.title, role.salary, role.department_id).create();
                })
                .then(role => {
                    console.log(`>> ${role.title} succesfully created!\n`);
                    return role;
                });
            case 'Add An Employee': 
                return new Prompt().addEmployee(new Role().index(), new Employee().index())
                .then(employee => {
                    return new Employee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id).create();
                })
                .then(employee => {
                    console.log(`>> ${employee.first_name} ${employee.last_name} succesfully created!\n`);
                    return employee;
                });

            // Update
            case 'Update Employee Manager': 
                return new Prompt().updateEmployeeManager(new Employee().index())
                .then(employee => {
                    return new Employee().update({id: employee.id, manager_id: employee.manager_id})
                    .then(employee => {
                        console.log(`>> ${employee.first_name} ${employee.last_name} succesfully updated!\n`);
                        return employee;
                    });
                });
            case 'Update Employee Role': 
                return new Prompt().updateEmployeeRole(new Role().index(), new Employee().index())
                .then(employee => {
                    return new Employee().update({id: employee.id, role_id: employee.role_id})
                    .then(employee => {
                        console.log(`>> ${employee.first_name} ${employee.last_name} succesfully updated!\n`);
                        return employee;
                    });
                });

            // Delete
            case 'Delete A Department': 
                return new Prompt().selectDepartment(new Department().index(), 'Which department would you like to delete?')
                .then(department_id => {
                    return new Department().destroy(department_id);
                })
                .then(() => {
                    console.log(`>> Department succesfully deleted!\n`);
                });
            case 'Delete A Role': 
                return new Prompt().selectRole(new Role().index(), 'Which role would you like to delete?')
                .then(role_id => {
                    return new Role().destroy(role_id);
                })
                .then(() => {
                    console.log(`>> Role succesfully deleted!\n`);
                });
            case 'Delete An Employee': 
                return new Prompt().selectEmployee(new Employee().index(), 'Which employee would you like to delete?')
                .then(employee_id => {
                    return new Employee().destroy(employee_id);
                })
                .then(() => {
                    console.log(`>> Employee succesfully deleted!\n`);
                });
        }
    }
}

module.exports = EmployeeTracker;