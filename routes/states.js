const { State, validate } = require('../models/state');
const {Senator} = require('../models/senator');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const states = await State.find().sort('name').select('name');
    res.send(states)
});

// router.get('/:id', async (req, res) => {
//     const state = await State.findById(req.params.id);
    
//     if (!state) return res.status(404).send('the state with the given ID was not found');

//     res.send(state);
// });

async function getSenators(state_name) {
    return await Senator
        .find({state_name})
        .select('name title state_name party, date_of_birth entered_office term_end')
}

router.get('/:state_name', async (req, res) => {
    const senators = await getSenators(req.params.state_name);

    if (!senators) return res.status(404).send('the senator with the given ID was not found');

    res.send(senators)
});


module.exports = router;