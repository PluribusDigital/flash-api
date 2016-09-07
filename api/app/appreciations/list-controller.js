var meta = require('../meta/controller');

function ListController() {
  this.repository = require('./repository');
}

function get(req, res, next) {

  this.repository.getList(true, req.query, function(apprecList) {
    var response = {
        meta: meta.get(req),
        data: apprecList
    }
    res.status(200).json(response);
  });

};

ListController.prototype = {
  get: get
};

var listController = new ListController();

module.exports = listController;
