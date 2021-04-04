'use strict';

const base64 = require('base-64');
const user = require("../models/users-model.js");


async function userCheck(req, res, next) {

    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    const valid = await user.read({ username, password });

    if (valid) {
        req.body = { username, password };
        next();
    } else {
        next('The username or password are invalid ');
    }
}
module.exports = userCheck;