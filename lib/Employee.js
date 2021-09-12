const Record = require('./Record.js');

class Employee extends Record{

    constructor(first_name, last_name, role_id = false, manager_id = false) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.table = 'employees';
    }
}

module.exports = Employee;