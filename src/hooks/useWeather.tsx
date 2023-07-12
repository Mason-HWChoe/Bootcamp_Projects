import axios from 'axios';
import { useEffect, useState } from 'react';

export function useWeatherAPI(
  url: string,
  latitude: string | undefined,
  longitude: string | undefined,
) {
  const [weatherData, setWeatherData] = useState([]);
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherUrl = `${url}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=kr&units=metric`;
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url, latitude, longitude]);

  return { weatherData };
}
