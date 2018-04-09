import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';
import { sort, map, pipeP, curry } from 'ramda';

import sendPlaceDetails from './handlers/sendPlaceDetails';
import sendAllPlaces from './handlers/sendAllPlaces';
import { resolve, formatData } from './handlers/getTravelModes';
import distanceURL, { travelModes } from './data';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/place', async (req, res) => {
  await sendPlaceDetails(req, res);
});

app.get('/api/places', async (req, res) => {
  await sendAllPlaces(req, res);
});

app.get('/api/travel/mode', async (req, res) => {
  // TODO: encapsulate into a function
  const modes = await Promise.all(map(resolve, distanceURL));
  const result = map(formatData, modes);

  res.send(result);
});

if (!module.parent) {
  app.listen(port);
}

module.exports = app;
