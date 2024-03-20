import React from 'react';
import { styled } from 'styled-components';
import { contentData } from '../../../content/contentData';
import TodayRankCard from '../TodayRankCard';
import { isPopulatedArray } from '../../../utils/helper';

const RightWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 30,
  rowGap: 18
});

const RightCharts = ({
  depositData,
  openAccountData,
  downloadData,
  followerData,
  depositPassing,
  accountOpenPassing,
  appDownloadPassing,
  newFriendPassing,
}) => {
  return (
    <>
      <RightWrapper>
        {isPopulatedArray(depositData) &&
          <TodayRankCard
            chartData={depositData}
            chartTitle={contentData.charts.deposit}
            passing={depositPassing}
          />
        }
        {isPopulatedArray(openAccountData) &&
          <TodayRankCard
            chartData={openAccountData}
            chartTitle={contentData.charts.openAccount}
            passing={accountOpenPassing}
          />
        }
        {isPopulatedArray(downloadData) &&
          <TodayRankCard
            chartData={downloadData}
            chartTitle={contentData.charts.download}
            passing={appDownloadPassing}
          />
        }
        {isPopulatedArray(followerData) &&
          <TodayRankCard
            chartData={followerData}
            chartTitle={contentData.charts.addFollower}
            passing={newFriendPassing}
          />
        }
      </RightWrapper>
    </>
  )
};

export default RightCharts;