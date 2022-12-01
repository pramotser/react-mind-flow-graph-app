import React from 'react';
import 'reactflow/dist/style.css';
import '../index.css';
import DecisionFlow from './decision-flow/Decision-Flow';
import Navbars from './layout/Navbar';

const App = () => {
  return (
    <>
      <Navbars/>
      <DecisionFlow/>
    </>
  );
};

export default App;
