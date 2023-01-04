import "./result-param-create.scss";
import { useState } from 'react'
import { useLocation } from 'react-router-dom';

import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";
import FormCreateResultParam from "../../components/result-param/form-create-result-param/Form-create-result-param";

// import FormCreateFlow from "../../components/form-create-flow/Form-create-flow";
const ResultParamCreate = () => {
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
                <div className="content">
                    <div className="title-content">
                        <h1>Create Result Param</h1>
                    </div>
                    <FormCreateResultParam
                        location={location}
                        setLoadingPages={setLoadingPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultParamCreate;
