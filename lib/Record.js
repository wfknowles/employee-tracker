class Record {
    constructor() {

    }

    getErrors(record) {
        const errors = [];

        Object.keys(this).forEach(prop => {
            if (this[prop] === undefined || this[prop] === '') {
                errors.push(`No ${prop} specified.`);
            }
        });

        if (errors.length) {
            return {
              error: errors.join(' ')
            };
          }
        
        return false;
        
    }

    getColumns() {
        return Object.keys(this);
    }
}

module.exports = Record;
