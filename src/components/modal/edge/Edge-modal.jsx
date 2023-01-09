import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'

import {
    edgeConditionOption,
    edgeParamConditionOption,
    DropdownType,
    ActiveFlag,
    NodeType
} from '../../../config/config';
import {
    getEdgeConditionOptionObject,
    getEdgeParamConditionOptionObject,
    isNullOrUndefined
} from '../../../util/Util'

import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'

import './edge-modal.scss'
import Datatable from '../../tools/datatable/Datatable';
import { getDropdownByType, getParamListByFunctionRef } from '../../../services/util-service';
import CreatableSelect from 'react-select/creatable';

let edgeParamIdRunning = 0;
function EdgeModal(props) {
    const {
        setLoadingPages,
        sourceNode,
        nodeStart,
        edgeParam,
        sourceNodeDetail,
        idEdge,
    } = props;
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
            name: 'Edge Params',
            sortable: true,
            reorder: true,
            center: true,
            width: "200px",
            cell: (row) => (
                <>
                    <Select
                        className='select-in-table'
                        options={edgeParamOption}
                        placeholder="Edge Param"
                        isSearchable={true}
                        isClearable={true}
                        defaultValue={edgeParamOption.filter((eto) => eto.value === row.edgeParam)}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParam", e)}
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
                        options={(!isNullOrUndefined(row.edgeType)) ? edgeParamConditionOption.filter((option) => option.data.type === row.edgeType) : edgeParamConditionOption}
                        placeholder="Edge Param Condition"
                        isSearchable={false}
                        isClearable={true}
                        isDisabled={isNullOrUndefined(row.edgeParam)}
                        value={((isNullOrUndefined(row.edgeParamCondition)) ? [] : getEdgeParamConditionOptionObject(row.edgeParamCondition))}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParamCondition", (!isNullOrUndefined(e) ? e.value : e))}
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
                    <Select
                        className='select-in-table'
                        options={edgeParamValueOption}
                        placeholder="Edge Param Compare"
                        isSearchable={true}
                        isClearable={true}
                        isDisabled={!isNullOrUndefined(row.edgeValueCompare)}
                        value={edgeParamValueOption.filter((eto) => eto.value === row.edgeParamCompare)}
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeParamCompare", (!isNullOrUndefined(e) ? e.value : e))}
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
                    <CreatableSelect
                        className='select-in-table'
                        options={edgeParamValueOption}
                        placeholder="Edge Value Compare"
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={!isNullOrUndefined(row.edgeParamCompare)}
                        value={

                            (
                                isNullOrUndefined(row.edgeValueCompare) ? row.edgeValueCompare :
                                    (edgeParamValueOption.filter((eto) => eto.value === row.edgeValueCompare).length > 0)
                                        ? edgeParamValueOption.filter((eto) => eto.value === row.edgeValueCompare)
                                        : { value: row.edgeValueCompare, label: row.edgeValueCompare }
                            )
                        }
                        onChange={e => onChangeEdgeParam(row.edgeParamId, "edgeValueCompare", (!isNullOrUndefined(e) ? e.value : e))}
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
    const [edgeParamOption, setEdgeParamOption] = useState([])
    const [edgeParamValueOption, setEdgeParamValueOption] = useState([])
    
    // const generateEdgeParam = () => `${edgeParamData.length.toString().padStart(3, '0')}`
    const generateEdgeParam = () => `${(edgeParamIdRunning++).toString()}`
    useEffect(() => {
        if (sourceNode !== nodeStart) {
            if (!isNullOrUndefined(sourceNodeDetail)) {
                setLoadingPages(true)
                getDropdownByType(DropdownType.UNIVERSAL_FIELD_LIST, ActiveFlag.N).then(resUniver => {
                    let edgeParamOptions = resUniver.responseObject
                    setEdgeParamData(JSON.parse(JSON.stringify(edgeParam || [])))
                    if (!isNullOrUndefined(edgeParam)) {
                        let edgeParamId = edgeParam.map((ep) => { return Number.parseInt(ep.edgeParamId) });
                        edgeParamIdRunning = Math.max(...edgeParamId)
                        edgeParamIdRunning++
                    } else {
                        edgeParamIdRunning = 0;
                    }
                    if (sourceNodeDetail['data']['nodeType'] === NodeType.SUBFLOW) {
                        getDropdownByType(DropdownType.FLOW_LIST, ActiveFlag.Y).then(resSub => {
                            let subFlowList = resSub.responseObject.filter((sub) => sub.value === sourceNodeDetail['data']['subFlowId']);
                            if (subFlowList.length > 0) {
                                subFlowList = subFlowList.map((sub) => {
                                    return {
                                        value: sub.data.flowResultParam,
                                        label: sub.data.flowResultParam,
                                        data: {
                                            universalFieldType: null
                                        }
                                    };
                                });
                                setEdgeParamOption(subFlowList)
                                setEdgeParamValueOption(edgeParamOptions.concat(subFlowList));
                            }
                        })
                        setLoadingPages(false)
                    }
                    else if (sourceNodeDetail['data']['nodeType'] === NodeType.FUNCTION) {
                        setLoadingPages(true);
                        getParamListByFunctionRef(sourceNodeDetail['data']['functionRef'], ActiveFlag.N).then(resFuncRef => {
                            setEdgeParamOption(resFuncRef.responseObject);
                            setEdgeParamValueOption(edgeParamOptions.concat(resFuncRef.responseObject));
                            setLoadingPages(false);
                        })
                    } else {
                        setEdgeParamOption(edgeParamOptions);
                        setEdgeParamValueOption(edgeParamOptions)
                        setLoadingPages(false)
                    }
                })
            }
        }
    }, [])

    const onChangeEdgeParam = (edgeParamId, field, value) => {
        setEdgeParamData((nds) =>
            nds.map((n) => {
                if (field === 'edgeParam') {
                    if (n.edgeParamId === edgeParamId) {
                        if (!isNullOrUndefined(value)) {
                            n[field] = value['value']
                            n['edgeType'] = value['data']['universalFieldType']
                        } else {
                            n[field] = value
                            n['edgeType'] = value
                        }
                        n['edgeParamCondition'] = []
                        n['edgeParamCompare'] = []
                        n['edgeValueCompare'] = []
                    }
                } else {
                    if (n.edgeParamId === edgeParamId) {
                        n[field] = value
                    }
                }
                return n;
            })
        );
    }

    const onAddCondition = () => {
        var edgeParam = {
            edgeId: idEdge,
            edgeParamId: generateEdgeParam(),
            edgeCondition: [],
            edgeType: [],
            edgeParam: [],
            edgeParamCondition: [],
            edgeParamCompare: [],
            edgeValueCompare: []
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


