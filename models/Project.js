const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated:{
    type: Date,
    default: Date.now()
  }

})

module.exports = mongoose.model('Project', ProjectSchema)