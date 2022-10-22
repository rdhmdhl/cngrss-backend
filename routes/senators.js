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

router.get('/:id', async (req, res) => {
    const senator = await Senator.findById(req.params.id);
    
    if (!senator) return res.status(404).send('the senator with the given ID was not found');

    res.send(senator);
});

module.exports = router;