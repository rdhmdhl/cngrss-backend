const { Representative } = require('../models/representative');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const representatives = await Representative.find().sort('name').select('name');
    res.send(representatives)
});

async function getRepresentative(name_slug) {
    return await Representative
        .find({name_slug})
        .select('name title state_name party, date_of_birth entered_office term_end')
};

router.get('/:name_slug', async (req, res) => {
    const representative = await getRepresentative(req.params.name_slug);

    if (!representative) return res.status(404).send('representative with the given state was not found');

    res.send(representative)
});

module.exports = router;