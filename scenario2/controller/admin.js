let jwt = require('jsonwebtoken');
var general = require('../config/general');
var Employee = require('../model/employee');

var adminController = {};

adminController.createAuthentication = async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if(username !== "admin"){
      let query = {};
      query.email = new RegExp(req.body.username, 'i');
      query.password = password;
      let employee = await Employee.findOne(query);
      if(!employee){
        res.sendStatus(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      } else {
        let token = jwt.sign({username: username, designation: employee.designation, id: employee._id},
            general.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      }
    } else if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
            general.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.sendStatus(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
}

adminController.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, general.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };

module.exports = adminController;