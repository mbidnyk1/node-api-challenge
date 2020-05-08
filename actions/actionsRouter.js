const express = require('express');
const router = express.Router();
const acts = require('../data/helpers/actionModel')
const validateActions = require('../utils/validateActions')

router.get('/', (req, res) => {
    acts.get()
    .then( actions => {
        res.status(200).json(actions)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error: 'The action information could not be retrieved.', message: err.status})
    })
})

router.get('/:id', (req,res) => {
    acts.get(req.params.id)
    .then(action => {
        if (action){
            res.status(200).json(action)
        } else{
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ error: "The action information could not be retrieved.", errorMessage: err.status })
    })
})

module.exports = router