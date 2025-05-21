import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const StyledCard = styled.div`
  height: ${(props) => props.height || 'auto'};
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  padding: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const VideoBG = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  overflow-x: hidden;
`;

export const AppUI = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  overflow: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (max-width: 768px) {
    min-height: 60px;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid rgba(255, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const WeatherIcon = styled.div`
  font-size: 2.5rem;
  margin: 1rem 0;
  animation: ${float} 6s ease-in-out infinite;
  text-align: center;
`;

export const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Location = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const WeatherDescription = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.8);
  text-transform: capitalize;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const DetailItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
`;

export const DetailValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
`;