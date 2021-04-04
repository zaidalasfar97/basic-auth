'use strict';
const express = require('express');
const users = require('./models/users-model');
const userCheck = require('./middleware/basic.js')
const router = express.Router();


router.post('/signup', async (req, res, next) => {
    try {
        const record = await users.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        res.status(403).send("Can't sign up ");
        next(error);
    }
});

router.post('/signin', userCheck, async (req, res, next) => {

    try {
        const record = await users.read(req.body);
        if (record) {
            res.status(200).json(record);
        } else {
            next('Invalid username or password');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;