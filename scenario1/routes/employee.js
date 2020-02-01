var express = require('express');
var router = express.Router();
var employeeController = require("../controller/employee")

router.post('/create', (req,res)=>employeeController.createEmployee(req, res));
router.get('/:employee_id', (req,res)=>employeeController.getEmployeeById(req, res));
router.put('/:employee_id', (req,res)=>employeeController.updateEmployee(req, res));
router.delete('/:employee_id', (req,res)=>employeeController.deleteEmployee(req, res));
router.get('/', (req,res)=>employeeController.getEmployees(req, res));

module.exports = router;
