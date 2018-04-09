import key from '../config';

export const placesSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shops+in+san+francsico&key=${key}`;

export const placeDetailsURL =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
