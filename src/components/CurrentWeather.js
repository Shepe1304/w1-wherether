import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

const CurrentWeather = (props) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${props.countryLat}&longitude=${props.countryLng}&current_weather=true`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        // setWeather(data.CurrentWeather)
        setWeather(data.current_weather);
        console.log(data.current_weather);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, [props.countryLat, props.countryLng]);

  return (
    <div>
      <div>{weather.is_day ? "It is daytime" : "It is nighttime"}</div>
      <div>Temperature: {weather.temperature}</div>
      <div>Time: {weather.time}</div>
      <div>Wind Direction: {weather.winddirection}</div>
      <div>Wind Speed: {weather.windspeed}</div>
    </div>
  );
};

export default CurrentWeather;
