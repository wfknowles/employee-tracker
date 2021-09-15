const db = require('../../db/connection');

/*
    This is an okay base class for interacting with a mysql db
*/

class Record {
    constructor() {
        // Id to be managed by db
        this.id = null;
    }

    label() {
        // initialize each record with a label
    }

    table() {
        // initialize each record with the sql table name
    }

    params() {
        // initialize each record with an array of whitelisted params
    }

    sql() {
        // initialize each record with it base sql query
    }

    // Base Query Method
    query(sql, params = [], logObj = false) {
        return new Promise((resolve, reject) => {

            // SQL Query
            db.query(sql, params, (sqlErrors, result) => {
                if (sqlErrors) {
                    // Return any SQL Errors
                    reject(console.log("sqlErrors", {
                        sql: sql,
                        params: params,
                        errors: sqlErrors,
                        log: logObj
                    }))
                }

                // console.log('logObj', logObj);

                resolve(result);
            });
        });
    }

    // Base Find Method
    find(value = false, key = false) {
        // Find All
        let sql = this.sql();

        if (key && value) {
            // Find By
            sql += `\nWHERE ${key} = ?`;
        } else if (!key && value) {
            // Find By ID
            sql += `\nWHERE id = ?`;
        }

        const logObj = {
            sql: sql,
            key: key,
            value: value
        };

        return this.query(sql, value, logObj);
    }

    // Return all table records
    index() {
        const sql = `SELECT * FROM ${this.getTable()}`
        return this.query(sql);
    }

    // Create record in db
    create(object) {
        return new Promise((resolve, reject) => {
            // Validate Object before creation
            const objErrors = this.getErrors(object);
            if (objErrors) {
                reject(console.log("objErrors", objErrors));
            }
            
            // SQL Statement: Insert into table row
            const sql = `INSERT INTO ${this.getTable()} (${this.getParams()}) VALUES (${this.getReplaced(object)})`;

            // SQL Params
            const params = this.getValues(object);

            // Log Objects
            const logObj = {
                klass: this,
                object: object
            }

            this.query(sql, params, logObj).then(result => {
                resolve(this.read(result.insertId));
            });
        });
    }

    // Read record from db
    read(id = false) {
        const sql = `SELECT * FROM ${this.getTable()} WHERE id = ?`;
        const params = id || this.getId();
        return this.query(sql, params).then(result => {
            return result[0];
        });
    }

    // Update record in db
    update(obj)  {
        return new Promise((resolve, reject) => {
            // Cast object to separate id from other properties
            const {id, ...props} = obj;

            // Initialize SQL Variables
            let setProps = [];
            let setParams = [];

            // Iterate over props and add to SQL Variables
            for ( const prop in props ) {
                setProps.push(`${prop} = ?`);
                setParams.push(obj[prop]);
            }

            // Push ID last to conform to SQL query structure
            setParams.push(id);

            // SQL Statement
            const sql = `UPDATE ${this.getTable()} SET ${setProps.join(', ')} WHERE id = ?`;

            // SQL Params
            const params = setParams;

            // Log Objects
            const logObj = {
                obj: obj,
                props: setProps,
                params: setParams,
            }

            // Execute Query
            this.query(sql, params, logObj).then(() => {
                resolve(this.read(id));
            })
        });
    }

    // Destroy record in DB
    destroy(id) {
        const sql = `DELETE FROM ${this.getTable()} WHERE id = ?`;
        const params = id;
        return this.query(sql, params);
    }

    // Get object id
    getId() {
        return this.id;
    }

    // Get object table name
    getTable() {
        return this.table();
    }

    // Get object base sql query
    getSql() {
        return this.sql();
    }

    // Gets object parameters
    getParams() {
        return this.params();
    }

    // Return question mark array for each object property
    getReplaced(object) {
        const values = [];

        this.params().forEach(() => {
            values.push("?");
            
        });

        return values.join(",");
    }

    // Return value array
    getValues(object) {
        const values = [];

        this.params().forEach(prop => {
            values.push(object[prop]);

        });

        return values;
    }

    // This is hardly validation...
    getErrors(object) {
        const errors = [];

        this.params().forEach(prop => {
            if (object[prop] === undefined || object[prop] === '') {
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
}

module.exports = Record;
