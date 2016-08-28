
function ListController() {
  this.repository = require('./repository');
}

function get(req, res, next) {
  this.repository.getList(true, function(userList) {
    var response = {
        meta: {
          params: {},
          user: "TBD",
          date: new Date()
        },
        data: userList
    }
    res.status(200).json(response);
  });
}

ListController.prototype = {
  get: get
};

var listController = new ListController();

module.exports = listController;