'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});
const user = mongoose.model('user', usersSchema);

class UserClass {
    constructor(model) {
        this.model = model;
    }
    async create(value) {
        value.password = await bcrypt.hash(value.password, 10);
        const user = new this.model(value);
        const record = user.save(value);
        return record;
    }

    async read(value) {
        try {
            const user = await this.model.findOne({ username: value.username });
            if (user) {
                const valid = await bcrypt.compare(value.password, user.password)
                if (valid) {
                    return user;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = new UserClass(user);