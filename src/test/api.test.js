const chai = require('chai');
const chaiHttp = require('chai-http');
const Api = require('../models/api');
const server = require('../index.js');
const should = chai.should();
const expect = chai.expect;


/////// TODO: Still need to create PUT and test the route
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const sampleApi = { name: 'Automated Testing', repoLink: 'https://github.com/Connor-Cahill/cookie-clicker-game', author: 'testGuy', description: 'This is testing' }
const apiId = '5be35bb6aa2a7438a06795c6';




describe('Apis', () => {
    before((done) => {
        agent
        .get('/auth/github')
        .end((err, res) => {
            done();
        })
    })

    after(() => {
        Api.deleteMany(sampleApi).exec((err, apis) => {
            console.log('apis deleted')
        })
    })

    it('Should return all APIs at GET: /apis ', (done) => {
        agent
        .get('/apis')
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })
    })

    it('Should create new API if user is logged in ', (done) => {
        agent
        .post('/apis')
        .send(sampleApi)
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })
    })

    it('Should return single API at GET: /apis/:id ', (done) => {
        agent
        .get(`/apis/${apiId}`)
        .end((err, res) => {
            res.status.should.be.equal(200);
            res.should.be.json;
            done();
        })
    })
})
