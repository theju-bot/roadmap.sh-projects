const axios = require('axios');
const client = require('../config/cache');

const todayWeather = async (req, res) => {
  try {
    const city =
      req.params.city?.toLowerCase() || req.query.city?.toLowerCase();
    if (!city) return res.status(400).json({ error: 'City required' });

    const cachedData = await client.get(city);
    if (cachedData) {
      console.log(`Returning cached weather for ${city}`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    const today = new Date();
    let weather;
    try {
      weather = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today.toISOString()}?key=${
          process.env.WEATHER_API_KEY
        }`
      );
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 400) {
        return res.status(400).json({ error: 'Invalid city name' });
      } else if (apiError.response && apiError.response.status === 404) {
        return res.status(404).json({ error: 'City not found' });
      } else {
        console.error('External API error:', apiError.message);
        return res.status(502).json({ error: 'Weather service unavailable' });
      }
    }

    const data = weather.data;
    const nowTime = today.getHours();

    const obj = {
      place: data.address, // "kaluwanchikudy"
      address: data.resolvedAddress, // "Kaluwanchikudy North, Eastern, Sri Lanka"
      timezone: data.timezone, // "Asia/Colombo"
      temprature: data.days[0].hours[nowTime].temp, // 81.3
      climate: data.days[0].hours[nowTime].conditions, // "Rain, Overcast"
      climateDescription: data.days[0].description, // "Cloudy skies throughout the day with storms possible."
    };

    await client.setEx(city, 15 * 60, JSON.stringify(obj));

    const response = JSON.stringify(obj, null, 2);
    res.status(200).send(response);
  } catch (err) {
    console.error('Error fetching weather:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { todayWeather };
