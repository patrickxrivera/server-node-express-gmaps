import chai from 'chai';
import * as code from '../utils/statusCodes';

const chaiHttp = require('chai-http');
const server = require('../');

const expect = chai.expect;

chai.use(chaiHttp);

describe('API ROUTES', () => {
  describe('GET /api/place', () => {
    it('should return data for the search query', async () => {
      const route = '/';
      const sampleExpectedRes = {
        formatted_address: '270 7th St, San Francisco, CA 94103, USA'
      };

      const res = await chai.request(server).get(route);

      expect(res).to.have.status(code.STATUS_OK);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('address_components');
      expect(res.body).to.be.a('object');
      expect(res.body).to.include(sampleExpectedRes);
    });
  });
});
