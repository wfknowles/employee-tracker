const Record = require('./Record.js');

class Employee extends Record {

    constructor(first_name, last_name, role_id, manager_id) {
        super();
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    table() {
        return 'employees';
    }

    params() {
        return ['first_name', 'last_name', 'role_id', 'manager_id'];
    }

    all() {
        // SQL Statement
        const sql = `SELECT E.first_name, E.last_name, R.title AS title, D.name AS department, R.salary AS monthly_salary, CONCAT(M.first_name, ' ', M.last_name) AS manager
                        FROM employees E
                        LEFT JOIN roles R ON E.role_id = R.id 
                        LEFT JOIN departments D ON R.department_id = D.id
                        LEFT JOIN employees M ON E.manager_id = M.id`;

        // SQL Params
        const params = [];

        // SQL Query
        return this.query(sql, params);
    }

    findByDepartment(id) {
        // SQL Statement
        const sql = `SELECT E.first_name, E.last_name, R.title AS title, D.name AS department, R.salary AS monthly_salary, CONCAT(M.first_name, ' ', M.last_name) AS manager
                        FROM employees E
                        LEFT JOIN roles R ON E.role_id = R.id 
                        LEFT JOIN departments D ON R.department_id = D.id
                        LEFT JOIN employees M ON E.manager_id = M.id
                        WHERE department_id = ?`;

        // SQL Params
        const params = [id];

        // SQL Query
        return this.query(sql, params);
    }

    findByRole(id) {
        // SQL Statement
        const sql = `SELECT * FROM employees WHERE role_id = ?`;

        // SQL Params
        const params = [id];

        // SQL Query
        return this.query(sql, params);
    }

    findByManager(id) {
        // SQL Statement
        const sql = `SELECT * FROM employees WHERE manager_id = ?`;

        // SQL Params
        const params = [id];

        // SQL Query
        return this.query(sql, params);
    }
}

module.exports = Employee;