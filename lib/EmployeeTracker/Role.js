const Record = require('./Record.js');

class Role extends Record {

    constructor(title, salary, department_id) {
        super();
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
        this.table = 'roles';
    }
}

module.exports = Role;