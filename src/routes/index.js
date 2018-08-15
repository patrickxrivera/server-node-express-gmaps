import getLocationData from '../controllers/weather';

export default (app) => {
  // Weather
  app.post('/api/weather', getLocationData);
};
