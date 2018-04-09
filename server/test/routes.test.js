import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import * as code from '../utils/statusCodes';
import { errorUnlessOK } from '../handlers/sendPlaceDetails';

const chaiHttp = require('chai-http');
const server = require('../');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('API ROUTES', () => {
  describe('GET /api/place', () => {
    it('should return the place data for the query', async () => {
      const route = '/api/place';
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

  describe('GET /api/places', () => {
    it('should return data for all places from the query', async () => {
      const route = '/api/places';
      const sampleExpectedRes = {
        formatted_address: '2340 Polk St, San Francisco, CA 94109, USA'
      };

      const res = await chai.request(server).get(route);

      expect(res).to.have.status(code.STATUS_OK);
      expect(res).to.be.a('object');
      expect(res.body[1]).to.be.a('object');
      expect(res.body[1]).to.include(sampleExpectedRes);
    });
  });
});
