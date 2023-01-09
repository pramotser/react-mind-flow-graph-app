import './node-modal.scss'
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Form,
    Collapse,
    Card,
    Row,
    Col,
} from 'react-bootstrap'
// import Select from 'react-select'
import Swal from 'sweetalert2';

import { functionRefOption, NodeType, nodeTypeOption } from '../../../config/config';
import { getNodeTypeObject, getColorNodeType, isNullOrUndefined } from '../../../util/Util';
import SelectSingle from '../../tools/select-options/single/Single';
// import { getDropdownByType } from '../../../services/util-service';

function NodeModal(props) {
    const { subFlowOptions } = props.data;
    const [nodeData, setNodeData] = useState({})

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState([])
    const [subFlowId, setSubFlow] = useState([])
    const [functionRef, setFunctionRef] = useState([])
    const [functionRefParam, setFunctionRefParam] = useState("")
    const [defaultParam, setDefaultParam] = useState("")

    const [openCollapseFunction, setOpenCollapseFunction] = useState(false);
    const [openCollapseSubFlow, setOpenCollapseSubFlow] = useState(false);
    const [openCollapseDecision, setOpenCollapseDecision] = useState(false);

    const [modalNodeTypeEnd, setModalNodeTypeEnd] = useState(false)
    const [resultParam, setResultParam] = useState("")
    const [remark, setRemark] = useState("")

    const [backgroundColor, setBackGroundColor] = useState("")
    const [textColor, setTextColor] = useState("")

    const [validatedNodeAB, setValidatedNodeAB] = useState(false)
    const [validatedNodeEnd, setValidatedNodeEnd] = useState(false)

    // const [subFlowOption, setSubFlowOption] = useState([])

    useEffect(() => {
        // getDropdownByType(DropdownType.FLOW_LIST, ActiveFlag.Y).then(res => {
        // setSubFlowOption(res.responseObject)
        setNodeData(JSON.parse(JSON.stringify(props.nodeData || {})))
        setValidatedNodeAB(false)
        setValidatedNodeEnd(false)
        if (Object.keys(props.nodeData).length !== 0) {
            setModalNodeTypeEnd(props.nodeData["data"]["nodeType"] === NodeType.END)
            if (props.nodeData["data"]["nodeType"] !== NodeType.END) {
                setNodeType([])
                openCollapse([])
                if (props.nodeData["data"]["nodeType"] !== '') {
                    let nodeType = getNodeTypeObject(props.nodeData["data"]["nodeType"]);
                    setNodeType(nodeType[0])
                    openCollapse(nodeType[0])
                }
                setNodeName(props.nodeData["data"]["nodeName"])
                if (props.nodeData["data"]["subFlowId"] !== '') {
                    let subflow = subFlowOptions.filter((sub) => sub.value === props.nodeData["data"]["subFlowId"])
                    setSubFlow(subflow[0])
                }
                if (props.nodeData["data"]["functionRef"] !== '') {
                    let funcRef = functionRefOption.filter((func) => func.value === props.nodeData["data"]["functionRef"])
                    setFunctionRef(funcRef[0])
                }
                setFunctionRefParam(props.nodeData["data"]["functionRefParam"])
                setDefaultParam(props.nodeData["data"]["defaultParam"])
            } else {
                setResultParam(props.nodeData["data"]["result"])
                setRemark(props.nodeData["data"]["remark"])
            }
            changeColorModalByNodeType(props.nodeData["data"]["nodeType"])
        }
        // })
    }, [props])

    const openCollapse = (nodeType) => {
        setNodeType(nodeType)
        if (nodeType !== undefined) {
            setSubFlow([])
            setFunctionRef([])
            setFunctionRefParam("")
            setDefaultParam("")
            setOpenCollapseFunction((nodeType["value"] === NodeType.FUNCTION))
            setOpenCollapseSubFlow((nodeType["value"] === NodeType.SUBFLOW))
            setOpenCollapseDecision((nodeType["value"] === NodeType.DECISION))
            changeColorModalByNodeType(nodeType["value"])
        } else {
            setOpenCollapseFunction(false)
            setOpenCollapseSubFlow(false)
            setOpenCollapseDecision(false)
        }
    }

    const changeColorModalByNodeType = (nodeType) => {
        setTextColor(getColorNodeType(nodeType).color)
        setBackGroundColor(getColorNodeType(nodeType).backgroundColor)
    }

    const handleButtonSaveNode = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        let checkDeleteEdge = false;
        if (props.nodeData["data"]["nodeType"] !== NodeType.END) {
            if (!validatedField) {
                setValidatedNodeAB(true)
                return false;
            }
            if (nodeData["data"]["nodeType"] !== ((nodeType.value !== undefined) ? `${nodeType.value}` : '')) {
                checkDeleteEdge = true;
            } else {
                if (nodeType.value === NodeType.FUNCTION) {
                    if (nodeData["data"]["functionRef"] !== functionRef.value) {
                        checkDeleteEdge = true;
                    }
                }
                if (nodeType.value === NodeType.SUBFLOW) {
                    if (nodeData["data"]["subFlowId"] !== subFlowId) {
                        checkDeleteEdge = true;
                    }
                }
            }
            nodeData["data"]["label"] = `${nodeName}`;
            nodeData["data"]["nodeType"] = (nodeType.value !== undefined) ? `${nodeType.value}` : '';
            nodeData["data"]["nodeName"] = `${nodeName}`;
            nodeData["data"]["subFlowId"] = (subFlowId.value !== undefined) ? `${subFlowId.value}` : '';
            nodeData["data"]["functionRef"] = (functionRef.value !== undefined) ? `${functionRef.value}` : '';
            nodeData["data"]["functionRefParam"] = `${functionRefParam}`;
            nodeData["data"]["defaultParam"] = `${defaultParam}`;
        } else {
            if (!validatedField) {
                setValidatedNodeEnd(true)
                return false;
            }
            nodeData["data"]["result"] = (resultParam) ? `${resultParam}` : ''
            nodeData["data"]["remark"] = (remark) ? `${remark}` : ''
        }

        props.function.saveNode(nodeData, checkDeleteEdge)
    }

    const validatedField = () => {
        if (props.nodeData["data"]["nodeType"] !== NodeType.END) {
            if (nodeName === '') {
                return false
            }
            if ((nodeType.value === undefined)) {
                return false
            }
        } else {
            if (resultParam === '') {
                return false
            }
        }
        return true
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your node has been deleted.',
                    'success'
                )
                props.function.deleteNode(props.nodeData.id)
            }
        })
    }

    const onCloseModal = () => {
        if (props.nodeData["data"]["nodeType"] !== NodeType.END) {
            if (isNullOrUndefined(nodeData["data"]["nodeType"]) || isNullOrUndefined(nodeData["data"]["nodeName"])) {
                props.function.deleteNode(props.nodeData.id)
            } else {
                props.function.onCloseModalNode()
            }
        } else {
            props.function.onCloseModalNode()
        }

    }

    return (
        <>
            <Modal
                size="lg"
                show={props.showModalNode}
                // onHide={props.function.onCloseModalNode}
                onHide={onCloseModal}
                backdrop="static"
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: backgroundColor }} closeButton>
                    <Modal.Title style={{ color: textColor }}>{(modalNodeTypeEnd) ? 'Set Result' : 'Edit Node'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validatedNodeAB} hidden={(modalNodeTypeEnd)}>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label className="text-right" column md={3} >
                                Node Name :
                            </Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Node Name"
                                    value={nodeName || ''}
                                    onChange={e => setNodeName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Node Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label className="text-right" column md={3} >
                                Node Type :
                            </Form.Label>
                            <Col md={6}>
                                <SelectSingle
                                    options={nodeTypeOption}
                                    placeholder="Select Node type"
                                    isSearchable={false}
                                    value={nodeType || {}}
                                    onChange={openCollapse}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Collapse in={openCollapseDecision} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label className="text-right" column md={3} >
                                                Default Param :
                                            </Form.Label>
                                            <Col md={6}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Default Param"
                                                    value={defaultParam || ''}
                                                    onChange={e => setDefaultParam(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                            <Collapse in={openCollapseFunction} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label className="text-right" column md={3} >
                                                Function Ref :
                                            </Form.Label>
                                            <Col md={6}>
                                                <SelectSingle
                                                    options={functionRefOption}
                                                    placeholder="Select Function Ref"
                                                    isSearchable={true}
                                                    value={functionRef || {}}
                                                    onChange={e => setFunctionRef(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label className="text-right" column md={3} >
                                                Function Ref Param :
                                            </Form.Label>
                                            <Col md={6}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Function Ref Param"
                                                    value={functionRefParam || ''}
                                                    onChange={e => setFunctionRefParam(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                            <Collapse in={openCollapseSubFlow} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label className="text-right" column md={3} >
                                                Subflow :
                                            </Form.Label>
                                            <Col md={6}>
                                                <SelectSingle
                                                    options={subFlowOptions}
                                                    placeholder="Select Subflow"
                                                    isSearchable={false}
                                                    value={subFlowId || {}}
                                                    onChange={e => setSubFlow(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label className="text-right" column md={3} >
                                                Default Param :
                                            </Form.Label>
                                            <Col md={6}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Default Param"
                                                    value={defaultParam || ''}
                                                    onChange={e => setDefaultParam(e.target.value)}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                        </Form.Group>
                    </Form>
                    <Form noValidate validated={validatedNodeEnd} hidden={(!modalNodeTypeEnd)}>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label className="text-right" column md={3} >
                                Result :
                            </Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Result"
                                    value={resultParam || ''}
                                    onChange={e => setResultParam(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Result.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label className="text-right" column md={3} >
                                Remark :
                            </Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Remark"
                                    value={remark || ''}
                                    onChange={e => setRemark(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleButtonSaveNode}>
                        Save
                    </Button>
                    <Button variant="outline-secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                    <Button variant="outline-danger" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NodeModal;


