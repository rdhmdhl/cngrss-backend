const { Senator, validate } = require('../models/senator');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// to get more infomation enter more values in the .select method,
// to view all values (pictures, links, ect) remove the .select method
router.get('/', async (req, res) => {
        const senators = await Senator.find().sort('state_name').select('name title state_name party, date_of_birth entered_office term_end');
        res.send(senators)
});

// router.get('/:id', async (req, res) => {
//     const senator = await Senator.findById(req.params.id);
    
//     if (!senator) return res.status(404).send('the senator with the given ID was not found');

//     res.send(senator);
// });


async function getSenator(name_slug) {
    return await Senator
        .find({name_slug})
        .sort('name')
        .select('name state_name title party, date_of_birth entered_office term_end')
}

router.get('/:name_slug', async (req, res) => {
    const senators = await getSenator(req.params.name_slug);

    if (!senators) return res.status(404).send('the senator with the given name was not found');

    res.send(senators)
});

module.exports = router;