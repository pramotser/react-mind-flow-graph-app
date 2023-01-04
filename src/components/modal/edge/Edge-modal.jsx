import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'

import { edgeTypeOption, edgeConditionOption, edgeParamConditionOption, edgeParamConditionOptionNew } from '../../../config/config';
import { getEdgeConditionOptionObject, getEdgeTypeOptionObject, getEdgeParamConditionOptionObject, isNullOrUndefined } from '../../../util/Util'

import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'



import './edge-modal.scss'
import Datatable from '../../datatable/Datatable';

let edgeParamIdRunning = 0;
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
                        className='select-in-table'
                        style={{ minWidth: "200px" }}
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
                        className='select-in-table'
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
                        className='select-in-table'
                        options={(!isNullOrUndefined(row.edgeType)) ? edgeParamConditionOptionNew.filter((option) => option.data.type === row.edgeType) : edgeParamConditionOptionNew}
                        placeholder="Edge Param Condition"
                        isSearchable={false}
                        isDisabled={isNullOrUndefined(row.edgeType)}
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


    const test =(e) =>{
        console.log(e)
        console.log((isNullOrUndefined(e.edgeType)))
        console.log((!isNullOrUndefined(e.edgeType)) ? 'ss' : 'xx')
        console.log(e.edgeType)
        // console.log((!isNullOrUndefined(e.edgeType)) ? edgeParamConditionOptionNew.filter((option) => option.data.type === e.edgeType) : edgeParamConditionOptionNew)
        // console.log()
    }

    // const generateEdgeParam = () => `${edgeParamData.length.toString().padStart(3, '0')}`
    const generateEdgeParam = () => `${(edgeParamIdRunning++).toString()}`
    useEffect(() => {
        setEdgeParamData(JSON.parse(JSON.stringify(props.edgeParam || [])))
        if (!isNullOrUndefined(props.edgeParam)) {
            let edgeParamId = props.edgeParam.map((ep) => { return Number.parseInt(ep.edgeParamId) });
            edgeParamIdRunning = Math.max(...edgeParamId)
            edgeParamIdRunning++
        } else {
            edgeParamIdRunning = 0;
        }
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
                        {/* <Form.Group as={Row} className="mb-4">
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
                        </Form.Group> */}
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


