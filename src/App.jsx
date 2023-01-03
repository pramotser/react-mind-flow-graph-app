import Home from "./pages/home/Home";
import DecisionFlow from "./pages/decision/Decision";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlowList from "./pages/flow-management/Flow-management";
import FlowCreate from "./pages/flow-create/Flow-create";
import ResultParamManagement from "./pages/result-param-management/Result-param-management";
// import TestDecision from "./pages/test-decision/test-decision";
function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    {/* <Route path="test-decision" element={<TestDecision />} /> */}
                    <Route path="flow-management">
                        <Route index element={<FlowList />} />
                        <Route path=":activn">
                            <Route index element={<FlowCreate />} />
                            <Route path="decision" element={<DecisionFlow />} />
                        </Route>
                    </Route>
                    <Route path="result-param-management">
                        <Route index element={<ResultParamManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
