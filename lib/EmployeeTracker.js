const Prompt = require('./Prompt');

const Department = require('./EmployeeTracker/Department');
const Role = require('./EmployeeTracker/Role');
const Employee = require('./EmployeeTracker/Employee');

const cTable = require('console.table');
const figlet = require('figlet');

class EmployeeTracker {
    constructor() {
        
    }

    // Starts application
    start() {

        // render title illustration
        this.title().then(() => {
            // render menu
            this.actionMenu();
        })   
    }

    title() {
        return new Promise((resolve, reject) => {
            // render application illustration
            figlet('Employee\nTracker', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    reject();
                }
                resolve(console.log(data));
            });
        });
        
    }

    // app menu
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

    // app action handler
    actionHandler(action) {
        switch (action) {
            // View
            case 'View All Departments': 
                return this.findAll(new Department());
            case 'View All Roles': 
                return this.findAll(new Role());
            case 'View All Employees': 
                return this.findAll(new Employee());
            case 'View Employees by Department':
                return this.findBy(new Department(), 'department_id');
            case 'View Employees by Role': 
                return this.findBy(new Role(), 'E.role_id');
            case 'View Employees by Manager': 
                return this.findBy(new Employee(), 'E.manager_id');
            case 'View Department Salaries': 
                return new Department().budget()
                .then(departments => {
                    console.log(`\n\n>> Total Salaries Per Department\n`);
                    console.table(departments);
                });
            
            // Add
            case 'Add A Department': 
                return this.add(new Department())
            case 'Add A Role': 
                return this.add(new Role, {
                    departments: new Department().index()
                });
            case 'Add An Employee': 
                return this.add(new Employee, {
                    roles: new Role().index(),
                    employees: new Employee().index()
                });

            // Update
            case 'Update Employee Manager': 
                return this.update(new Employee, {
                    key: 'manager_id',
                    label: 'Manager',
                    object: new Employee(),
                });
            case 'Update Employee Role': 
                return this.update(new Employee, {
                    key: 'role_id',
                    label: 'Role',
                    object: new Role(),
                });

            // Delete
            case 'Delete A Department': 
                return this.delete(new Department());
            case 'Delete A Role': 
                return this.delete(new Role());
            case 'Delete An Employee': 
                return this.delete(new Employee());
        }
    }

    add(newObj, promptVars = false) {
        return new Prompt().add(newObj, promptVars).then( object => {
            return newObj.create(object).then( object => {
                console.log(`>> ${newObj.label(object)} succesfully created!\n`);
                return object;
            })
        })
    }

    update(newObj, promptVars = false) {
        const objName = newObj.constructor.name;
        return new Prompt().select(newObj, `Which ${objName} do you want to update?`)
        .then(obj_id => {
            if (obj_id == 'Cancel') {
                return;
            } else {
                return new Prompt().select(promptVars.object, `Which ${promptVars.label} do you want to select for the ${objName}?`)
                .then(update_id => {
                    if (update_id == 'Cancel') {
                        return;
                    } else {
                        let updateObj;
                        updateObj.id = obj_id;
                        updateObj[promptVars.key] = update_id;

                        return newObj.update(updateObj).then(object => {
                            console.log(`>> ${newObj.label(object)} succesfully updated!\n`);
                            return object;
                        });
                    }
                })
            }
        });
    }

    delete(newObj) {
        const objName = newObj.constructor.name;
        return new Prompt().select(newObj, `Which ${objName} do you want to delete?`)
        .then(obj_id => {
            if (obj_id == 'Cancel') {
                return;
            } else {
                return newObj.destroy(obj_id).then(() => {
                console.log(`\n\n>> ${objName} successfully deleted!\n`);
                });
            }
        })
    }

    findAll(newObj) {
        return newObj.find()
        .then(objects => {
            console.log(`\n\n>> All ${newObj.table().charAt(0).toUpperCase() + newObj.table().slice(1)}\n`);
            console.table(objects);
        });
    }

    findBy(newObj, key) {
        const objName = newObj.constructor.name;
        return new Prompt().select(newObj, `Which ${objName} do you want to search by?`)
                .then(obj_id => {
                    if (obj_id == 'Cancel') {
                        return;
                    } else {
                        return newObj.read(obj_id)
                            .then(object => {
                                return {
                                    object: object,
                                    employees: new Employee().find(object.id, key)
                                };
                            })
                            .then(data => {
                                return data.employees.then(objects => {
                                    console.log(`\n\n>> Employees Within ${newObj.label(data.object)} ${objName}\n`);
                                    console.table(objects);
                                    return objects;
                                });
                            });
                    }     
                });
    }
}

module.exports = EmployeeTracker;