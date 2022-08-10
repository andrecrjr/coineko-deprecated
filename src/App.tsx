import { useState } from "react";
import { Header } from "./Components/Header";
import { Table } from "./Components/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Table description="Price of cryptocurrency by Markecap" />
    </div>
  );
}

export default App;
