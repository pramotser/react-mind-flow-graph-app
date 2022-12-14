import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./flow-create.scss";
import FormCreateFlow from "../../components/form-create-flow/Form-create-flow";
// import Datatable from "../../components/datatable/Datatable";
// import { useState } from "react";
// import { tempDataFlow } from '../../assets/data/datasource'

// import { Button } from 'react-bootstrap'
// import * as BsIcons from 'react-icons/bs'
// import * as AiIcons from "react-icons/ai";
// import Swal from "sweetalert2";
// import FormSearchFlow from "../../components/form-search-flow/Form-Search-Flow";
// import { useNavigate } from "react-router-dom";



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
                    <FormCreateFlow
                       
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowCreate;
