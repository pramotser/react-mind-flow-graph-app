
import "./decision.scss";

import DecisionFlow from "../../components/decision-flow/decision-flow/Decision-flow";
import { useState } from "react";
import { useLocation } from "react-router-dom";



import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";
import FormInfoFlow from "../../components/form-info-flow/Form-info-flow";

const Decision = (props) => {

    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const setLoadingPages = (loading) => {
        setLoading(loading)
    }

    return (
        <div className="pages-wrapper">
            <LoadingScreen loading={loading} />
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                    <DecisionFlow />
            </div>
        </div>
    );
};

export default Decision;
