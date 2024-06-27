import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toPng } from "html-to-image";
import download from "downloadjs";
import "./styles.css";

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json"); //fetch data from public
      const data = await response.json();
      const filteredData = filterData(data);
      setChartData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = (data) => {
    return data.map((d) => ({
      timestamp: new Date(d.timestamp).toISOString().substring(0, 10),
      value: d.value,
    }));
  };

  useEffect(() => {
    fetchData();
  });

  const exportChart = (format) => {
    toPng(document.getElementById("chart-container")).then((dataUrl) => {
      download(dataUrl, `chart.${format}`);
    });
  };

  return (
    <div>
      <div id="chart-container" className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button onClick={() => exportChart("png")}>Export as PNG</button>
      <button onClick={() => exportChart("jpg")}>Export as JPG</button>
    </div>
  );
};

export default ChartComponent;
