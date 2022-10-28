const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// get user id from the json webtoken
// more secure than '/:id'
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user);
});

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered');

    // using lodash pick method to "pick" what we want to request from the database 
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    // use bcrypt to get the salt and hash the password
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    // set header using jwt 
    // using lodash pick method to "pick" what we want to send back to the client 
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;