var Employee = require("../model/employee");

var employeeController = {};

// create employee and send back all employees after creation
employeeController.createEmployee = async function(req, res) {
  try {
    let employee = await Employee.create(req.payload);
    if (employee) {
      let employees = await Employee.find();
      return employees;
    }
  } catch (error) { 
    throw new TypeError(error.message);
  }
};

// get a employee by ID
employeeController.getEmployeeById = async function(req, res) {
  try {
    const id = req.params.employee_id;
    let employee = await Employee.findById(id);
    return employee;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

//get all employee data from db
employeeController.getEmployees = async function(req, res) {
  try {
    // use mongoose to get all employees in the database
    let employees = await Employee.find();
    if (req.payload && req.payload.search && req.payload.search.trim != "") {
      employees = await Employee.find({
        fullName: new RegExp(req.payload.search, "i")
      });
    }
    return employees;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

// update employee and send back all employees after creation
employeeController.updateEmployee = async function(req, res) {
  try {
    // create mongose method to update a existing record into collection
    const id = req.params.employee_id;
    const data = {
      fullName: req.payload.fullName
    };
    const employee = await Employee.findByIdAndUpdate(id, data);
    return "Successfully! Employee updated - " + employee.fullName;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

// delete a employee by id
employeeController.deleteEmployee = async function(req, res) {
  try {
    let id = req.params.employee_id;
    await Employee.remove({
      _id: id
    });
    return "Successfully! Employee has been Deleted.";
  } catch (error) {
    throw new TypeError(error.message);
  }
};

module.exports = employeeController;
