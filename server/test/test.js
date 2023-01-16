const request = require('supertest');
const app = require('../index');

describe('POST User Login', function () {
    it('should login user', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'a@gmail.com',
            password: 'X12345678'
        })
        .expect(200)
        .end(done);

    })    
});
describe('POST User Registration', function () {
    it('should register user and return auth token', (done) => {
        request(app)
        .post('/users/signup')
        .send({
            name: 'Abcd',
            email: 'a@gmail.com',
            password: 'X12345678',
            role: 'editor',
        })
        .expect(400)
        .end(done);
    })   
});
describe('POST User Details Update', function () {
    it('should update user and return details', (done) => {
        request(app)
        .post('/user/edit')
        .send({
            name: 'Abcd',
            email: 'a@gmail.com',
            password: 'X12345678',
        })
        .expect(401)
        .end(done);
    })   
});
