import { forEach } from 'ramda';

import { PLACES_KEY, DISTANCE_KEY } from '../config';

export const placesSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shops+in+san+francsico&key=${PLACES_KEY}`;

export const placeDetailsURL =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

const baseDistanceURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&key=${DISTANCE_KEY}&origins=Seattle&destinations=San+Francisco&mode=`;

const bikeDistanceURL = `${baseDistanceURL}`;

export let distanceURL = [];

export const travelModes = ['driving', 'walking', 'bicycling', 'transit'];

export const append = (mode) => {
  const newURL = `${bikeDistanceURL}${mode}`;
  distanceURL = [...distanceURL, newURL];
};

// passing these two parameters for dependency injection/testing purposes
export const appendToURL = (append, travelModes) => {
  forEach(append, travelModes);
  return distanceURL;
};

appendToURL(append, travelModes);

export default distanceURL;
