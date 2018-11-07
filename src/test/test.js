const chai = require('chai');
const chaiHttp = require('chai-http');
const Api = require('../models/api');
const server = require('../index.js');
const should = chai.should();


/////// TODO: Still need to create PUT and test the route
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const sampleApi = { name: 'Testing', repoLink: 'https://github.com/Connor-Cahill/cookie-clicker-game', author: 'testGuy', description: 'This is testing' }
const failedApi = {author: 'Bobby'}

describe('Api', () => {
    it('Should POST new api to /api', (done) => {
        agent
        .post('/apis')
        .send(sampleApi)
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })
    })
    it('Should return all apis at GET /apis', (done) => {
        agent
        .get('/apis')
        .end((err, res) => {
            res.status.should.be.equal(200);
            res.should.be.json;
            // res.should.be.type('object');
            done();
        })
    })
    it('Should return error when posting api without a name', (done) => {
        agent
        .post('/apis')
        .send(failedApi)
        .end((err, res) => {
            res.status.should.be.equal(400);
            done();
        })
        it('Should remove api at DELETE /apis/:id', (done) => {
            Api.findOne({ name: 'Testing'}).then(api => {
                agent
                .delete('/apis/' + api._id)
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.have.property('message');
                    done();
                })
            })
            })

    })
})
