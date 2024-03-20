import React from 'react'
import { contentData } from '../../../../content/contentData';
import { styled } from 'styled-components';
import { isPopulatedArray } from '../../../../utils/helper';

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
    position: "absolute",
    width: 790,
    height: 50,
    paddingLeft: 23,
    margin: "0 -5px",
    background: "#FF9D7C",
    borderRadius: 10,
    boxShadow: "0px 3px 8px rgba(188, 88, 55, 0.51)",
  },
  "&.below": {
    height: 50,
    backgroundColor: "#F39A7D",
    borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
  },
  "&.firstBelow": {
    marginTop: 50,
    height: 50,
    backgroundColor: "#F39A7D",
    borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
  },
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
  sortedPhoneRank,
  passing,
  handleSortChange,
  rankColumn
}) => {

  const handleThClick = (e) => {
    handleSortChange(e)
  };

  function formatData(data) {
    return data.toFixed(2)
  };

  const getClassName = (index) => {
    let className = "";
    if (index < passing) {
      className = "body"
    } else if (index === passing) {
      className = "average"
    } else if (index === passing + 1) {
      className = "firstBelow"
    } else {
      className = "below"
    }
    return className;
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
              onClick={() => handleThClick("callCount")}
            >
              {contentData.centerRank.callCount}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "answerCount" ? "active" : ""
              }
              onClick={() => handleThClick("answerCount")}
            >
              {contentData.centerRank.answerCount}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "durationTotal" ? "active" : ""
              }
              onClick={() => handleThClick("durationTotal")}
            >
              {contentData.centerRank.durationTotal}
            </TabelHeader>
            <TabelHeader
              className={
                rankColumn === "effectiveDurationTotal" ? "active" : ""
              }
              onClick={() => handleThClick("effectiveDurationTotal")}
            >
              {contentData.centerRank.effectiveDurationTotal}
            </TabelHeader>
          </TableRow>
        </thead>
        {/* table body */}
        <tbody>
          {isPopulatedArray(sortedPhoneRank) && sortedPhoneRank.map((i, index) => (
            <TableRow
              key={index}
              className={
                getClassName(index)
              }
            >
              <TableCell>{index + 1}</TableCell>
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
