import React from 'react';
import { styled } from 'styled-components';

const InlineTitleContainer = styled("div")({
  display: "flex",
  alignItems: "baseline",
  marginBottom: 20,
  "&>h2": {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "26px",
  },
  "&>p": {
    fontSize: 18,
    fontWeight: 300,
    lineHeight: "26px",
    paddingLeft: 30,
  }
});

const InlineTitle = ({
  title,
  tag,
  time
}) => {
  return (
    <InlineTitleContainer>
      <h2>{title}</h2>
      <p>
        {tag}
        <span> ({time})</span>
      </p>
    </InlineTitleContainer>
  )
};

export default InlineTitle;