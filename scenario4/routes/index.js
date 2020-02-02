var employee = require('./employee');
var admin = require('./admin');
var project = require('./project');

module.exports = [].concat(employee, admin, project);