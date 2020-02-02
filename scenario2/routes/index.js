var express = require('express');
var router = express.Router();
var adminController = require("../controller/admin")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express server' });
});
router.post('/login', (req,res)=>adminController.createAuthentication(req, res));

module.exports = router;
