import Home from "./pages/home/Home";
import Decision from "./pages/decision/Decision";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlowList from "./pages/flow-list/Flow-list";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="decision" element={<Decision />} />
          <Route path="flow-list" element={<FlowList />} />
      </Routes>
    </BrowserRouter>
    </div >
  );
}

export default App;
