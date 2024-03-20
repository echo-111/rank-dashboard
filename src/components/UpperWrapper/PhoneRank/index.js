import React, { useEffect, useState } from 'react';
import InlineTitle from '../InlineTitle';
import { contentData } from '../../../content/contentData';
// import PhoneRankTable from './PhoneRankTable';
import PhoneRankTable from './PhoneRankTable/SortTable';
import { isPopulatedArray, getSortedData, findFirstBelowAverageIndex } from '../../../utils/helper';

const PhoneRank = ({
  phoneRank,
  time,
  phonePassing,
}) => {
  const arr = Object.entries(contentData.centerRank);
  const [sortColumn, setSortColumn] = useState("callCount");
  const [sortName, setSortName] = useState("");
  const [sortedPhoneRank, setSortedPhoneRank] = useState([]);
  const [target, setTarget] = useState(phonePassing);

  const handleSortChange = (e) => {
    setSortColumn(e)
  };

  useEffect(() => {
    const name = arr.find((x) => x[0] === sortColumn)[1];
    const sortedData = getSortedData(phoneRank, sortColumn);

    setSortedPhoneRank(sortedData);
    setSortName(name);
  }, [sortColumn, arr, phoneRank]);

  useEffect(() => {
    const number = findFirstBelowAverageIndex(sortedPhoneRank, sortColumn);
    setTarget(number);
  }, [sortedPhoneRank, sortColumn]);

  const title = `Rank-${sortName}`;

  return (
    <div>
      <InlineTitle
        title={title}
        tag={contentData.time}
        time={time}
      />
      {
        isPopulatedArray(sortedPhoneRank) &&
        <PhoneRankTable
          sortedPhoneRank={sortedPhoneRank}
          passing={target}
          rankColumn={sortColumn}
          handleSortChange={handleSortChange}
        />
      }
    </div>
  )
}

export default PhoneRank;