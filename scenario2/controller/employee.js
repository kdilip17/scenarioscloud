var Employee = require('../model/employee');

var employeeController = {};

// create employee and send back all employees after creation
employeeController.createEmployee = function(req, res) {
	console.log(req.decoded);
    // create mongose method to create a new record into collection
    Employee.create(req.body, function(err, employee) {
        if (err)
            res.send(err);
 
        // get and return all the employees after newly created employe record
        Employee.find(function(err, employees) {
            if (err)
                res.send(err)
            res.json(employees);
        });
    });
}

// get a employee by ID
employeeController.getEmployeeById = function(req, res) {
	const id = req.params.employee_id;
	Employee.findById(id, function(err, employee) {
		if (err)
			res.send(err)
 
		res.json(employee);
	});
};

//get all employee data from db
employeeController.getEmployees = function(req, res) {
	// use mongoose to get all employees in the database
	if(req.body && req.body.search && req.body.search.trim != ""){
		Employee.find({'fullName' : new RegExp(req.body.search, 'i')}, 
			function(err, employees){
				// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(employees); // return all employees in JSON format
		});
	} else {
		Employee.find(function(err, employees) {
			// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(employees); // return all employees in JSON format
		});
	}
};

// update employee and send back all employees after creation
employeeController.updateEmployee = function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.employee_id;
	var data = {
		fullName : req.body.fullName
	}

	// save the user
	Employee.findByIdAndUpdate(id, data, function(err, employee) {
	if (err) throw err;

	res.send('Successfully! Employee updated - '+employee.fullName);
	});
};

// delete a employee by id
employeeController.deleteEmployee = function(req, res) {
	let id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
};

module.exports = employeeController;