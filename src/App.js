import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Searchbar from "./components/Search/Searchbar";
import cloud1 from "./Assets/cloud1.mp4";
import "./Styles/App.css";
import {
  StyledCard,
  VideoBG,
  Wrapper,
  AppUI,
  Upper,
  LoadingSpinner,
  ErrorMessage
} from "./components/Styled/Global_Styles/Components.styled";
import Current from "./components/CurrentWeather/Current";
import { API_KEY, weather_Api, forcast_Api, big_Data_Api } from "./Api/Api";
import HourForcast from "./components/HourForcast/HourForcast";
import DaysForcast from "./components/DaysForcast/DaysForcast";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import WeatherInsights from "./components/WeatherInsights/WeatherInsights";
import LandingPage from "./components/LandingPage";
import ExportData from "./components/ExportData/ExportData";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForcast, setWeatherFocast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [locationPrompt, setLocationPrompt] = useState(false);

  useEffect(() => {
    defaultLoc();
  }, []);
  
  const handleError = (error) => {
    setError(error.message || "An error occurred while fetching weather data");
    setLoading(false);
  };

  const defaultLoc = () => {
    setLoading(true);
    setError(null);
    setLocationPrompt(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPrompt(false);
        const geoLat = position.coords.latitude;
        const geoLon = position.coords.longitude;

        const current_city_fetch = fetch(
          `${big_Data_Api}?latitude=${geoLat}&longitude=${geoLon}&localityLanguage=en`
        );
        const current_weather_fetch = fetch(
          `${weather_Api}?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`
        );
        const current_forcast_fetch = fetch(
          `${forcast_Api}?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}&units=metric`
        );

        Promise.all([
          current_city_fetch,
          current_weather_fetch,
          current_forcast_fetch,
        ])
          .then(async (res) => {
            if (!res.every(r => r.ok)) {
              throw new Error("Failed to fetch weather data");
            }
            
            const current_city_res = await res[0].json();
            const current_weather_res = await res[1].json();
            const current_forcast_res = await res[2].json();

            const newForcastList = current_forcast_res.list.map((item) => {
              const [date, time] = item.dt_txt.split(" ");
              const [hours, minutes, secs] = time.split(":");
              const _12hour = hours >= 12 ? `${hours % 12}pm` : `${hours}am`;

              return {
                time: _12hour,
                ...item,
              };
            });

            const [district, muni] = current_city_res.locality.split(" ");

            setCurrentWeather({
              city: district + " " + muni,
              ...current_weather_res,
            });
            setWeatherFocast(newForcastList);
            setLoading(false);
          })
          .catch(handleError);
      },
      (error) => {
        setLocationPrompt(false);
        handleError(new Error("Please enable location services to get weather for your area"));
      }
    );
  };

  const searchChange = (searchData) => {
    setLoading(true);
    setError(null);
    
    const [lat, lon] = searchData.value.split(" ");

    const weather_Fetcher = fetch(
      `${weather_Api}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forcast_Fetcher = fetch(
      `${forcast_Api}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    Promise.all([weather_Fetcher, forcast_Fetcher])
      .then(async (response) => {
        if (!response.every(r => r.ok)) {
          throw new Error("Failed to fetch weather data");
        }
        
        const weather_Response = await response[0].json();
        const forcast_Response = await response[1].json();

        const newForcaster = forcast_Response.list.map((item) => {
          const [date, time] = item.dt_txt.split(" ");
          const [hours, minutes, secs] = time.split(":");
          const _12hour = hours >= 12 ? `${hours % 12}pm` : `${hours}am`;

          return {
            time: _12hour,
            ...item,
          };
        });

        setCurrentWeather({
          city: searchData.label,
          ...weather_Response,
        });
        setWeatherFocast(newForcaster);
        setLoading(false);
      })
      .catch(handleError);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Wrapper>
      <VideoBG autoPlay muted loop playsInline>
        <source src={cloud1} type="video/mp4" />
      </VideoBG>
      <AppUI>
        <Upper>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            width: '100%', 
            maxWidth: '1000px', 
            margin: '0 auto',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ flex: '1 1 80%' }}>
              <Searchbar onHandleChange={searchChange} />
            </div>
            {currentWeather && weatherForcast && (
              <div style={{ flex: '0 0 auto' }}>
                <ExportData 
                  currentWeather={currentWeather}
                  forecast={weatherForcast}
                />
              </div>
            )}
          </div>
        </Upper>
        
        {locationPrompt && (
          <ErrorMessage style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.9)' }}>
            My Location
          </ErrorMessage>
        )}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentWeather && <Current data={currentWeather} />}
            <StyledCard>
              {weatherForcast && <HourForcast data={weatherForcast} />}
            </StyledCard>
            <StyledCard>
              {weatherForcast && <DaysForcast data={weatherForcast} />}
            </StyledCard>
            {currentWeather && weatherForcast && (
              <WeatherInsights 
                currentWeather={currentWeather} 
                forecast={weatherForcast} 
              />
            )}
          </>
        )}
      </AppUI>
    </Wrapper>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
};

export default App;
