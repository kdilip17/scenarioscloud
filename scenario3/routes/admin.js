var adminController = require("../controller/admin");
module.exports = [
    { method: 'POST', path: '/login', handler: adminController.createAuthentication },
    { method: 'GET', path: '/', handler: function(request, reply){
      return { title: 'Hapi server' };
    }}
];