import "./datatable.scss";

import React from 'react';
import DataTable from 'react-data-table-component';

const Datatable = (props) => {
    return (
        <>
            <div className="sub-title-content">{props.titleTable}</div>
            <DataTable
                columns={props.columns}
                data={props.data}
                defaultSortFieldId={props.defaultSortFieldId}
                defaultSortAsc={true}
                noHeader
                pagination
                highlightOnHover
                paginationPerPage={props.paginationPerPage}
                paginationRowsPerPageOptions={props.paginationRowsPerPageOptions}
            />
        </>
    );
};

export default Datatable;
