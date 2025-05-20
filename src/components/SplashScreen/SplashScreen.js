import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isExiting ? fadeOut : fadeIn} 0.5s ease-in-out;
`;

const LogoContainer = styled.div`
  text-align: center;
  animation: ${scaleUp} 0.5s ease-out, ${float} 3s ease-in-out infinite;
`;

const AppName = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  letter-spacing: 2px;
`;

const WeatherIcon = styled.div`
  font-size: 5rem;
  margin: 1rem 0;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1rem;
  text-align: center;
  max-width: 400px;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 2rem;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: white;
    animation: loading 4s ease-in-out forwards;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
`;

const SplashScreen = ({ onComplete }) => {
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SplashContainer isExiting={isExiting}>
      <LogoContainer>
        <WeatherIcon>🌤️</WeatherIcon>
        <AppName>Climate Up</AppName>
        <Tagline>Your personal weather companion</Tagline>
      </LogoContainer>
      <LoadingBar />
    </SplashContainer>
  );
};

export default SplashScreen; 