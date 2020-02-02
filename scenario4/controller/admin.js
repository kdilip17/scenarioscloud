let jwt = require("jsonwebtoken");
var general = require("../config/general");
var Employee = require("../model/employee");

var adminController = {};

adminController.createAuthentication = async function(req, res) {
  let username = req.payload.username;
  let password = req.payload.password;
  // For the given username fetch user from DB
  let mockedUsername = "admin";
  let mockedPassword = "password";

  if (username !== "admin") {
    let query = {};
    query.email = new RegExp(req.payload.username, "i");
    query.password = password;
    let employee = await Employee.findOne(query);

    if (!employee) {
      return {
        success: false,
        message: "Incorrect username or password"
      };
    } else {
      let token = jwt.sign(
        {
          username: username,
          designation: employee.designation,
          id: employee._id
        },
        general.secret,
        {
          expiresIn: "24h" // expires in 24 hours
        }
      );
      // return the JWT token for the future API calls
      return {
        success: true,
        message: "Authentication successful!",
        token: token
      };
    }
  } else if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      let token = jwt.sign({ username: username }, general.secret, {
        expiresIn: "24h" // expires in 24 hours
      });
      // return the JWT token for the future API calls
      return {
        success: true,
        message: "Authentication successful!",
        token: token
      };
    } else {
      return {
        success: false,
        message: "Incorrect username or password"
      };
    }
  } else {
    return {
      success: false,
      message: "Authentication failed! Please check the request"
    };
  }
};

adminController.checkToken = async (req, h) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      let decoded = await jwt.verify(token, general.secret);
      if (!decoded) {
        return {
          success: false,
          message: "Token is not valid"
        };
      } else {
        req.decoded = decoded;
        return true;
      }
    } else {
      return {
        success: false,
        message: "Auth token is not supplied"
      };
    }
  } catch (error) {
    if(error.message == "invalid token"){
      let resp = {
        success: false,
        message: "Token is not valid"
      }
      return h.response(resp).code(201)
    }
    return new TypeError(error.message);
  }
};

module.exports = adminController;
