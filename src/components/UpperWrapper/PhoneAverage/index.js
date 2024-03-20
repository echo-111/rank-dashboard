import React from 'react';
import { contentData } from '../../../content/contentData';
import InlineTitle from '../InlineTitle';
import { styled } from 'styled-components';
import AverageCard from './AverageCard';
import { getNewArr } from '../../../utils/helper';

const AverageCardsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  columnGap: 10,
  marginBottom: 30
});

const PhoneAverage = ({
  phoneAverageInfo,
  time,
  rankColumn
}) => {
  const callCount = phoneAverageInfo && phoneAverageInfo?.callCount?.toFixed(2);
  const answerCount = phoneAverageInfo && phoneAverageInfo?.answerCount?.toFixed(2);
  const answerRate = phoneAverageInfo && (phoneAverageInfo?.answerRate * 100).toFixed(2) + "%";
  const duration = phoneAverageInfo && phoneAverageInfo?.durationTotal?.toFixed(2);
  const effectiveDurationTotal = phoneAverageInfo && phoneAverageInfo?.effectiveDurationTotal?.toFixed(2);

  const bg = ["#C9CFFF", "#D6DBFF", "#E2E6FF", "#ECEFFF", "#F0F2FF"];

  const cardData = [
    {
      key: "callCount",
      name: contentData.average.callCount,
      number: callCount
    },
    {
      key: "answerCount",
      name: contentData.average.answerCount,
      number: answerCount
    },
    {
      key: "answerRate",
      name: contentData.average.answerRate,
      number: answerRate
    },
    {
      key: "durationTotal",
      name: contentData.average.durationTotal,
      number: duration
    },
    {
      key: "effectiveDurationTotal",
      name: contentData.average.effectiveDurationTotal,
      number: effectiveDurationTotal
    }
  ];

  //put rankcoulumn data first
  const i = cardData.findIndex((x) => x.key === rankColumn);
  const newData = getNewArr(cardData, i);

  return (
    <div>
      <InlineTitle
        title={contentData.charts.average}
        tag={contentData.time}
        time={time}
      />
      {newData &&
        <AverageCardsContainer>
          {bg.map((i, index) => (
            <AverageCard
              key={index}
              bg={i}
              name={newData[index].name}
              number={newData[index].number}
              min={
                newData[index].number === effectiveDurationTotal || newData[index].number === duration
                  ?
                  "true"
                  :
                  "false"
              }
            />
          ))}
        </AverageCardsContainer>
      }
    </div>
  )
};

export default PhoneAverage;