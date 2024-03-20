import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { styled } from 'styled-components';
import PhoneAverage from '../PhoneAverage';
import PhoneRank from '../PhoneRank';

const LeftWrapper = styled("div")({
  width: 776,
  marginRight: 30,
  height: "100%",
})
const MiddleContainer = ({
  phoneAverageInfo,
  phoneRank,
  phoneRangeFrom,
  phoneRangeTo,
  phonePassing
}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (phoneRangeFrom && phoneRangeTo) {
      const utcFromTime = phoneRangeFrom && moment.utc(phoneRangeFrom);
      const sgFromTime = utcFromTime.utcOffset(8);
      const utcToTime = phoneRangeFrom && moment.utc(phoneRangeTo);
      const sgToTime = utcToTime.utcOffset(8);

      const timeFrom = moment(sgFromTime).format("MM-DD HH:mm");
      const timeTo = moment(sgToTime).format("MM-DD HH:mm");

      const timeRange = timeFrom + " - " + timeTo;

      setTime(timeRange);
    }
  }, [phoneRangeFrom, phoneRangeTo]);

  const rankColumn = "effectiveDurationTotal"; //sort by effectiveDurationTotal

  return (
    <>
      {time &&
        <LeftWrapper>
          <PhoneAverage phoneAverageInfo={phoneAverageInfo} time={time} rankColumn={rankColumn} />
          <PhoneRank
            phoneRank={phoneRank}
            time={time}
            phonePassing={phonePassing}
            rankColumn={rankColumn}
          />
        </LeftWrapper>
      }
    </>
  )
};

export default MiddleContainer;