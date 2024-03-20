import React from 'react';
import styled from "styled-components";
import MiddleContainer from './MiddleContainer';
// import {
//   mockData,
//   accountOpenRank,
//   appDownloadRank,
//   depositRank,
//   newFriendRank
// } from '../../utils/mockData';
import RightContainer from './RightContainer';

const UpperContainer = styled("div")({
  margin: "30px 40px",
  height: 921,
  display: "flex",
});

const UpperWrapper = ({ allRank }) => {

  return (
    <UpperContainer>
      <MiddleContainer
        phoneAverageInfo={allRank?.phoneAverageInfo}
        phoneRank={allRank?.phoneRank}
        phoneRangeFrom={allRank?.phoneRangeFrom}
        phoneRangeTo={allRank?.phoneRangeTo}
        phonePassing={allRank?.phonePassing}
      />
      <RightContainer
        depositData={allRank?.depositRank}
        depositPassing={allRank?.depositPassing}
        downloadData={allRank?.appDownloadRank}
        appDownloadPassing={allRank.appDownloadPassing}
        followerData={allRank?.newFriendRank}
        newFriendPassing={allRank?.newFriendPassing}
        openAccountData={allRank?.accountOpenRank}
        accountOpenPassing={allRank?.accountOpenPassing}
        effectiveCallRank={allRank?.effectiveCallRank}
        effectiveCallScore={allRank?.effectiveCallScore}
      />
    </UpperContainer>
  )
};

export default UpperWrapper;