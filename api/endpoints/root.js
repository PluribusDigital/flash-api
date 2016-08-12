var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var atom = [{
        title: 'Items',
        summary: 'Planets and stuff',
        links: [{
            href: req.baseUrl + '/item',
            rel: 'collection',
            title: 'Items',
            type: 'application/json'
        }]
    }];

    res.json(atom);
});

module.exports = router;