import axios from 'axios';
import { pipe, split, join, pipeP, curry } from 'ramda';
import * as codes from '../utils/statusCodes';

import getPlaces from './getPlaces';
import { PLACES_KEY } from '../config';
import { placesSearchURL, placeDetailsURL } from '../data';

const errorUnlessOK = curry((res, { data: { result, status } }) => {
  if (status !== 'OK') {
    res.status(codes.STATUS_BAD_REQUEST);
    res.send({ error: 'Invalid search query' });
    return;
  }
  res.send(result);
});

const getPlace = (placeID) =>
  axios.get(`${placeDetailsURL}${placeID}&key=${PLACES_KEY}`);

const getPlaceID = (places) => places.data.results[0].place_id;

const sendPlaceDetails = ({ query }, res) =>
  pipeP(getPlaces, getPlaceID, getPlace, errorUnlessOK(res))(query);

export default sendPlaceDetails;
