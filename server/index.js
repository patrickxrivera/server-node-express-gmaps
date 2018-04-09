import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';
import { pipeP, curry } from 'ramda';

import key from './config';
import sendPlaceDetails from './handlers/sendPlaceDetails';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  await sendPlaceDetails(req, res);
});

if (!module.parent) {
  app.listen(port);
}

module.exports = app;
