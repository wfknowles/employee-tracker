const db = require('../db/connection');
const cTable = require('console.table');

class Record {
    constructor() {
        this.table = "";
    }

    index() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${this.table}`;
  
            db.query(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(console.table(rows));
            });
        });
    }

    create(obj) {
        return new Promise((resolve, reject) => {
            const objErrors = this.getErrors(obj);
            if (objErrors) {
                reject(objErrors);
            }
            
            const sql = `INSERT INTO ${this.table} (${this.getKeys(obj)}) VALUES (${this.getValues(obj)})`;

            db.query(sql, obj, (sqlErrors, result) => {
                if (sqlErrors) {
                    reject(sqlErrors)
                }
                resolve(obj);
            });
        });
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    getValues(obj) {
        const values = [];

        Object.keys(obj).forEach(() => {
            values.push("?");
        });

        return values.join(",");
    }

    getErrors(obj) {
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
