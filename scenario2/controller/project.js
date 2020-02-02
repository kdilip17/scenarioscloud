var Project = require('../model/project');

var projectController = {};

// create project and send back all projects after creation
projectController.createProject = function(req, res) {
    // create mongose method to create a new record into collection
    Project.create(req.body, function(err, projects) {
        if (err)
            res.send(err);
 
        // get and return all the projects after newly created project record
        Project.find(function(err, projects) {
            if (err)
                res.send(err)
            res.json(projects);
        });
    });
}

// get a project by ID
projectController.getProjectById = function(req, res) {
	const id = req.params.project_id;
	Project.findById(id, function(err, project) {
		if (err)
			res.send(err)
 
		res.json(project);
	});
};

//get all project data from db
projectController.getProjects = function(req, res) {
	// use mongoose to get all projects in the database
	if(req.body && req.body.search && req.body.search.trim != ""){
		let query = {$or:[{"projectName":{$regex: req.body.search, $options: 'i'}},
		{"projectMembers.employeeFullName":{$regex: req.body.search, $options: 'i'}}]}
		Project.find(query, 
			function(err, projects){
				// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(projects); // return all projects in JSON format
		});
	} else {
		Project.find(function(err, projects) {
			// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(projects); // return all projects in JSON format
		});
	}
};

//get all project data from db based on search
projectController.getProjectsBySearch = function(req, res) {
	console.log(req.decoded)
	if(req.decoded && req.decoded.designation){
		if(req.params.type == "EBPL" && req.decoded.designation !== "PL"){
			return res.json({
				status: 400,
				success: false,
				message: 'Access denied! Please check the request'
			  });
		} 
	}
	// use mongoose to get all projects in the database
	if(req.body && req.body.search && req.body.search.trim != ""){
		let selectedValues = {};
		let query = {};
		let type = req.params.type
		if(type == "PBE" || type == "PBPL" || type == "EBPL"){
			selectedValues = { 
				projectName: 1,
				_id: 1, 
				startDate: 1,
				endDate: 1
			}
			query = { 'projectLead.employeeFullName' : { '$regex' : req.body.search, '$options' : 'i' } }
			
			if(type == "PBE" || type == "EBPL"){
				if(type == "EBPL"){
					selectedValues.projectMembers = 1;
				} else {
					selectedValues.projectLead = 1;
				}
				query = { 'projectMembers.employeeFullName' : { '$regex' : req.body.search, '$options' : 'i' } }
				if(type == "PBE" && req.decoded.designation !== 'PL'){
					query = {$and:[{"projectMembers.employeeId":req.decoded.id},
						{"projectMembers.employeeFullName":{$regex: req.body.search, $options: 'i'}}]}
				}
			}
		} else if(type == "EBP"){
			selectedValues = { 
				_id: 0,
				projectName: 1,
				projectMembers: 1
			}
			query = { 'projectName' : { '$regex' : req.body.search, '$options' : 'i' } }
		}
		Project.find(query, selectedValues,
			function(err, projects){
				// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(projects); // return all projects in JSON format
		});
	} else {
		Project.find(function(err, projects) {
			// if there is an error retrieving, send the error otherwise send data
			if (err)
				res.send(err)
			res.json(projects); // return all projects in JSON format
		});
	}
};

// update project and send back all projects after creation
projectController.updateProject = function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.project_id;
    var data = req.body

	// save the user
	Project.findByIdAndUpdate(id, data, function(err, project) {
	if (err) throw err;

	res.send('Successfully! Project updated - '+project.projectName);
	});
};

// delete a project by id
projectController.deleteProject = function(req, res) {
	let id = req.params.project_id;
	Project.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Project has been Deleted.');	
	});
};


module.exports = projectController;