import React from 'react';
import RightCharts from '../RightCharts';
import MonthlyEffectiveCalls from '../MonthlyEffectivCalls';
import { styled } from 'styled-components';
import TitleTab from '../TitleTab';
import { isPopulatedArray } from '../../../utils/helper';

const ContentContainer = styled("div")({
  display: "grid",
  rowGap: 18,
});

const RightContainer = ({
  depositData,
  depositPassing,
  openAccountData,
  downloadData,
  accountOpenPassing,
  appDownloadPassing,
  followerData,
  newFriendPassing,
  effectiveCallRank,
  effectiveCallScore
}) => {
  return (
    <ContentContainer>
      {depositData &&
        <TitleTab />
      }
      <RightCharts
        depositData={depositData}
        depositPassing={depositPassing}
        downloadData={downloadData}
        appDownloadPassing={appDownloadPassing}
        followerData={followerData}
        newFriendPassing={newFriendPassing}
        openAccountData={openAccountData}
        accountOpenPassing={accountOpenPassing}
      />
      {isPopulatedArray(effectiveCallRank) &&
        <MonthlyEffectiveCalls
          effectiveCallRank={effectiveCallRank}
          effectiveCallScore={effectiveCallScore}
        />
      }

    </ContentContainer>
  )
};

export default RightContainer;