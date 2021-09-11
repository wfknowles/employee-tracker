const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
// const Record = require('../../lib/Record.js');


// Index
router.get('/:record', (req, res) => {
    const sql = `SELECT * FROM ${req.params.record}`;
  
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Promise?
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Create
router.post('/:record', (req, res) => {
    // const errors = Record.errorCheck(req.params.record, req.body);
    const errors = inputCheck(body, 'whitelist');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    // const columns = Record.setColumns(req.params.record);
    const columns = "";
    const sql = `INSERT INTO ${req.params.record} (${columns})
                VALUES (?,?,?)`;
    // const params = Record.setParams(req.params.record, req.body);
    const params = [req.body.first_name, req.body.last_name, req.body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// READ
router.get('/:record/:id', (req, res) => {
    const sql = `SELECT * FROM ${req.params.record} WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // Promise?
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Update
router.put('/:record/:id', (req, res) => {
    // const errors = Record.errorCheck(req.params.record, req.body);
    const errors = inputCheck(req.body, 'whitelist');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    // const columns = Record.setColumns(req.params.record);
    const columns = '';
    const sql = `UPDATE ${req.params.record} SET ${columns}
                 WHERE id = ?`;
    // const params = Record.setParams(req.params.record, req.body);
    const params = [req.body.whitelist, req.params.id];
  
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Record not found'
            });
        } else {
            res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
            });
        }
    });
});

// Destroy
router.delete('/:record/:id', (req, res) => {
    const sql = `DELETE FROM ${req.params.record} WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Candidate not found'
            });
        } else {
            res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
            });
        }
    });
});

module.exports = router;