const router = require('express').Router()
const projs = require('../data/helpers/projectModel')
const acts = require('../data/helpers/actionModel')

const validateProjects = require('../utils/validateProjects')
const validateActions = require('../utils/validateActions')


router.get('/', (req, res) => {
    projs.get()
    .then( projects => {
        res.status(200).json(projects)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error: 'The project information could not be retrieved.', message: err.status})
    })
})

router.get('/:id', (req, res) => {
    projs.get(req.params.id)
    .then( project => {
        if(project){
        res.status(200).json(project)
        } else{
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error: 'The project information could not be retrieved.', errorMessage: err.status})
    })
})

router.post('/', validateProjects,(req, res) => {
    projs.insert(req.body)
    .then( project => {
        res.status(201).json(project)
    })
    .catch(err => {
    console.log(err)
    res.status(500).json({ 
      error: "There was an error while saving the project to the database", errorMessage: err.status })
    })
})

router.delete('/:id', (req,res) => {
    projs.remove(req.params.id)
    .then(project => {
        if(project) {
            res.status(200).json({ message: `Removed ${project} project(s) from the database.` })
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The project could not be deleted.", errorMessage: err.status})
    })
})

router.put('/:id',validateProjects, (req,res) => {
    projs.update(req.params.id,req.body)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else{
            res.status(404).json({ message: "The project with the specified ID does not exist." }) 
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The project information could not be modified." })
    })
})

router.get('/:id/actions', (req,res) => {
    projs.getProjectActions(req.params.id)
    .then(actions => {
        if(actions) {
            res.status(200).json(actions)
        } else { 
            res.status(404).json({ message: "The project with the specified ID does not exist"})
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while retrieving the actions", errorMessage: err.status})
    })
})

router.post('/:id/actions', validateActions, (req,res) => {
    acts.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "There was an error while retrieving the actions", errorMessage: err.status})
    })
})

module.exports = router