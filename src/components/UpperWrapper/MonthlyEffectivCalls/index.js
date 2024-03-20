import React from 'react';
import { styled } from 'styled-components';
import MonthlyChart from './MonthlyChart';

const LowerContainer = styled("div")({
  height: 184,
  background: "#fff",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
  borderRadius: 8,
});

const MonthlyEffectiveCalls = ({ effectiveCallRank, effectiveCallScore }) => {
  return (
    <LowerContainer>
      <MonthlyChart effectiveCallRank={effectiveCallRank} effectiveCallScore={effectiveCallScore} />
    </LowerContainer>
  )
};

export default MonthlyEffectiveCalls;