var employeeController = require("../controller/employee");
module.exports = [
    { method: 'POST', path: '/employees/create', handler: employeeController.createEmployee },
    { method: 'GET', path: '/employees/{employee_id}', handler: employeeController.getEmployeeById },
    { method: 'PUT', path: '/employees/{employee_id}', handler: employeeController.updateEmployee },
    { method: 'DELETE', path: '/employees/{employee_id}', handler: employeeController.deleteEmployee },
    { method: 'POST', path: '/employees', handler: employeeController.getEmployees }
];
