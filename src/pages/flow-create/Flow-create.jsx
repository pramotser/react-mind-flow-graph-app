import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./flow-create.scss";
import FormCreateFlow from "../../components/form-create-flow/Form-create-flow";
import { Tabs, Tab } from 'react-bootstrap'
import DecisionFlow from "../../components/decision-flow/decision-flow/Decision-flow";
import Flow from "../../components/decision/Decision";

const FlowCreate = () => {

    return (
        <div className="pages-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <div className="content">
                    <div className="title-content">
                        <h1>Create Flow</h1>
                    </div>
                    <FormCreateFlow />
                </div>
            </div>
        </div>
    );
};

export default FlowCreate;
