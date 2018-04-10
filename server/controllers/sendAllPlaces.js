import { pipeP, curry } from 'ramda';
import * as codes from '../utils/statusCodes';

import getPlaces from './getPlaces';
import { placesSearchURL } from '../data';

const errorUnlessOK = curry((res, { data: { results, status } }) => {
  if (status !== 'OK') {
    res.status(codes.STATUS_BAD_REQUEST);
    res.send({ error: 'Invalid search query' });
    return;
  }
  res.send(results);
});

const sendAllPlaces = ({ query }, res) =>
  pipeP(getPlaces, errorUnlessOK(res))(query);

export default sendAllPlaces;
