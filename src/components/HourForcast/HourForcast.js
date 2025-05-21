import React from "react";
import styled from "styled-components";

const HourlyContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  align-items: center;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1rem 1rem;
    gap: 1rem;
  }
`;

const HourlyItem = styled.div`
  min-width: 80px;
  padding: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const Time = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Temp = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
`;

const WeatherIcon = styled.div`
  font-size: 1.5rem;
`;

const HourlyTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const DescriptionText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 1rem;
  }
`;

const getWeatherIcon = (weatherCode) => {
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

const HourForcast = ({ data, sunriseSunset }) => {
  // Get only the next 24 hours of forecast
  const next24Hours = data.slice(0, 8);

  // Find sunset time
  const sunsetTime = sunriseSunset ? new Date(sunriseSunset.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(' ', '') : null;

  const formattedForecast = next24Hours.map((item, index) => {
    const itemTime = new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(' ', '');
    const isSunset = sunsetTime && itemTime === sunsetTime;

    return {
      time: index === 0 ? "Now" : item.time,
      icon: isSunset ? "🌅" : getWeatherIcon(item.weather[0].icon),
      temp: isSunset ? "Sunset" : `${Math.round(item.main.temp)}°`, // Changed to match image format
      isSunset,
    };
  });

  return (
    <>
      {/* Add descriptive text here - placeholder for now */}
      <DescriptionText>Weather conditions and wind gusts forecast.</DescriptionText>
      {/* <HourlyTitle>Hourly Forecast</HourlyTitle> */}
      <HourlyContainer>
        {formattedForecast.map((item, index) => (
          <HourlyItem key={index}>
            <Time>{item.time}</Time>
            <WeatherIcon>{item.icon}</WeatherIcon>
            <Temp>{item.temp}</Temp>
          </HourlyItem>
        ))}
      </HourlyContainer>
    </>
  );
};

export default HourForcast;
