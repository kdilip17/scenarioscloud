var express = require('express');
var router = express.Router();
var projectController = require("../controller/project")

router.post('/create', (req,res)=>projectController.createProject(req, res));
router.get('/:project_id', (req,res)=>projectController.getProjectById(req, res));
router.put('/:project_id', (req,res)=>projectController.updateProject(req, res));
router.delete('/:project_id', (req,res)=>projectController.deleteProject(req, res));
router.get('/', (req,res)=>projectController.getProjects(req, res));

module.exports = router;