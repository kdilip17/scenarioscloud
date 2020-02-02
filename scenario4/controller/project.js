var Project = require("../model/project");

var projectController = {};

// create project and send back all projects after creation
projectController.createProject = async function(req, res) {
  try {
    let project = Project.create(req.payload);
    if (project) {
      return Project.find();
    }
  } catch (error) {
    throw new TypeError(error.message);
  }
};

// get a project by ID
projectController.getProjectById = async function(req, res) {
  try {
    const id = req.params.project_id;
    let project = await Project.findById(id);
    return project;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

//get all project data from db
projectController.getProjects = async function(req, res) {
  try {
    // use mongoose to get all employees in the database
    let projects = await Project.find();
    if (req.payload && req.payload.search && req.payload.search.trim != "") {
      let query = {
        $or: [
          { projectName: { $regex: req.payload.search, $options: "i" } },
          {
            "projectMembers.employeeFullName": {
              $regex: req.payload.search,
              $options: "i"
            }
          }
        ]
      };
      projects = await Project.find(query);
    }
    return projects;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

//get all project data from db based on search
projectController.getProjectsBySearch = async function(req, res) {
  try {
    let response = {
      status: 400,
      success: false,
      message: "Access denied! Please check the request"
    };
    if (!req.decoded) {
      return response;
    } else if (req.decoded && req.decoded.designation) {
      if (req.params.type == "EBPL" && req.decoded.designation !== "PL") {
        return response;
      }
    }
    // use mongoose to get all projects in the database
    if (req.payload && req.payload.search && req.payload.search.trim != "") {
      let selectedValues = {};
      let query = {};
      let type = req.params.type;
      if (type == "PBE" || type == "PBPL" || type == "EBPL") {
        selectedValues = {
          projectName: 1,
          _id: 1,
          startDate: 1,
          endDate: 1
        };
        query = {
          "projectLead.employeeFullName": {
            $regex: req.payload.search,
            $options: "i"
          }
        };

        if (type == "PBE" || type == "EBPL") {
          if (type == "EBPL") {
            selectedValues.projectMembers = 1;
          } else {
            selectedValues.projectLead = 1;
          }
          query = {
            "projectMembers.employeeFullName": {
              $regex: req.payload.search,
              $options: "i"
            }
          };
          if (type == "PBE" && req.decoded.designation !== "PL") {
            query = {
              $and: [
                { "projectMembers.employeeId": req.decoded.id },
                {
                  "projectMembers.employeeFullName": {
                    $regex: req.payload.search,
                    $options: "i"
                  }
                }
              ]
            };
          }
        }
      } else if (type == "EBP") {
        selectedValues = {
          _id: 0,
          projectName: 1,
          projectMembers: 1
        };
        query = { projectName: { $regex: req.payload.search, $options: "i" } };
      }
      let projects = await Project.find(query, selectedValues);
      return projects;
    } else {
      let projects = await Project.find();
      return projects;
    }
  } catch (error) {
    throw new TypeError(error.message);
  }
};

// update project and send back all projects after creation
projectController.updateProject = async function(req, res) {
  // create mongose method to update a existing record into collection
  try {
    const id = req.params.project_id;
    const data = req.payload;
    let project = await Project.findByIdAndUpdate(id, data);
    return "Successfully! Project updated - " + data.projectName;
  } catch (error) {
    throw new TypeError(error.message);
  }
};

// delete a project by id
projectController.deleteProject = async function(req, res) {
  try {
    let id = req.params.project_id;
    await Project.remove({
      _id: id
    });
    return "Successfully! Project has been Deleted.";
  } catch (error) {
    throw new TypeError(error.message);
  }
};

module.exports = projectController;
