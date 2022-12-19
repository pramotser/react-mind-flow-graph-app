import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./flow-create.scss";
import FormCreateFlow from "../../components/form-create-flow/Form-create-flow";
import { useLocation } from 'react-router-dom';
const FlowCreate = () => {
    const location = useLocation();
    return (
        <div className="pages-wrapper">
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <div className="content">
                    <div className="title-content">
                        <h1>Create Flow</h1>
                    </div>
                    <FormCreateFlow
                        location={location}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowCreate;
