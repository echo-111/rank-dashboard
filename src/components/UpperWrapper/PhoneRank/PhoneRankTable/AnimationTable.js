import React, { useEffect, useState } from 'react'
import { contentData } from '../../../../content/contentData';
import { styled } from 'styled-components';
import { getSortedData, isPopulatedArray } from '../../../../utils/helper';

const MainWrapper = styled("div")({
  maxHeight: 710,
  width: 790,
  overflow: "scroll"
});

const StyledTable = styled("table")({
  marginLeft: 5,
  maxWidth: 776,
  maxHeight: 710,
  overflow: "scroll",
  boxSizing: "border-box",
  border: "none",
  textAlign: "center",
  position: "relative",
  backgroundColor: "#FFFFFF",
  "&>thead": {
    position: "sticky",
    top: 0,
    background: "#fff",
    height: 60,
    backgroundColor: "#E8E8E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#030934",
  },
});

const TabelHeader = styled("th")({
  fontWeight: 500,
  "&.active": {
    fontWeight: 700
  }
});

const TableRow = styled("tr")({
  paddingLeft: 18,
  display: "grid",
  columnGap: 2,
  gridTemplateColumns: "60px 130px 60px 90px 75px 135px 200px",
  justifyItems: "start",
  boxSizing: "border-box",
  "&.body": {
    height: 50,
    boxSizing: "border-box",
    borderBottom: "0.5px solid rgba(41, 45, 50, 0.1)",
  },
  "&.average": {
    height: 50,
    paddingLeft: 23,
    margin: "0 -5px",
    background: "#FF9D7C",
    borderRadius: 10,
    boxShadow: "0px 3px 8px rgba(188, 88, 55, 0.51)",
    // "&> *": {
    //   color: "#FFFFFF"
    // }
  },
  "&.below": {
    height: 50,
    backgroundColor: "#F39A7D",
    borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
    // "&> *": {
    //   color: "#FFFFFF"
    // }
  }
});

const TableCell = styled("td")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: 5,
  fontSize: 22,
  color: "#06152B",
  "&.name": {
    width: "80%",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>img": {
      width: 19,
    }
  },
  "&.active": {
    fontWeight: 700,
  },
  "&>span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 38,
    height: 21.37,
    fontSize: 12.67,
    fontWeight: 700
  },
  "&.blue": {
    "&>span": {
      backgroundColor: "#E2EDFF",
      color: "#367BF5"
    }
  },
  "&.orange": {
    "&>span": {
      backgroundColor: "#FFF4E2",
      color: "#F39200"
    }
  }
});

const PhoneRankTable = ({
  phoneRank,
  passing,
  rankColumn//sort by callcount
}) => {
  const [sortedPhoneRank, setSortedPhoneRank] = useState([]);
  const [shownData, setShownData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [firstRow, setFirstRow] = useState({});
  const [belowArr, setBelowArr] = useState([]);

  const length = phoneRank?.length;

  useEffect(() => {
    const sortedData = getSortedData(phoneRank, rankColumn);
    const arr = sortedData.slice(passing + 1);
    function updateData() {
      setSortedPhoneRank(sortedData);
      setFirstRow(sortedData[passing]);
      setBelowArr(arr);
    };

    updateData();

    if (length <= 13) {
      setShownData(sortedData);
    } else {
      const interval = setInterval(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % length);
      }, 3000); // Shift the start index every second

      return () => {
        clearInterval(interval); // Clean up the interval on component unmount
      };
    }
  }, [phoneRank, rankColumn, passing, length]);


  useEffect(() => {
    if (length > 13) {
      if (isPopulatedArray(sortedPhoneRank)) {
        let endIndex = (startIndex + 12) % length;
        let slicedData;

        if (endIndex >= startIndex) {
          slicedData = sortedPhoneRank.slice(startIndex, endIndex + 1);
        } else {
          slicedData = sortedPhoneRank.slice(startIndex).concat(sortedPhoneRank.slice(0, endIndex + 1));
        }

        setShownData(slicedData);
      }
    }
  }, [length, sortedPhoneRank, startIndex]);

  function formatData(data) {
    return data.toFixed(2)
  };

  return (
    <MainWrapper >
      <StyledTable>
        {/* table header */}
        <thead>
          <TableRow>
            <TabelHeader>{contentData.centerRank.rank}</TabelHeader>
            <TabelHeader className='active'>{contentData.centerRank.name}</TabelHeader>
            <TabelHeader>{contentData.centerRank.team}</TabelHeader>
            <TabelHeader
              className={
                rankColumn === "callCount" ? "active" : ""
              }
            >
              {contentData.centerRank.callCount}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "answerCount" ? "active" : ""
              }
            >
              {contentData.centerRank.answerCount}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "duration" ? "active" : ""
              }
            >
              {contentData.centerRank.durationTotal}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "effectiveDuration" ? "active" : ""
              }
            >
              {contentData.centerRank.effectiveDurationTotal}
            </TabelHeader>
          </TableRow>
        </thead>
        {/* table body */}
        <tbody>
          {isPopulatedArray(shownData) && shownData.map((i, index) => (
            <TableRow
              key={index}
              className={
                i === firstRow ? "average" : (
                  belowArr.includes(i) ? "below" : "body"
                )
              }
            >
              <TableCell>{sortedPhoneRank.indexOf(i) + 1}</TableCell>
              <TableCell className='name'>
                {i.name}
                <img src={i.sex === "F" ? "/female.png" : "/male.png"} alt="sex" />
                {/* icon female or male */}
              </TableCell>
              <TableCell
                className={
                  i.team === "AU" ? "blue" : "orange"
                }
              >
                <span>{i.team}</span>
              </TableCell>
              <TableCell
                className={
                  rankColumn === "callCount" ? "active" : ""
                }
              >
                {i.callCount}
              </TableCell>
              <TableCell
                className={
                  rankColumn === "answerCount" ? "active" : ""
                }
              >
                {i.answerCount}
              </TableCell>
              <TableCell
                className={
                  rankColumn === "durationTotal" ? "active" : ""
                }
              >
                {formatData(i.durationTotal)}
              </TableCell>
              <TableCell
                className={
                  rankColumn === "effectiveDurationTotal" ? "active" : ""
                }
              >
                {formatData(i.effectiveDurationTotal)}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </MainWrapper >
  )
};

export default PhoneRankTable;
