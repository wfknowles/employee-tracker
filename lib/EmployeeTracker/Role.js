const Record = require('./Record.js');

class Role extends Record {

    constructor(obj = false) {
        super();
        this.title = obj.title || '';
        this.salary = obj.salary || 0;
        this.department_id = obj.department_id || null;
    }

    label(role) {
        return role.title;
    }

    table() {
        return 'roles';
    }

    params() {
        return ['title', 'salary', 'department_id'];
    }

    sql() {
        // Base SQL Statement
        return `SELECT R.title, R.salary, D.name AS department
                    FROM roles R
                    LEFT JOIN departments D ON R.department_id = D.id`;
    }
}

module.exports = Role;