import axios from 'axios';
import { pipeP, curry } from 'ramda';
import * as codes from '../utils/statusCodes';

// TODO: configure using key through env
import key from '../config';
import { placesSearchURL, placeDetailsURL } from '../data';

const errorUnlessOK = curry((res, { data: { result, status } }) => {
  if (status !== 'OK') {
    res.status(codes.STATUS_BAD_REQUEST);
    res.json({ error: 'Invalid search query' });
    return;
  }
  res.send(result);
});

const getPlace = placeID =>
  axios.get(`${placeDetailsURL}${placeID}&key=${key}`);

const getPlaceID = places => places.data.results[0].place_id;

const getPlaces = () => axios.get(placesSearchURL);

const sendPlaceDetails = (req, res) =>
  pipeP(getPlaces, getPlaceID, getPlace, errorUnlessOK(res))(req);

export default sendPlaceDetails;
