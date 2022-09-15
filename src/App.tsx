import { useState } from "react";
import { Header } from "./Components/Header";
import { Table } from "./Components/Table";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FilterGlobalContext } from "./Contexts";

function App() {
  return (
    <Router>
      <FilterGlobalContext.Provider
        value={{
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: "50",
          sparkline: "false",
          page: 1,
          price_change_percentage: "1h,24h,7d",
        }}
      >
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Table description="Price of the meow main cryptocurrencies by Market capitalization!" />
              }
            />
            <Route
              path="nft"
              element={
                <Table
                  description="Price of NFT's cryptocurrency by Market Cap"
                  category={"non-fungible-tokens-nft"}
                />
              }
            />
            <Route
              path="de-fi"
              element={
                <Table
                  description="Price of cryptocurrency De-Fis by Market Capitalization"
                  category={"decentralized-finance-defi"}
                />
              }
            />
            <Route
              path="exchange"
              element={
                <Table
                  description="Price of cryptocurrency's exchange by Market Capitalization"
                  category={"exchange-based-tokens"}
                />
              }
            />
          </Routes>
        </div>
      </FilterGlobalContext.Provider>
    </Router>
  );
}

export default App;
