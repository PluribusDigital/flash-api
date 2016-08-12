var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function timeLog(req, res, next) {
  console.log(new Date().toISOString(), req.method, req.baseUrl);
  next();
});

router.get('/', function(req, res) {
    res.json({ message: 'ITEMS' });
});

router.get('/:item_id', function(req, res) {
    res.json({
        message: 'ITEM',
        id: req.params.item_id
    });
});

router.post('/', function(req, res) {
    res.status(201).json({ 
        message: 'POSTED ITEM',
        item: req.body
    });
});

router.put('/:item_id', function(req, res) {
    res.json({
        message: 'UPDATE FULL ITEM',
        id: req.params.item_id,
        item: req.body
    });
});

router.delete('/:item_id', function(req, res) {
    res.status(204).json({
        message: 'DELETE ITEM',
        id: req.params.item_id
    });
});

router.patch('/:item_id', function(req, res) {
    res.json({
        message: 'UPDATE PARTIAL ITEM',
        id: req.params.item_id,
        item: req.body
    });
});


module.exports = router;