import { useState } from "react";
import { Header } from "./Components/Header";
import { Table } from "./Components/Table";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Table
                description="Price of the meow main cryptocurrencies by Market capitalization!"
                filter={{
                  vs_currency: "usd",
                  order: "market_cap_desc",
                  page: "1",
                  per_page: "100",
                  sparkline: "false",
                  price_change_percentage: "1h,24h,7d",
                }}
              />
            }
          />
          <Route
            path="nft"
            element={
              <Table
                description="Price of cryptocurrency by Markecap"
                filter={{
                  vs_currency: "usd",
                  order: "market_cap_desc",
                  page: "1",
                  category: "non-fungible-tokens-nft",
                  per_page: "100",
                  sparkline: "false",
                  price_change_percentage: "1h,24h,7d",
                }}
              />
            }
          />
          <Route
            path="de-fi"
            element={
              <Table
                description="Price of cryptocurrency De-Fis by Market Capitalization"
                filter={{
                  vs_currency: "usd",
                  order: "market_cap_desc",
                  page: "1",
                  category: "decentralized-finance-defi",
                  per_page: "100",
                  sparkline: "false",
                  price_change_percentage: "1h,24h,7d",
                }}
              />
            }
          />
          <Route
            path="exchange"
            element={
              <Table
                description="Price of cryptocurrency's exchange by Market Capitalization"
                filter={{
                  vs_currency: "usd",
                  order: "market_cap_desc",
                  page: "1",
                  category: "exchange-based-tokens",
                  per_page: "100",
                  sparkline: "false",
                  price_change_percentage: "1h,24h,7d",
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
