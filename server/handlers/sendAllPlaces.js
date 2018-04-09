import axios from 'axios';
import { pipeP, curry } from 'ramda';
import * as codes from '../utils/statusCodes';

import { placesSearchURL } from '../data';

const errorUnlessOK = curry((res, { data: { results, status } }) => {
  if (status !== 'OK') {
    res.status(codes.STATUS_BAD_REQUEST);
    res.json({ error: 'Invalid search query' });
    return;
  }
  res.send(results);
});

const getPlaces = () => axios.get(placesSearchURL);

const sendAllPlaces = (req, res) => pipeP(getPlaces, errorUnlessOK(res))(req);

export default sendAllPlaces;
