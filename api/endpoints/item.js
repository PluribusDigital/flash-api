var express = require('express');
var router = express.Router();
var pool = require('../db');

// ----------------------------------------------------------------------------
// Helpers

function get(id, res) {
    var sql = 'SELECT * FROM ITEMS WHERE id = $1'

    pool.query(sql, [id])
        .then(function(result) {
            if( result.rows.length > 0 ) {
                res.json(result.rows[0]);
            }
            else {
                res.status(404).json({});
            }
        }, echo_error(res));  
}

function echo_error(response) {
    return function(err) {
        response.status(500).json(err);
    };
};

// middleware to use for all requests
router.use(function timeLog(req, res, next) {
  console.log(new Date().toISOString(), req.method, req.baseUrl);
  next();
});

// ----------------------------------------------------------------------------
// Verb Handlers

router.get('/', function(req, res) {
    var sql = 'SELECT * FROM ITEMS ORDER BY id';

    pool.query(sql)
        .then(function(result) {
            res.json(result.rows);
        }, echo_error(res));  
});

router.get('/:item_id', function(req, res) {
    var id = req.params.item_id;
    get(id, res);
});

router.post('/', function(req, res) {
    var data = {text: req.body.text, complete: false};
    var sql = 'INSERT INTO items(text, complete) values($1, $2) RETURNING ID';

    pool.query(sql, [data.text, data.complete])
        .then(function (result) {
            var id = result.rows[0].id;
            res.status(201);
            get(id, res);
        }, echo_error(res));
});

router.put('/:item_id', function(req, res) {
    var id = req.params.item_id;
    var data = {text: req.body.text, complete: req.body.complete};
    var sql = 'UPDATE items SET text=($1), complete=($2) WHERE id=($3)';

    pool.query(sql, [data.text, data.complete, id])
        .then(function (result) {
            if( result.rowCount == 0 ) {
                res.status(404).json({});
            }
            else {
                get(id, res);
            }
        }, echo_error(res));
});

router.delete('/:item_id', function(req, res) {
    var id = req.params.item_id;
    var sql = 'DELETE FROM items WHERE id=($1)';

    pool.query(sql, [id])
        .then(function (result) {
            if( result.rowCount == 0 ) {
                res.status(404).json({});
            }
            else {
                res.status(204).json({});
            }
        }, echo_error(res));
});

router.patch('/:item_id', function(req, res) {
    res.json({
        message: 'UPDATE PARTIAL ITEM',
        id: req.params.item_id,
        item: req.body
    });
});

module.exports = router;