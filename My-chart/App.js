import React, { useState } from "react";
import "./App.css";
import ChartComponent from "./components/Charts";
import TimeframeSelector from "./components/TimeframeSelector";

const App = () => {
  const [timeframe, setTimeframe] = useState("daily");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Charting Application</h1>
      </header>
      <main>
        <TimeframeSelector onSelect={setTimeframe} />
        <ChartComponent timeframe={timeframe} />
      </main>
    </div>
  );
};

export default App;
