import React from 'react';
import 'reactflow/dist/style.css';
import '../index.css';
import DecisionFlow from './pages/decision-flow/Decision-flow';
import Navbars from './layout/navbar/Navbar';
import { Route, Routes, Router } from 'react-router-dom'
import Home from './pages/home/Home'
const App = () => {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decisionFlow" element={<DecisionFlow />} />
      </Routes>
    </>
  );
};
export default App;
