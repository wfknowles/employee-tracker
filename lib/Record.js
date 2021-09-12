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
                // Promise?
                resolve(console.table(rows));
            });
        });
    }

    // create() {
    //     return new Promise((resolve, reject) => {

    //         //internal error check

    //         const sql = `INSERT INTO ${this.table} (${Object.keys(this)}) VALUES (?,?,?)`;
  
    //         // const params = Record.setParams(req.params.record, req.body);
    //         const params = [req.body.first_name, req.body.last_name, req.body.industry_connected];

    //         db.query(sql, params, (err, result) => {
    //             if (err) {
    //                 res.status(400).json({ error: err.message });
    //                 return;
    //             }
    //             res.json({
    //                 message: 'success',
    //                 data: body
    //             });
    //         });
    //     });
    // }

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
