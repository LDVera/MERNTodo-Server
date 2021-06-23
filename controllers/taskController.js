const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
  // check if have some errors
  const errors = validationResult(req)
  if ( !errors.isEmpty() ){
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const { project } = req.body

    

    const checkproject = await Project.findById(project)
    if(!checkproject){
      return res.status(404).json({msg: 'project not found'})
    }

    // check if the auth user is the owner or the actual project
    // verify the creator of the project
    if(checkproject.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    // crate the task
    const task = new Task(req.body)
    await task.save()
    res.json({task})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'ocurrio un problema'})
  }
}

exports.getTask = async (req, res) => { 

  try {
    const { project } = req.query

    const checkproject = await Project.findById(project)
    if(!checkproject){
      return res.status(404).json({msg: 'project not found'})
    }

    // check if the auth user is the owner or the actual project
    // verify the creator of the project
    if(checkproject.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    const task = await Task.find({ project: project })
    res.json({task})

  } catch (error) {
    console.log(error)
    res.status(500).send("have a error, check it")
  }
}

exports.updateTask = async (req, res) =>{
  try {
    
    const { project, name, state } = req.body

    let task = await Task.findById(req.params.id)
    if(!task){
      return res.status(404).json({msg: 'dont have that task'})
    }

    const checkproject = await Project.findById(project)
    // check if the auth user is the owner or the actual project
    // verify the creator of the project
    console.log(checkproject)
    if(checkproject.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    
    // create an obtject with the new info
    const newTask = {}
    newTask.name = name
    newTask.state = state

    // save the task
    task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new : true})
    res.json({task})

  } catch (error) {
    console.log(error)
  }
}

exports.deleteTask = async (req, res) => {
  try {
    
    const { project } = req.query

    // console.log(req.query)

    // check if the task exist
    let task = await Task.findById(req.params.id)
    if(!task){
      return res.status(404).json({msg: 'dont have that task'})
    }

    const checkproject = await Project.findById(project)
    // check if the auth user is the owner or the actual project
    // verify the creator of the project
    console.log(checkproject)
    if(checkproject.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    // delete 
    await Task.findByIdAndRemove({_id: req.params.id})
    res.json({msg: "Tarea eliminada"})
  } catch (error) {
    console.log(error)
  }
}