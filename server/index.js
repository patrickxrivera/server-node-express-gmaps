import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { sort, map, pipeP, curry } from 'ramda';

import sendPlaceDetails from './controllers/sendPlaceDetails';
import sendAllPlaces from './controllers/sendAllPlaces';
import { resolve, formatData } from './controllers/getTravelModes';
import distanceURL, { travelModes } from './data';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
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
