const Record = require('./Record.js');

class Department extends Record {

    constructor(name) {
        super();
        this.name = name;
        this.table = 'departments';
    }
}

module.exports = Department;