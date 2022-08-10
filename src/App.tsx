import { useState } from "react";
import { Header } from "./Components/Header";
import { Table } from "./Components/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Table
        description="Price of cryptocurrency by Markecap"
        filter={{
          vs_currency: "usd",
          order: "market_cap_desc",

          page: "1",
          per_page: "100",

          sparkline: "false",
          price_change_percentage: "1h,24h,7d",
        }}
      />
    </div>
  );
}

export default App;
