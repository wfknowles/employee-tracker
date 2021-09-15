const Record = require('./Record.js');

class Employee extends Record {

    constructor(obj = false) {
        super();
        this.first_name = obj.first_name || '';
        this.last_name = obj.last_name || '';
        this.role_id = obj.role_id || null;
        this.manager_id = obj.manager_id || null;
    }

    label(employee) {
        return `${employee.first_name} ${employee.last_name}`;
    }

    table() {
        return 'employees';
    }

    params() {
        return ['first_name', 'last_name', 'role_id', 'manager_id'];
    }

    sql() {
        // Base SQL Statement
        return `SELECT E.first_name, E.last_name, R.title AS title, D.name AS department, R.salary AS monthly_salary, CONCAT(M.first_name, ' ', M.last_name) AS manager
                    FROM employees E
                    LEFT JOIN roles R ON E.role_id = R.id 
                    LEFT JOIN departments D ON R.department_id = D.id
                    LEFT JOIN employees M ON E.manager_id = M.id`;
    }
}

module.exports = Employee;