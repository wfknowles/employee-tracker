const Record = require('./Record.js');

class Role extends Record {

    constructor(title, salary, department_id) {
        super();
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    table() {
        return 'roles';
    }

    params() {
        return ['title', 'salary', 'department_id'];
    }

    all() {
        // SQL Statement
        const sql = `SELECT R.title, R.salary, D.name AS department
                        FROM roles R
                        LEFT JOIN departments D ON R.department_id = D.id`;

        // SQL Params
        const params = [];

        // SQL Query
        return this.query(sql, params);
    }
}

module.exports = Role;