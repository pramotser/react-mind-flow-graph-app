import Home from "./pages/home/Home";
import DecisionFlow from "./pages/decision/Decision";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlowList from "./pages/flow-management/Flow-management";
import FlowCreate from "./pages/flow-create/Flow-create";
import {setLoading} from './util/Util'
import LoadingScreen from "./components/layout/loading/LoadingScreen";
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
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
