import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import UpperWrapper from '../UpperWrapper';
import jsonData from "../../utils/response.json";
import Header from '../Header';
// import RankApi from '../../api/rankApi';

const MainContainer = styled("div")({
  height: "100%",
  overflow: "hidden",
});

const MainContent = () => {
  const [allRank, setAllRank] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const RankResponse = await RankApi();
        const RankResponse = jsonData;
        setAllRank(RankResponse.data.ranking);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 15 minutes
    const intervalId = setInterval(fetchData, 15 * 60 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainContainer>
      <Header time={allRank?.time} />
      {allRank &&
        <UpperWrapper
          allRank={allRank}
        />}
    </MainContainer>
  )
};

export default MainContent;