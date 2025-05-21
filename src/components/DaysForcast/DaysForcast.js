import React from "react";
import styled from "styled-components";

const DailyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
`;

const DailyItem = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const Day = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
`;

const WeatherIcon = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
`;

const TempRange = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const MaxTemp = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
`;

const MinTemp = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Description = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: capitalize;
  margin: 0.5rem 0;
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

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  
  // Check if the date is today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  
  // For other days, return the weekday name
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const DaysForcast = ({ data }) => {
  // Group forecast by day
  const dailyForecast = data.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = {
        date,
        temps: [],
        weather: item.weather[0],
      };
    }
    acc[date].temps.push(item.main.temp);
    return acc;
  }, {});

  // Convert to array and calculate min/max temps
  const forecastArray = Object.values(dailyForecast).map(day => ({
    ...day,
    maxTemp: Math.round(Math.max(...day.temps)),
    minTemp: Math.round(Math.min(...day.temps)),
  }));

  // Get next 5 days
  const next5Days = forecastArray.slice(0, 5);

  return (
    <DailyContainer>
      {next5Days.map((day, index) => (
        <DailyItem key={index}>
          <Day>{formatDate(day.date)}</Day>
          <WeatherIcon>
            {getWeatherIcon(day.weather.icon)}
          </WeatherIcon>
          <TempRange>
            <MaxTemp>{day.maxTemp}°C</MaxTemp>
            <MinTemp>{day.minTemp}°C</MinTemp>
          </TempRange>
          <Description>{day.weather.description}</Description>
        </DailyItem>
      ))}
    </DailyContainer>
  );
};

export default DaysForcast;
