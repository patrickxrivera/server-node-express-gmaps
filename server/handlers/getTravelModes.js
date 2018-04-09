import axios from 'axios';

import { travelModes } from '../data';

// TODO: make more functional

// TODO: get rid of side effect!!!
let count = 0;

const getData = mode => mode.data.rows[0].elements[0];

export const formatData = (mode) => {
  const modeName = travelModes[count];
  const data = getData(mode);
  const formattedData = { [modeName]: data };
  count++;
  return formattedData;
};

export const resolve = url => axios.get(url);
