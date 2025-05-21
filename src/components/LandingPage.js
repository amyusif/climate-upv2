import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import WeatherPhoneSVG from './WeatherPhoneSVG';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const weatherIcons = [
    { icon: <WiDaySunny size={80} />, color: '#FFD700' },
    { icon: <WiRain size={80} />, color: '#4169E1' },
    { icon: <WiSnow size={80} />, color: '#B0E0E6' },
    { icon: <WiThunderstorm size={80} />, color: '#483D8B' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <WiDaySunny size={40} />
          <span>ClimateUp</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('features')}>Features</button>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
          <motion.button
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/weather')}
          >
            Launch App
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Welcome to ClimateUp</h1>
          <p>Your Hyperlocal, Hyperintelligent Weather Companion
Welcome to the future of weather tracking — reimagined for those who don't just check the forecast, but live by it. Powered by real-time meteorological data, AI-driven microclimate modeling, and intuitive design, our app gives you minute-by-minute updates, location-smart alerts, and deep insights that go beyond temperature.

Whether you're p</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/weather')}
          >
            Launch App
          </motion.button>
        </div>
        <div className="hero-svg">
          <WeatherPhoneSVG />
        </div>
      </motion.div>

      {/* Features Section */}
      <div id="features" className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Real-Time Updates</h3>
            <p>Get instant weather updates for your location</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Detailed Forecasts</h3>
            <p>Hourly and daily weather predictions</p>
          </motion.div>

          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Weather Alerts</h3>
            <p>Stay informed about severe weather conditions</p>
          </motion.div>
        </div>
      </div>

      {/* Weather Animation */}
      <div className="weather-animation">
        {weatherIcons.map((item, index) => (
          <motion.div
            key={index}
            className="weather-icon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, 20, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            style={{ color: item.color }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ClimateUp</h3>
            <p>Your trusted weather companion</p>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@climateup.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ClimateUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 