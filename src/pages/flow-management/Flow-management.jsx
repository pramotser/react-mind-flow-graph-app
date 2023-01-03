import "./flow-management.scss";
import { useState } from "react";
import { Button } from 'react-bootstrap'
import * as BsIcons from 'react-icons/bs'
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import FormSearchFlow from '../../components/form-search-flow/Form-search-flow'
import Datatable from "../../components/datatable/Datatable";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";
import { getFlowByCondition } from "../../services/decision-service";
import { deleteFlow } from "../../services/decision-service";
import { mode } from "../../config/config";

const FlowManagement = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([])

    const handleButtonEditClick = (event, data) => {
        navigate('edit', { state: { mode: mode.edit.value, data: data } });
    }

    const handleButtonDeleteClick = (event, data) => {
        Swal.fire({
            title: `Are you sure delete Flow ${data.flowId} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingPages(true)
                deleteFlow(data).then(responseObject => {
                    setLoadingPages(false)
                    if (responseObject.responseCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: `Success!`,
                            text: 'Data has been delete successfully',
                            showCancelButton: false,
                        }).then(() => {
                            setLoadingPages(true)
                            getFlowByCondition('').then(response => {
                                if (response.responseObject.length > 0) {
                                    search(response.responseObject);
                                } else {
                                    search([])
                                }
                                setLoadingPages(false)
                            })
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: `Error!`,
                            text: `${responseObject.responseDecription}!`,
                            showCancelButton: false,
                        });
                    }
                });
            }
        })


    }

    const headerColumnFlow = [
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
            name: 'Result Param',
            selector: row => row.resultParam,
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
                        onClick={(e) => handleButtonEditClick(e, row)}
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
                        onClick={(e) => handleButtonDeleteClick(e, row)}
                    >
                        <BsIcons.BsTrash />
                    </Button>
                </>
            ),
        }
    ];

    const search = (dataSearch) => {
        setSearchData(dataSearch)
    }

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
                        <h1>Flow Management</h1>
                    </div>
                    <FormSearchFlow
                        search={search}
                        setLoadingPages={setLoadingPages}
                    />
                    <hr />
                    <Datatable
                        titleTable={'Flow Data List'}
                        columns={headerColumnFlow}
                        data={searchData}
                        paginationPerPage={10}
                        defaultSortFieldId={1}
                        paginationResetDefaultPage={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowManagement;
