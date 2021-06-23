const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

// create server
const app = express();

// conect to db
connectDB()

// enable cors
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// hability express.json 
app.use(express.json({ extended: true }))

// app port
const port = process.env.port || 4000;

// import routes
app.use('/api/users', require('./routes/users.js'))
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/projects', require('./routes/projects.js'))
app.use('/api/task', require('./routes/task.js'))

app.listen(port, '0.0.0.0', () => {
  console.log(`el servidor esta trabajando en el puerto ${port}`)
})