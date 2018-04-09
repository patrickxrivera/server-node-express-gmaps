import axios from 'axios';
import { pipeP, curry } from 'ramda';
import * as codes from '../utils/statusCodes';

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

const getPlace = placeID =>
  axios.get(`${placeDetailsURL}${placeID}&key=${PLACES_KEY}`);

const getPlaceID = places => places.data.results[0].place_id;

const getPlaces = () => axios.get(placesSearchURL);

const sendPlaceDetails = (req, res) =>
  pipeP(getPlaces, getPlaceID, getPlace, errorUnlessOK(res))(req);

export default sendPlaceDetails;
