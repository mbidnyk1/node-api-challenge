const express = require('express');

const projectsRouter = require('../projects/projectsRouter')
const actionsRouter = require('../actions/actionsRouter')
const helmet = require('helmet')
const server = express();
server.use(helmet(), express.json())

server.use('/api/projects',projectsRouter)
server.use('/api/actions',logger,actionsRouter)

server.get('/', logger, (req, res) => {
    res.send(`<h2>Node API Sprint!</h2>`);
  });

function logger(req, res, next) {
    const today = new Date().toTimeString()
    console.log(`${today} ${req.method} to ${req.url}`)
    next()
  }
  
  
  
  module.exports = server;
  