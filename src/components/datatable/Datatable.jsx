import "./datatable.scss";

import React from 'react';
import DataTable from 'react-data-table-component';



const Datatable = (props) => {
    return (
        <>
            <div className="listTitle">{props.titleTable}</div>
            <DataTable
                columns={props.columns}
                data={props.data}
                defaultSortFieldId={props.defaultSortFieldId}
                defaultSortAsc={true}
                noHeader
                pagination
                highlightOnHover
            />
        </>
    );
};

export default Datatable;
