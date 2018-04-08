import chai from 'chai';
import * as code from '../utils/statusCodes';

const chaiHttp = require('chai-http');
const server = require('../');

const expect = chai.expect;

chai.use(chaiHttp);

describe('API ROUTES', () => {
  describe('GET /', () => {
    it('should create a new post', async () => {
      const res = await chai.request(server).get('/');

      expect(res).to.have.status(code.STATUS_OK);
      expect(res.body).to.have.property('id');
      expect(res.body.id).to.be.a('string');
    });
  });
});
