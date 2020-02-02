var projectController = require("../controller/project")
var adminController = require("../controller/admin");

module.exports = [
    { method: 'POST', path: '/projects/create', handler: projectController.createProject },
    { method: 'GET', path: '/projects/{project_id}', handler: projectController.getProjectById },
    { method: 'PUT', path: '/projects/{project_id}', handler: projectController.updateProject },
    { method: 'DELETE', path: '/projects/{project_id}', handler: projectController.deleteProject },
    { method: 'POST', path: '/projects', handler: projectController.getProjects },
    { method: 'POST', path: '/projects/search/{type}',config: {
        pre:[
        {method: adminController.checkToken, assign: 'auth'},
        ],
        handler: projectController.getProjectsBySearch
    }}
];


