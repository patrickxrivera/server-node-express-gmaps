import axios from 'axios';
import { pipe, split, join, pipeP, curry } from 'ramda';

import { placesSearchURL } from '../data';

const format = ({ search }) => pipe(split(' '), join('+'))(search);

const getPlaces = (query) => {
  const searchVal = format(query);
  return axios.get(`${placesSearchURL}${searchVal}`);
};

export default getPlaces;
