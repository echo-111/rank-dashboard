import React, { useEffect, useState } from 'react';
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
  overflow: "scroll"
}));

const TodayRankCard = ({
  passing,
  chartData,
  chartTitle,
}) => {
  const [randomData, setRandomData] = useState([]);
  const [average, setAverage] = useState(0);
  const [showData, setShowData] = useState([]);
  const [showChartData, setShowChartData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  //random number and average line
  const length = chartData?.length;

  useEffect(() => {
    function generateRandomArray(length) {
      const min = 100;
      const max = 300;
      const range = max - min + 1;

      const array = Array.from({ length }, () => Math.floor(Math.random() * range) + min).sort((a, b) => b - a);
      return array;
    };

    function updateData() {
      const randomArray = generateRandomArray(length);
      setRandomData(randomArray);
      setAverage(randomArray[passing]);
    };

    updateData(); // Initial data update

    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % length);
    }, 3000); // Shift the start index every second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [length, passing]);

  //get shown data 
  useEffect(() => {
    if (randomData && randomData.length > 0) {
      let endIndex = (startIndex + 9) % length;

      let slicedData;
      let slicedChartData;

      if (endIndex >= startIndex) {
        slicedData = randomData.slice(startIndex, endIndex + 1);
        slicedChartData = chartData.slice(startIndex, endIndex + 1);
      } else {
        slicedData = randomData.slice(startIndex).concat(randomData.slice(0, endIndex + 1));
        slicedChartData = chartData.slice(startIndex).concat(chartData.slice(0, endIndex + 1));
      }

      setShowData(slicedData);
      setShowChartData(slicedChartData);
    }
  }, [randomData, chartData, startIndex, length]);

  //au and sg color
  const bg = showChartData && showChartData.map((x) => {
    let arr = [];
    x.team === "AU" ? arr.push("#367BF5") : arr.push("#F39200");
    return arr;
  });

  //bar chart data
  const labels = showChartData && showChartData.map((x) => x.name);

  const data = {
    labels,
    datasets: [
      {
        label: "rank",
        data: showData,
        backgroundColor: bg,
        hoverBackgroundColor: bg,
      }
    ]
  };

  //average line
  const arbitraryLine = {
    id: "arbitraryLine",
    afterDatasetsDraw(chart) {
      const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;
      ctx.canvas.style.zIndex = "10";
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#00873C";
      ctx.moveTo(x.getPixelForValue(average), top - 5);
      ctx.lineTo(x.getPixelForValue(average), bottom + 5);
      ctx.stroke();
      ctx.restore();
    }
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

  return (
    <RankCard>
      <ContentContainer>
        <h2>{chartTitle}</h2>
        <ChartContainer>
          {average &&
            <Bar data={data} options={options}
              plugins={[arbitraryLine]}
            />
          }
        </ChartContainer>
      </ContentContainer>
    </RankCard>
  )
};

export default TodayRankCard;