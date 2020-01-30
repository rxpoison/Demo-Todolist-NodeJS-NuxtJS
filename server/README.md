# Demo-Todolist-NodeJS-NuxtJS

# Server
- NodeJS
- Express

Connect MySQL
```
$ npm init -y

$ npm install express --save
$ npm install body-parser
$ npm install cors
$ npm install mysql2
$ npm install --save sequelize
$ npm install --save-dev nodemon
หรือ 
$ npm install express body-parser cors mysql2 sequelize nodemon
```
create server.js
```
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var tasks = require('./routes/tasks')
var cors = require('cors')

var port = 8008

var app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', tasks)

app.listen(port, function() {
  console.log('Server started on port ' + port)
})

```
mkdir database 

- create db.js
```
const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("server", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

mkdir models 

- create Task.js
```
const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "task",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
```

mkdir routes
- create index.js
```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;
```
- create tasks.js
```
var express = require('express')
var router = express.Router()
const Task = require('../models/Task')

// Get All Tasks
router.get('/tasks', (req, res, next) => {
  Task.findAll()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/task', (req, res, next) => {
  if (!req.body.task_name) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    Task.create(req.body)
      .then(() => {
        res.send('Task Added!')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
})

router.delete('/task/:id', (req, res, next) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send('Task deleted!')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// Update Task
router.put('/task/:id', (req, res, next) => {
  if (!req.body.task_name) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    Task.update(
      { task_name: req.body.task_name },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send('Task Updated!')
      })
      .error(err => handleError(err))
  }
})

module.exports = router
```
