
import "./decision.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";

import Decision from '../../components/decision/Decision'

const DecisionFlow = () => {
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
                {/* <Decision
                    setLoadingPages={setLoadingPages}
                    location={location}
                /> */}
            </div>
        </div>
    );
};

export default DecisionFlow;
