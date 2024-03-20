import React from 'react';
import { styled } from 'styled-components';
import { contentData } from '../../content/contentData';
import moment from "moment";

const HeaderWrapper = styled("div")({
  width: "100%",
  height: 99,
  backgroundColor: "#030934",
  color: "#fff",
  backgroundImage: "url('/LOGO.png')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "40px center",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  textAlign: "center",
  "&>h1": {
    paddingTop: 16,
    fontSize: 35,
    lineHeight: "50px",
  },
  "&>p": {
    paddingTop: 3,
    fontSize: 16,
    lineHeight: "23px"
  }
})

const Header = ({ time }) => {
  const utcMoment = moment.utc(time);
  const sgMoment = utcMoment.utcOffset(8);
  const formatTime = moment(sgMoment).format("YYYY-MM-DD HH:mm");
  return (
    <HeaderWrapper>
      <h1>{contentData.title}</h1>
      <p>{contentData.update}<span>{formatTime} </span> (SG)</p>
    </HeaderWrapper>
  )
};

export default Header;