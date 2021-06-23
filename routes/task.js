const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const taskController = require('../controllers/taskController')
const authmiddle = require('../middleware/authmiddle')

// create a task
// api/task
router.post('/',
  authmiddle,
  [
    check('name', 'needs the name').not().isEmpty(),
    check('project', 'needs the name').not().isEmpty()
  ],
  taskController.createTask
)

// api/task/id
router.get('/',
  authmiddle,
  taskController.getTask
)

router.put('/:id',
  authmiddle,
  taskController.updateTask
)

router.delete('/:id',
  authmiddle,
  taskController.deleteTask
)
module.exports = router