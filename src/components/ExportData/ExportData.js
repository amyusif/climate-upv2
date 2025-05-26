import React from 'react';
import styled from 'styled-components';

const ExportButton = styled.button`
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExportData = ({ currentWeather, forecast }) => {
  const handleExport = () => {
    // Prepare current weather data
    const currentData = {
      city: currentWeather.city,
      temperature: currentWeather.main.temp,
      feels_like: currentWeather.main.feels_like,
      humidity: currentWeather.main.humidity,
      pressure: currentWeather.main.pressure,
      wind_speed: currentWeather.wind.speed,
      wind_direction: currentWeather.wind.deg,
      weather_description: currentWeather.weather[0].description,
      timestamp: new Date(currentWeather.dt * 1000).toISOString()
    };

    // Prepare forecast data
    const forecastData = forecast.map(item => ({
      timestamp: new Date(item.dt * 1000).toISOString(),
      temperature: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind_speed: item.wind.speed,
      wind_direction: item.wind.deg,
      weather_description: item.weather[0].description
    }));

    // Combine data
    const allData = [currentData, ...forecastData];

    // Convert to CSV
    const headers = Object.keys(currentData).join(',');
    const rows = allData.map(item => Object.values(item).join(','));
    const csvContent = [headers, ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `weather_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ExportButton onClick={handleExport}>
      📊 Export Weather Data
    </ExportButton>
  );
};

export default ExportData; 