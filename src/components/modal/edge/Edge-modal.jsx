import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Row, Col } from 'react-bootstrap'
import Select from 'react-select'

import { edgeTypeOption, edgeConditionOption, edgeParamConditionOption } from '../../../config/DataConfig';
import { getEdgeConditionOptionObject, getEdgeTypeOptionObject, getEdgeParamConditionOptionObject } from '../../../util/Util'

import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'

import './edge-modal.scss'
import Datatable from '../../datatable/Datatable';

function EdgeModal(props) {
    const [edgeParamData, setEdgeParamData] = useState([])
    const headerColumnEdgeParam = [
        {
            name: 'Edge Condition',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Select
                        styles={{ position: 'relative' }}
                        options={edgeConditionOption}
                        placeholder="Edge Condition"
                        isSearchable={false}
                        defaultValue={getEdgeConditionOptionObject(row.edgeCondition)}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeCondition", e.value)}
                    />
                </>
            ),
        },
        {
            name: 'Edge Type',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Select
                        options={edgeTypeOption}
                        placeholder="Edge Type"
                        isSearchable={false}
                        defaultValue={getEdgeTypeOptionObject(row.edgeType)}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeType", e.value)}
                    />
                </>
            ),
        },
        {
            name: 'Edge Param',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Form.Control
                        type="text"
                        placeholder="Edge Param"
                        defaultValue={row.edgeParam}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParam", e.target.value)}
                    />
                </>
            ),
        },
        {
            name: 'Edge Param Condition',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Select
                        options={edgeParamConditionOption}
                        placeholder="Edge Param Condition"
                        isSearchable={false}
                        defaultValue={getEdgeParamConditionOptionObject(row.edgeParamCondition)}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParamCondition", e.value)}
                    />
                </>
            ),
        },
        {
            name: 'Edge Param Compare',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Form.Control
                        type="text"
                        placeholder="Edge Param Compare"
                        defaultValue={row.edgeParamCompare}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParamCompare", e.target.value)}
                    />
                </>
            ),
        },
        {
            name: 'Edge Value Compare',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Form.Control
                        type="text"
                        placeholder="Edge Value Compare"
                        defaultValue={row.edgeValueCompare}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeValueCompare", e.target.value)}
                    />
                </>
            ),
        },
        {
            name: 'Action',
            sortable: true,
            reorder: true,
            cell: (row) => (
                <>
                    <Button
                        variant="outline-danger"
                        onClick={e => onDeleteEdgeParam(row.edgeParamId)}
                    >
                        <BsIcons.BsTrash />
                    </Button>
                </>
            ),
        },
    ];

    const generateEdgeParam = () => `${edgeParamData.length.toString().padStart(3, '0')}`
    useEffect(() => {
        setEdgeParamData(JSON.parse(JSON.stringify(props.edgeParam || [])))
    }, [props])

    const onChangeEdgeParam = (edgeParamId, field, value) => {
        setEdgeParamData((nds) =>
            nds.map((n) => {
                if (n.edgeParamId === edgeParamId) {
                    n[field] = value
                }
                return n;
            })
        );
    }

    const onAddCondition = () => {
        var edgeParam = {
            edgeId: props.idEdge,
            edgeParamId: generateEdgeParam(),
            edgeCondition: [],
            edgeType: [],
            edgeParam: "",
            edgeParamCondition: [],
            edgeParamCompare: "",
            edgeValueCompare: ""
        };
        console.log(edgeParam)
        setEdgeParamData(
            (e) => e.concat(edgeParam)
        )
    }

    const onDeleteEdgeParam = (edgeParamId) => {
        setEdgeParamData((ep) => ep.filter((edgeParam) => edgeParam.edgeParamId !== edgeParamId))
    }

    const onSave = () => {
        props.onSaveEdgeParam(edgeParamData);
    }

    const onDelete = () => {
        props.onDeleteEdge(props.idEdge)
    }

    return (
        <>
            <Modal
                size="xl"
                show={props.showModalEdge}
                onHide={props.cModal}
                backdrop="static"
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Condition Edge</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body-edge'>

                    <Form>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label className="text-right" column md={3} >
                                Edge Id :
                            </Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Node Name"
                                    value={props.idEdge}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Node Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group style={{ textAlign: 'right' }}>
                            <Button variant="outline-info" onClick={onAddCondition}>
                                <BiIcons.BiPlusCircle /> Add
                            </Button>
                        </Form.Group>
                        <Datatable
                            titleTable={'Edge Param List'}
                            columns={headerColumnEdgeParam}
                            data={edgeParamData}
                            defaultSortFieldId={1}
                            paginationPerPage={7}
                            paginationRowsPerPageOptions={[]}
                        />
                    </Form>
                    {/* <Form className='max-height'>
                        <Row>
                            <Form.Group>
                                <Form.Label>Edge Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Node Name"
                                    value={props.idEdge}
                                    disabled
                                />
                                <br></br>
                            </Form.Group>
                            <Form.Group style={{ textAlign: 'right' }}>
                                <Button variant="outline-info" onClick={onAddCondition}>
                                    <BiIcons.BiPlusCircle /> Add
                                </Button>
                            </Form.Group>
                        </Row>
                        <br></br>
                        <Form.Group>
                            <div className='body-table'>
                                <Table responsive="true" className='table-fixed'>
                                    <thead>
                                        <tr>
                                            <th>Edge Condition</th>
                                            <th>Edge Type</th>
                                            <th>Edge Param</th>
                                            <th>Edge Param Condition</th>
                                            <th>Edge Param Compare</th>
                                            <th>Edge Value Compare</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            edgeParamData && edgeParamData.map((item) => (
                                                <tr key={item.edgeParamId}>
                                                    <td>
                                                        <Select
                                                            options={edgeConditionOption}
                                                            placeholder="Edge Condition"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeConditionOptionObject(item.edgeCondition)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeCondition", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            options={edgeTypeOption}
                                                            placeholder="Edge Type"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeTypeOptionObject(item.edgeType)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeType", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Param"
                                                            defaultValue={item.edgeParam}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParam", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            options={edgeParamConditionOption}
                                                            placeholder="Edge Param Condition"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeParamConditionOptionObject(item.edgeParamCondition)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParamCondition", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Param Compare"
                                                            defaultValue={item.edgeParamCompare}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParamCompare", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Value Compare"
                                                            defaultValue={item.edgeValueCompare}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeValueCompare", e.target.value)}
                                                        />
                                                    </td>

                                                    <td>
                                                        <Button variant="outline-danger"
                                                            onClick={e => onDeleteEdgeParam(item.edgeParamId)}
                                                        >
                                                            <BsIcons.BsTrash /> Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Form.Group>
                    </Form> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.cModal}>
                        Close
                    </Button>
                    <Button variant="outline-danger" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button variant="outline-primary" onClick={onSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EdgeModal;


