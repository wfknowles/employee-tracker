    const express = require('express');
    const db = require('./db/connection');
    
    const EmployeeTracker = require('./lib/EmployeeTracker');

    // server
    const PORT = process.env.PORT || 3001;
    const app = express();

    // middleware
    app.use(express.json());

    //database
    const dbConnection = new Promise((resolve, reject) => {
        db.connect(err => {
            if (err) reject(err);
            console.log('Database connected.');

            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
                resolve();
            });
        });
    });

    // connect and start
    dbConnection.then(() => {
        new EmployeeTracker().start();
    });

    


