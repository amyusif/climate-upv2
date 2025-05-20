import React from "react";
import "./ForcastCard.css";
import { CardContainer, MinContainer, Variant_h5 } from "../Styled/Card/Card.styled";

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ForcastCard = ({ fetchForcast }) => {
  const today = new Date().getDay();
  const forcastDays = daysOfTheWeek
    .slice(today, daysOfTheWeek.length)
    .concat(daysOfTheWeek.slice(0, today));

  return (
    <>
      {fetchForcast.slice(0, 7).map((item, i) => {
        return (
            <CardContainer key={i}>
              <MinContainer>
                <img
                  src={`./weaIcon/${item.weather[0].icon}.png`}
                  className="weather-icon"
                  alt="icon"
                />
                <Variant_h5>{forcastDays[i]}</Variant_h5>
              </MinContainer>
              <MinContainer>
                <Variant_h5>{`${Math.round(item.main.temp)}°C`}</Variant_h5>
                <Variant_h5>{item.weather[0].description}</Variant_h5>
              </MinContainer>
            </CardContainer>
        );
      })}
    </>
  );
};

export default ForcastCard;
