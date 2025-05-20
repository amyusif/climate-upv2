import React from "react";
import styled from "styled-components";

const HourlyContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding: 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  justify-content: center;
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
    justify-content: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
`;

const HourlyItem = styled.div`
  min-width: 120px;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 1rem;
  }
`;

const Time = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const Temp = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin: 0.75rem 0;
`;

const WeatherIcon = styled.div`
  font-size: 1.75rem;
  margin: 0.75rem 0;
`;

const HourlyWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HourlyTitle = styled.h3`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
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

const HourForcast = ({ data }) => {
  // Get only the next 24 hours of forecast
  const next24Hours = data.slice(0, 8);

  return (
    <HourlyWrapper>
      <HourlyTitle>Hourly Forecast</HourlyTitle>
      <HourlyContainer>
        {next24Hours.map((item, index) => (
          <HourlyItem key={index}>
            <Time>{item.time}</Time>
            <WeatherIcon>
              {getWeatherIcon(item.weather[0].icon)}
            </WeatherIcon>
            <Temp>{Math.round(item.main.temp)}°C</Temp>
          </HourlyItem>
        ))}
      </HourlyContainer>
    </HourlyWrapper>
  );
};

export default HourForcast;
