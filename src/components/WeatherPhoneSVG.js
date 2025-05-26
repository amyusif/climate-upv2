import React, { useEffect, useRef } from 'react';

const WeatherPhoneSVG = ({ city = 'Kumasi, GH', temperature = '72\u00b0' }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    // Start animation when component mounts
    if (svgRef.current) {
      const floatAnimation = svgRef.current.querySelector('#floatAnimation');
      if (floatAnimation) {
        floatAnimation.beginElement();
      }
    }
  }, []);
  return (
    <svg 
      ref={svgRef}
      width="300"
      height="540"
      viewBox="0 0 300 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Combined phone frame and content with smooth floating animation */}
      <g id="phoneGroup">
        <animateTransform
          id="floatAnimation"
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0,0; 0,-10; 0,0"
          dur="5s"
          keyTimes="0; 0.5; 1"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          calcMode="spline"
          repeatCount="indefinite"
          additive="sum"
          begin="0s"
        />
        
        {/* Phone outline with rounded corners and box shadow */}
        <rect 
          x="12" 
          y="12" 
          width="276" 
          height="516" 
          rx="36" 
          ry="36" 
          fill="#FFFFFF" 
          stroke="none"
          filter="url(#phoneShadow)"
          opacity="0.9"
        />
      
        {/* Phone screen */}
        <rect 
          x="24" 
          y="24" 
          width="252" 
          height="492" 
          rx="30" 
          ry="30" 
          fill="#ffffff" 
          stroke="none"
        />
      
        {/* Sky background with gradient */}
        <rect 
          x="24" 
          y="24" 
          width="252" 
          height="330" 
          rx="30" 
          ry="30" 
          fill="url(#skyGradient)" 
          stroke="none"
        />
      
        {/* Sun with glow effect */}
        <circle 
          cx="96" 
          cy="120" 
          r="48" 
          fill="#FFD700" 
          filter="url(#sunGlow)" 
        />
      
        {/* Landscape/hills at bottom of sky - adjusted to match new panel position */}
        <path 
          d="M24,252 Q84,204 144,228 T276,216 V252 H24 Z" 
          fill="#e0e0e5" 
          opacity="0.5"
        />
      
        {/* Information panel with white opacity instead of dark */}
        <rect 
          x="24" 
          y="252" 
          width="252" 
          height="264" 
          rx="18" 
          ry="18" 
          fill="#FFFFFF" 
          opacity="0.8"
        />

        {/* City name - adjusted position */}
        <text 
          x="150" 
          y="290" 
          fontFamily="Arial, sans-serif" 
          fontSize="20" 
          fontWeight="600" 
          fill="#455A64" 
          textAnchor="middle"
          filter="url(#textGlow)"
        >
          {city}
        </text>
      
        {/* Temperature display with improved styling - adjusted position */}
        <text 
          x="150" 
          y="416" 
          fontFamily="Arial, sans-serif" 
          fontSize="86" 
          fontWeight="bold" 
          fill="#263238" 
          textAnchor="middle"
          filter="url(#tempShadow)"
        >
          {temperature}
        </text>
      
        {/* Weather icon (sun) with pulse animation - properly positioned below temperature */}
        <g transform="translate(150, 476)" fill="#FFB74D" filter="url(#iconGlow)">
          <circle cx="0" cy="0" r="18">
            <animate 
              attributeName="r" 
              values="18;20;18" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </circle>
          <g>
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="30s"
              repeatCount="indefinite"
            />
            <line x1="0" y1="-28" x2="0" y2="-24" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="24" x2="0" y2="28" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="-28" y1="0" x2="-24" y2="0" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="24" y1="0" x2="28" y2="0" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="-20" y1="-20" x2="-16" y2="-16" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="16" y1="16" x2="20" y2="20" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="-20" y1="20" x2="-16" y2="16" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
            <line x1="16" y1="-16" x2="20" y2="-20" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>
      </g> {/* End of phoneGroup */}
      
      {/* Definitions for gradients and filters */}
      <defs>
        {/* Sky gradient from top to bottom */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64B5F6" />  {/* Light blue */}
          <stop offset="100%" stopColor="#90CAF9" />  {/* Lighter blue */}
        </linearGradient>
        
        {/* Since we're using white opacity, we don't need this gradient anymore */}
        <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />  
          <stop offset="100%" stopColor="#F5F5F5" />  
        </linearGradient>
        
        {/* Sun glow effect */}
        <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Phone shadow effect */}
        <filter id="phoneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="rgba(0,0,0,0.35)" floodOpacity="0.5" />
        </filter>
        
        {/* Temperature text shadow */}
        <filter id="tempShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0,0,0,0.5)" />
        </filter>
        
        {/* Weather icon glow */}
        <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* City text glow */}
        <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default WeatherPhoneSVG;