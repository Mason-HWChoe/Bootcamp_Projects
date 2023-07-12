import axios from 'axios';
import { useEffect, useState } from 'react';

export interface weatherDataType {
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uni: number;
    visibility: number;
    weather: [
      {
        description: string;
        icon: string;
        id: number;
        main: string;
      },
    ];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  };
  daily: [
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      summary: string;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
      };
      uvi: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    },
  ];
  hourly: [];
  lat: number;
  lon: number;
  minutely: [];
  timezone: string;
  timezone_offset: number;
}

export function useWeatherAPI(
  url: string,
  latitude: string | undefined,
  longitude: string | undefined,
) {
  const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherUrl = `${url}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=kr&units=metric`;
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url, latitude, longitude]);

  return { weatherData };
}
