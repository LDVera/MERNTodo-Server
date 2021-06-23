const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const projectController = require('../controllers/projectController')
const authmiddle = require('../middleware/authmiddle')

// create projects
//  api/projects
router.post('/',
  authmiddle,
  [
    check('projectName', 'needs the project name').not().isEmpty()
  ],
  projectController.createProjects
)

router.get('/',
  authmiddle,
  projectController.getProjects
)

router.put('/:id',
  authmiddle,
  [
    check('projectName', 'needs the project name').not().isEmpty()
  ],
  projectController.updateProject
)

router.delete('/:id',
  authmiddle,
  projectController.deleteProject
)

module.exports = router
