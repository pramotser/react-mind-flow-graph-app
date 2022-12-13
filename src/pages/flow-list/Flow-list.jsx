import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./flow-list.scss";
import Datatable from "../../components/datatable/Datatable";
import { useState } from "react";
import { tempDataFlow } from '../../assets/data/datasource'

import { Button } from 'react-bootstrap'
import * as BsIcons from 'react-icons/bs'
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";
import FormSearchFlow from "../../components/form-search-flow/Form-Search-Flow";


const handleButtonClick = (event, id) => {
    Swal.fire(
        'coming soon..',
        '',
        'warning'
    )
}

export const headerColumnFlow = [
    {
        name: 'Flow Id',
        selector: row => row.flowId,
        sortable: true,
        center: true,
        width: "150px",
        reorder: true,
    },
    {
        name: 'Flow Name',
        selector: row => row.flowName,
        sortable: true,
        reorder: true,
    },
    {
        name: 'Active',
        cell: (row) => ((row.isActive === 'Y') ? 'Active' : 'Inactive'),
        center: true,
        width: "150px",
        sortable: true,
        reorder: true,
    },
    {
        name: "Edit",
        button: true,
        center: true,
        width: "100px",
        cell: (row) => (
            <>
                <Button
                    variant="outline-warning"
                    onClick={(e) => handleButtonClick(e, row.flowId)}
                >
                    <AiIcons.AiOutlineEdit />
                </Button>
            </>
        ),
    },
    {
        name: "Delete",
        button: true,
        center: true,
        width: "100px",
        cell: (row) => (
            <>
                <Button
                    variant="outline-danger"
                    onClick={(e) => handleButtonClick(e, row.flowId)}
                >
                    <BsIcons.BsTrash />
                </Button>
            </>
        ),
    }
];

const FlowList = () => {

    const [searchData, setSearchData] = useState(tempDataFlow)

    const search = (dataSearch) => {
        setSearchData(dataSearch)
    }

    return (
        <div className="flow-list">
            <Sidebar />
            <div className="flow-list-container">
                <Navbar />
                <div className="listContainer">
                    <div className="title-pages">
                        <h1>Flow Management</h1>
                    </div>
                    <FormSearchFlow
                        search={search}
                    />
                    <hr />
                    <Datatable
                        titleTable={'Flow Data List'}
                        columns={headerColumnFlow}
                        data={searchData}
                        defaultSortFieldId={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowList;
