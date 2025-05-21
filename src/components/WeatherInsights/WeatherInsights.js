import React from 'react';
import styled from 'styled-components';

const InsightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const InsightCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecommendationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ConfidenceScore = styled.div`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background: ${props => {
    if (props.score >= 80) return 'rgba(46, 213, 115, 0.2)';
    if (props.score >= 60) return 'rgba(255, 171, 0, 0.2)';
    return 'rgba(255, 71, 87, 0.2)';
  }};
  color: ${props => {
    if (props.score >= 80) return '#2ed573';
    if (props.score >= 60) return '#ffa502';
    return '#ff4757';
  }};
`;

const getOutfitRecommendation = (temp, weather) => {
  const recommendations = [];
  
  if (temp < 10) {
    recommendations.push({ item: "Heavy winter coat", confidence: 90 });
    recommendations.push({ item: "Thermal layers", confidence: 85 });
    recommendations.push({ item: "Warm boots", confidence: 80 });
  } else if (temp < 15) {
    recommendations.push({ item: "Light jacket or sweater", confidence: 85 });
    recommendations.push({ item: "Long pants", confidence: 80 });
    recommendations.push({ item: "Closed shoes", confidence: 75 });
  } else if (temp < 20) {
    recommendations.push({ item: "Light sweater or long sleeves", confidence: 80 });
    recommendations.push({ item: "Comfortable pants", confidence: 75 });
  } else if (temp < 25) {
    recommendations.push({ item: "Light layers", confidence: 85 });
    recommendations.push({ item: "Comfortable shoes", confidence: 80 });
  } else {
    recommendations.push({ item: "Light, breathable clothing", confidence: 90 });
    recommendations.push({ item: "Sunscreen", confidence: 85 });
    recommendations.push({ item: "Hat or cap", confidence: 80 });
  }

  if (weather.includes('rain')) {
    recommendations.push({ item: "Waterproof jacket", confidence: 95 });
    recommendations.push({ item: "Waterproof shoes", confidence: 90 });
  }

  return recommendations;
};

const getFitnessRecommendation = (temp, humidity, weather) => {
  const recommendations = [];
  
  if (weather.includes('rain') || weather.includes('storm')) {
    recommendations.push({ 
      item: "Indoor workout recommended", 
      confidence: 90,
      reason: "Unfavorable weather conditions"
    });
  } else if (temp > 30) {
    recommendations.push({ 
      item: "Early morning or evening workout recommended", 
      confidence: 85,
      reason: "High temperature"
    });
  } else if (temp < 5) {
    recommendations.push({ 
      item: "Indoor workout recommended", 
      confidence: 80,
      reason: "Low temperature"
    });
  } else {
    recommendations.push({ 
      item: "Great conditions for outdoor activities", 
      confidence: 90,
      reason: "Optimal temperature"
    });
  }

  if (humidity > 80) {
    recommendations.push({ 
      item: "Stay hydrated", 
      confidence: 85,
      reason: "High humidity"
    });
  }

  return recommendations;
};

const getEventRecommendation = (temp, weather, windSpeed) => {
  const recommendations = [];
  let overallScore = 100;

  // Temperature impact
  if (temp < 10 || temp > 30) {
    overallScore -= 20;
    recommendations.push({ 
      item: "Temperature may affect comfort", 
      confidence: 80,
      reason: "Extreme temperature"
    });
  }

  // Weather impact
  if (weather.includes('rain') || weather.includes('storm')) {
    overallScore -= 40;
    recommendations.push({ 
      item: "Consider indoor alternative", 
      confidence: 90,
      reason: "Precipitation expected"
    });
  }

  // Wind impact
  if (windSpeed > 20) {
    overallScore -= 15;
    recommendations.push({ 
      item: "Strong winds expected", 
      confidence: 85,
      reason: "High wind speed"
    });
  }

  return {
    score: Math.max(0, overallScore),
    recommendations
  };
};

const getWeatherReminders = (weather, temp, prevTemp) => {
  const reminders = [];
  
  if (weather.includes('rain')) {
    reminders.push({ item: "Bring an umbrella", confidence: 95 });
  }
  
  if (weather.includes('storm')) {
    reminders.push({ item: "Charge your flashlight", confidence: 90 });
    reminders.push({ item: "Secure outdoor items", confidence: 85 });
  }
  
  if (temp < 10) {
    reminders.push({ item: "Wear warm clothing", confidence: 90 });
  }
  
  if (temp > 25) {
    reminders.push({ item: "Stay hydrated", confidence: 85 });
    reminders.push({ item: "Apply sunscreen", confidence: 90 });
  }
  
  if (Math.abs(temp - prevTemp) > 10) {
    reminders.push({ 
      item: `Temperature change of ${Math.abs(temp - prevTemp)}°C expected`, 
      confidence: 85 
    });
  }

  return reminders;
};

const WeatherInsights = ({ currentWeather, forecast }) => {
  const temp = currentWeather.main.temp;
  const humidity = currentWeather.main.humidity;
  const weather = currentWeather.weather[0].description.toLowerCase();
  const windSpeed = currentWeather.wind.speed;
  const prevTemp = forecast[0]?.main.temp || temp;

  const outfitRecommendations = getOutfitRecommendation(temp, weather);
  const fitnessRecommendations = getFitnessRecommendation(temp, humidity, weather);
  const eventRecommendation = getEventRecommendation(temp, weather, windSpeed);
  const weatherReminders = getWeatherReminders(weather, temp, prevTemp);

  return (
    <InsightsContainer>
      <InsightCard>
        <CardTitle>👕 What to Wear</CardTitle>
        <RecommendationList>
          {outfitRecommendations.map((rec, index) => (
            <RecommendationItem key={index}>
              <span>{rec.item}</span>
              <ConfidenceScore score={rec.confidence}>
                {rec.confidence}%
              </ConfidenceScore>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </InsightCard>

      <InsightCard>
        <CardTitle>🏃‍♂️ Fitness Tips</CardTitle>
        <RecommendationList>
          {fitnessRecommendations.map((rec, index) => (
            <RecommendationItem key={index}>
              <div>
                <div>{rec.item}</div>
                <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{rec.reason}</small>
              </div>
              <ConfidenceScore score={rec.confidence}>
                {rec.confidence}%
              </ConfidenceScore>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </InsightCard>

      <InsightCard>
        <CardTitle>🎉 Event Planning</CardTitle>
        <div style={{ marginBottom: '1rem' }}>
          <ConfidenceScore score={eventRecommendation.score}>
            Overall Score: {eventRecommendation.score}%
          </ConfidenceScore>
        </div>
        <RecommendationList>
          {eventRecommendation.recommendations.map((rec, index) => (
            <RecommendationItem key={index}>
              <div>
                <div>{rec.item}</div>
                <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{rec.reason}</small>
              </div>
              <ConfidenceScore score={rec.confidence}>
                {rec.confidence}%
              </ConfidenceScore>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </InsightCard>

      <InsightCard>
        <CardTitle>🔔 Weather Reminders</CardTitle>
        <RecommendationList>
          {weatherReminders.map((reminder, index) => (
            <RecommendationItem key={index}>
              <span>{reminder.item}</span>
              <ConfidenceScore score={reminder.confidence}>
                {reminder.confidence}%
              </ConfidenceScore>
            </RecommendationItem>
          ))}
        </RecommendationList>
      </InsightCard>
    </InsightsContainer>
  );
};

export default WeatherInsights; 