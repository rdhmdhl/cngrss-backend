const { State, validate } = require('../models/state');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const states = await State.find().sort('name').select('name');
    res.send(states)
});

router.get('/:id', async (req, res) => {
    const state = await State.findById(req.params.id);
    
    if (!state) return res.status(404).send('the state with the given ID was not found');

    res.send(state);
});

module.exports = router;