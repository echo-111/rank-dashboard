import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RankCard = styled("div")((props) => ({
  height: 320,
  width: 502,
  backgroundColor: "#fff",
  borderRadius: "18px",
  borderShadow: " 0px 1px 3px rgba(0, 0, 0, 0.15)",
}));

const ContentContainer = styled("div")((props) => ({
  padding: "10px 20px",
  textAlign: props.ta,
  "&>h2": {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "26px",
    color: "#32363A"
  }
}));

const ChartContainer = styled("div")((props) => ({
  height: 255,
  width: 458,
  paddingTop: 10,
  overflow: "scroll",
  position: "relative",
}));

const LineContainer = styled("div")((props) => ({
  position: "absolute",
  left: props.left,
  top: 0,
  bottom: 0,
  width: 0,
  borderLeft: "2px dashed #00873C",
}));

const TodayRankCard = ({
  passing,
  chartData,
  chartTitle,
}) => {
  const [randomData, setRandomData] = useState([]);
  const [average, setAverage] = useState(0);

  //random number and average line
  const length = chartData?.length;

  useEffect(() => {
    function generateRandomArray(length) {
      const min = 100;
      const max = 300;
      const range = max - min + 1;

      const array = Array.from({ length }, () => Math.floor(Math.random() * range) + min).sort((a, b) => b - a);
      return array;
    }
    const randomArray = generateRandomArray(length);

    setRandomData(randomArray);
    setAverage(randomArray[passing]);

  }, [length, passing]);

  //au and sg color
  const bg = chartData && chartData.map((x) => {
    let arr = [];
    x.team === "AU" ? arr.push("#367BF5") : arr.push("#F39200");
    return arr;
  });

  //bar chart data
  const labels = chartData && chartData.map((x) => x.name);

  const data = {
    labels,
    datasets: [
      {
        label: "rank",
        data: randomData,
        backgroundColor: bg,
        hoverBackgroundColor: bg,
      }
    ]
  };

  const options = {
    indexAxis: "y",
    animation: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
    },
    responsive: true,
    scales: {
      x: {
        max: 300,
        min: 0,
        ticks: {
          display: false,
          autoSkip: false,
        },
      },
      y: {
        ticks: {
        }
      }
    },
  };


  //average line
  const lineContainerRef = useRef(null);

  useEffect(() => {
    if (lineContainerRef.current) {
      const lineContainer = lineContainerRef.current;

      const linePosition = randomData[passing] / 0.75 + 58;// chart width 458, label width 58, bar container width 400 and max value = 300

      lineContainer.style.left = `${linePosition}px`;
    }
  }, [passing, randomData]);

  return (
    <RankCard>
      <ContentContainer>
        <h2>{chartTitle}</h2>
        <ChartContainer>
          <Bar data={data} options={options}
          />
          {average && (
            <LineContainer ref={lineContainerRef} left={0} />
          )}
        </ChartContainer>
      </ContentContainer>
    </RankCard>
  )
};

export default TodayRankCard;