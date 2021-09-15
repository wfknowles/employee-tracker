const Record = require('./Record.js');

class Department extends Record {

    constructor(obj = false) {
        super();
        this.name = obj.name || '';
    }

    label(department) {
        return department.name;
    }

    table() {
        return 'departments';
    }

    params() {
        return ['name'];
    }

    sql() {
        // Base SQL Statement
        return `SELECT departments.name AS department FROM departments`;
    }

    budget() {
        // SQL Statement
        const sql = `SELECT D.name AS departments, SUM(R.salary) AS monthly_total
                    FROM employees E
                    LEFT JOIN roles R ON E.role_id = R.id 
                    LEFT JOIN departments D ON R.department_id = D.id
                    GROUP BY department_id`;

        // SQL Params
        const params = [];

        // SQL Query
        return this.query(sql, params);
    }
}

module.exports = Department;