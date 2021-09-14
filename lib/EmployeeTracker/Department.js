const Record = require('./Record.js');

class Department extends Record {

    constructor(name) {
        super();
        this.name = name;
    }

    table() {
        return 'departments';
    }

    params() {
        return ['name'];
    }

    all() {
        // SQL Statement
        const sql = `SELECT * departments`;

        // SQL Params
        const params = [];

        // SQL Query
        return this.query(sql, params);
    }
}

module.exports = Department;