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
    async create(obj) {
        obj.password = await bcrypt.hash(obj.password, 10);
        const user = new this.model(obj);
        const record = user.save(obj);
        return record;
    }

    async read(obj) {
        try {
            const user = await this.model.findOne({ username: obj.username });
            if (user) {
                const valid = await bcrypt.compare(obj.password, user.password)
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