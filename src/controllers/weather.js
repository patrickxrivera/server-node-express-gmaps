import axios from 'axios';

const WEATHER_API_ROOT = 'https://www.metaweather.com';
const LOCATION_SEARCH_ENDPOINT = `${WEATHER_API_ROOT}/api/location/search/?query=`;
const LOCATION_DATA_ENDPOINT = `${WEATHER_API_ROOT}/api/location/`;

const getLocationData = async (req, res) => {
  const { location } = req.body;

  const { data, status } = await axios
    .get(`${LOCATION_SEARCH_ENDPOINT}${encodeURIComponent(location)}`)
    .catch((err) => {
      console.log(err);
      res.send({ status: 'failed' });
      return;
    });

  if (status !== 200) {
    console.log('Status code error');
    return;
  }

  const locationId = data[0].woeid;

  const locationDataRes = await axios.get(`${LOCATION_DATA_ENDPOINT}${locationId}`).catch((err) => {
    console.log(err);
    res.send({ error: true });
    return;
  });

  const locationData = locationDataRes.data;
  const locationDataStatus = locationDataRes.status;

  if (locationDataStatus !== 200) {
    console.log('Status code error');
    return;
  }

  res.send({ weather: locationData.consolidated_weather });
};

export default getLocationData;
