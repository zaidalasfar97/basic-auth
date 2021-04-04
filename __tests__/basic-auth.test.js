'use strict';
require('dotenv').config();
const base64 = require('base-64'); const { app } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);


describe('api server check', () => {
    it('should create a new user on POST /signup', async () => {
        const obj = {
            username: 'zaid',
            password: '123456'
        };
        const response = await request.post('/signup').send(obj);
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('zaid');
    });

    it('Should create new user and return record', async () => {
        let user = base64.encode(`zaid:123456`);
        let response = await request
            .post('/signin')
            .set(`Authorization`, `Basic ${user}`);
        expect(response.body.username).toEqual('zaid');
        expect(response.status).toEqual(200);
    });


    it('handle home routes', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello There!!!');
    });
});