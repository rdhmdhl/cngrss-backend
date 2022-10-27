const { State } = require('../models/state');
const {Senator} = require('../models/senator');
const { Representative } = require('../models/representative');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const states = await State.find().sort('name').select('name');
    res.send(states)
});

async function getSenators(state_name) {
    return await Senator
        .find({state_name})
        .select('name title state_name party, date_of_birth entered_office term_end')
};

async function getRepresentatives(state_name) {
    return await Representative
        .find({state_name})
        .select('name title state_name party, date_of_birth entered_office term_end')
};

router.get('/:state_name', async (req, res) => {
    const senators = await getSenators(req.params.state_name);
    const representatives = await getRepresentatives(req.params.state_name);

    if (!senators) return res.status(404).send('the state congress members were not found');

    res.send({senators: senators, representatives: representatives})
});


module.exports = router;