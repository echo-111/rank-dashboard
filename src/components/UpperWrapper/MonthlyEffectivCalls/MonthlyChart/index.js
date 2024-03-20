import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { contentData } from '../../../../content/contentData';
import { ColorBox, TabText } from '../../TitleTab';
import { isPopulatedArray } from '../../../../utils/helper';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

const ChartContainer = styled("div")({
  padding: "12px 18px",
  "&>h2": {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "26px",
    color: "#32363A"
  },
  "&>div": {
    paddingTop: 10,
  }
});

const TitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  "&>div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginLeft: 45,
    "&>p": {
      fontSize: 12,
    }
  }
})

const MonthlyChart = ({ effectiveCallRank, effectiveCallScore }) => {
  const [sortedData, setSortedData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [bgC, setBgC] = useState([]);
  const [bgE, setBgE] = useState([]);
  const [calls, setCalls] = useState([]);
  const [effective, setEffective] = useState([]);

  useEffect(() => {
    const newData = effectiveCallRank.sort((a, b) => (b.calls) - (a.calls));
    setSortedData(newData);
  }, [effectiveCallRank]);

  useEffect(() => {
    if (isPopulatedArray(sortedData)) {
      const l = sortedData?.map((x) => [x.name]);
      const e = sortedData?.map((x) => {
        let arr = [];
        x.team === "AU" ? arr.push("#629BFF") : arr.push("#FFC369");
        return arr;
      });
      const c = sortedData?.map((x) => {
        let arr = [];
        x.team === "AU" ? arr.push("#367BF5") : arr.push("#F39200");
        return arr;
      });
      const data_1 = sortedData?.map((x) => x.calls - x.effectiveCalls);
      const data_2 = sortedData?.map((x) => x.effectiveCalls);

      setBgC(c);
      setBgE(e);
      setLabels(l);
      setCalls(data_1);
      setEffective(data_2);
    }
  }, [sortedData])

  const arbitraryLine = {
    id: "arbitraryLine",
    afterDatasetsDraw(chart) {
      const { ctx, chartArea: { left, width, }, scales: { y } } = chart;
      ctx.save();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "#00873C";
      ctx.strokeRect(left, y.getPixelForValue(effectiveCallScore), width, 0);
      ctx.stroke();
      ctx.restore();
    }
  };

  const options = {
    animation: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      arbitraryLine
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      }
    }
  };

  //bar chart
  const data = {
    labels,
    datasets: [
      {
        label: "number_of_calls",
        data: calls,
        backgroundColor: bgC,
        hoverBackgroundColor: bgC,
        barThickness: 16
      },
      {
        label: "through_rate",
        data: effective,
        backgroundColor: bgE,
        hoverBackgroundColor: bgE,
        barThickness: 16
      },
    ]
  };

  return (
    <ChartContainer>
      <TitleContainer>
        <h2>{contentData.charts.effectiveCalls}</h2>
        <div>
          <ColorBox bc="#367BF5" />
          <TabText>{contentData.monthly.auCalls}</TabText>
          <ColorBox bc="#629BFF" />
          <TabText>{contentData.monthly.auEffectiveCalls}</TabText>
          <ColorBox bc="#F39200" />
          <TabText>{contentData.monthly.sgCalls}</TabText>
          <ColorBox bc="#FFC369" />
          <TabText>{contentData.monthly.sgEffectiveCalls}</TabText>
        </div>
      </TitleContainer>

      <div>
        {sortedData &&
          <Bar
            height={120}
            options={options}
            data={data}
            plugins={[arbitraryLine]}
          />
        }
      </div>
    </ChartContainer>
  )
};

export default MonthlyChart;