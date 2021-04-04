'use strict';
const express = require('express');
const users = require('./models/users-model');
const userCheck = require('./middleware/basic')
const router = express.Router();


router.post('/signup', signupHandler);
router.post('/signin', userCheck, signinHandler);



async function signupHandler(req, res, next) {
    try {
        const record = await users.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        res.status(403).send("Error in Creating User");
        next(error);
    }
}

async function signinHandler(req, res, next) {

    try {
        const record = await users.read(req.body);
        if (record) {
            res.status(200).json(record);
        } else {
            next('Invalid');
        }
    } catch (error) {
        next(error);
    }
}


module.exports = router;