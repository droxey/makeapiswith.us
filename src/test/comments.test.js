const chai = require('chai');
const chaiHttp = require('chai-http');
const Api = require('../models/api');
const server = require('../index.js');
const should = chai.should();
const expect = chai.expect;
const Comment = require('../models/comment');


/////// TODO: Still need to create PUT and test the route
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const sampleComment = { comment: 'automate this testing ' }
const apiId = '5be35bb6aa2a7438a06795c6';

describe('Comments', () => {
    before((done) => {
        agent
        .get('/auth/google')
        .end((err, res) => {
            done();
        })
    })

    it('Should create a new comment at POST: /apis/:apiId', (done) => {
        agent
        .post(`/apis/${apiId}`)
        .send(sampleComment)
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })

    })
})
