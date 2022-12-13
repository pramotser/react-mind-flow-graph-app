import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import DecisionFlow from "../../components/decision-flow/decision-flow/Decision-flow";
import "./decision.scss";

const Decision = () => {
  return (
    <div className="decision">
      <Sidebar />
      <div className="decisionContainer">
        <Navbar />
        {/* <div className="widgets"> */}
          <DecisionFlow />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Decision;
