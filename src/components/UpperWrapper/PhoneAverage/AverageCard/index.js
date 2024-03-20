import React from 'react';
import { styled } from 'styled-components';

const CardContainer = styled("div")((props) => ({
  backgroundColor: props.bg,
  borderRadius: 11.7,
  height: 87,
  "&>p": {
    paddingLeft: 17.5,
    paddingTop: 19,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "15px",
    color: "#030934",
    "&.no": {
      paddingTop: 7,
      fontSize: 26,
      fontWeight: 700,
      lineHeight: "26px",
      letterSpaceing: "0.02em"
    },
    "&>span": {
      fontSize: 12,
      fontWeight: 500
    }
  }
}));

const AverageCard = ({
  bg,
  min = "false",
  number,
  name
}) => {
  return (
    <CardContainer bg={bg}>
      <p>
        {name}
        {min === "true" && <span>(min)</span>}
      </p>
      <p className='no'>{number}</p>
    </CardContainer>
  )
};

export default AverageCard;