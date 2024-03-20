import React from 'react';
import { styled } from 'styled-components';
import { contentData } from '../../../content/contentData';

const TabContent = styled("div")({
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const ColorBox = styled("div")((props) => ({
  width: 16.67,
  height: 9.11,
  backgroundColor: props.bc
}));

const DashedLine = styled("div")({
  width: 57,
  height: 0,
  borderBottom: "2px dashed #00873C"
});

export const TabText = styled("p")({
  fontSize: 16,
  color: "#32363A",
  marginLeft: 10,
  marginRight: 30
})

const TitleTab = () => {
  return (
    <TabContent>
      <ColorBox bc="#A5D7A7" />
      <TabText>AU</TabText>
      <ColorBox bc="#F9A19A" />
      <TabText>SG</TabText>
      <DashedLine />
      <TabText>{contentData.charts.average}</TabText>
    </TabContent >
  )
}

export default TitleTab
