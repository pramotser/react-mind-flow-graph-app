import Home from "./pages/home/Home";
import Decision from "./pages/decision/Decision";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlowList from "./pages/flow-management/Flow-management";
import FlowCreate from "./pages/flow-create/Flow-create";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="decision" element={<Decision />} /> */}
          <Route path="flow-management">
            <Route index element={<FlowList />} />
            <Route path="create">
              <Route index element={<FlowCreate />} />
              <Route path="decision" element={<Decision />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
