import React from "react";
import {
  WeatherIcon,
  Temperature,
  Location,
  WeatherDescription,
  WeatherDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
} from "../Styled/Global_Styles/Components.styled";

const getWeatherIcon = (weatherCode) => {
  // You can replace these with actual weather icons
  const icons = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "🌨️",
    "13n": "🌨️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return icons[weatherCode] || "❓";
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Current = ({ data }) => {
  const {
    city,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed, deg },
    sys: { sunrise, sunset },
  } = data;

  const weatherIcon = getWeatherIcon(weather[0].icon);

  return (
    <div>
      <WeatherIcon>{weatherIcon}</WeatherIcon>
      <Temperature>{Math.round(temp)}°C</Temperature>
      <Location>{city}</Location>
      <WeatherDescription>{weather[0].description}</WeatherDescription>
      
      <WeatherDetails>
        <DetailItem>
          <DetailLabel>Feels Like</DetailLabel>
          <DetailValue>{Math.round(feels_like)}°C</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Wind Speed</DetailLabel>
          <DetailValue>{Math.round(speed)} m/s</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Pressure</DetailLabel>
          <DetailValue>{pressure} hPa</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Sunrise</DetailLabel>
          <DetailValue>{formatTime(sunrise)}</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Sunset</DetailLabel>
          <DetailValue>{formatTime(sunset)}</DetailValue>
        </DetailItem>
      </WeatherDetails>
    </div>
  );
};

export default Current;
   