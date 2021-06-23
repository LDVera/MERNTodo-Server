const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProjects = async (req, res) => {

  // check if have some errors
  const errors = validationResult(req)
  if ( !errors.isEmpty() ){
    return res.status(400).json({errors: errors.array()})
  }

  try {
    // create a new project
    const project = new Project(req.body)
    // console.log(req.body.projectName.toString())

    // save the owner via jwt
    project.creator = req.user.id
    
    //converting to string to send 
    project.projectName = req.body.projectName.toString() 

    // saving the project
    project.save()
    res.json(project)


  } catch (error) {
    console.log(error)
  }
}

// get all the projects of the actual user
exports.getProjects = async (req, res) => {
  try {
    
    const projects = await Project.find({ creator: req.user.id }).sort({dateCreated: -1})
    res.json({projects})

  } catch (error) {
    console.log(error)
    res.status(500).send("have a error, check it")
  }
}

exports.updateProject = async (req, res) => {
  // check if have some errors
  const errors = validationResult(req)
  if ( !errors.isEmpty() ){
    return res.status(400).json({errors: errors.array()})
  }

  // extract the info from the project
  const {projectName} = req.body
  const newProject = {}

  if(projectName){
    newProject.projectName = projectName
  }

  try {

    // check the project id
    let project = await Project.findById(req.params.id)  

    // if the project exist or not
    if(!project){
      return res.status(400).json({msg: 'Project not finded'})
    }

    // verify the creator of the project
    if(project.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true})
    res.json({project})

  } catch (error) {
    console.log(error)
    res.status(500).send('error in the server')
  }
}

exports.deleteProject = async (req, res) => {
  
  try {
    
    // check the project id
    let project = await Project.findById(req.params.id)  

    // if the project exist or not
    if(!project){
      return res.status(400).json({msg: 'Project not finded'})
    }

    // verify the creator of the project
    if(project.creator.toString() !== req.user.id){
      return res.status(401).json({msg: 'unauntorized'})
    }

    // delete the project
    await Project.findOneAndRemove({_id : req.params.id})
    res.json({msg: 'project deleted'})


  } catch (error) {
    console.log(error)
    res.status(500).send('error in the server')
  }


}