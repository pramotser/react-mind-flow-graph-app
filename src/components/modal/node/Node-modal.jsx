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
import Select from 'react-select'
import Swal from 'sweetalert2';

import { nodeTypeOption } from '../../../config/config';
import { getNodeTypeObject, getColorNodeType } from '../../../util/Util';

function NodeModal(props) {
    const [nodeData, setNodeData] = useState({})

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState([])
    const [subFlowId, setSubFlow] = useState("")
    const [functionRef, setFunctionRef] = useState("")
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

    useEffect(() => {
        setNodeData(JSON.parse(JSON.stringify(props.nodeData || {})))
        setValidatedNodeAB(false)
        setValidatedNodeEnd(false)
        if (Object.keys(props.nodeData).length !== 0) {
            setModalNodeTypeEnd(props.nodeData["data"]["nodeType"] === 'END')
            if (props.nodeData["data"]["nodeType"] !== 'END') {
                setNodeType([])
                openCollapse([])
                if (props.nodeData["data"]["nodeType"] !== '') {
                    console.log('Find')
                    let nodeType = getNodeTypeObject(props.nodeData["data"]["nodeType"]);
                    setNodeType(nodeType[0])
                    openCollapse(nodeType[0])
                }
                setNodeName(props.nodeData["data"]["nodeName"])
                setSubFlow(props.nodeData["data"]["subFlowId"])
                setFunctionRef(props.nodeData["data"]["functionRef"])
                setFunctionRefParam(props.nodeData["data"]["functionRefParam"])
                setDefaultParam(props.nodeData["data"]["defaultParam"])
            } else {
                setResultParam(props.nodeData["data"]["result"])
                setRemark(props.nodeData["data"]["remark"])
            }
            changeColorModalByNodeType(props.nodeData["data"]["nodeType"])
        }
    }, [props])

    const openCollapse = (nodeType) => {
        if (nodeType !== undefined) {
            setSubFlow("")
            setFunctionRef("")
            setFunctionRefParam("")
            setDefaultParam("")
            setOpenCollapseFunction((nodeType["value"] === 'FUNCTION'))
            setOpenCollapseSubFlow((nodeType["value"] === 'SUBFLOW'))
            setOpenCollapseDecision((nodeType["value"] === 'DECISION'))
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
        if (props.nodeData["data"]["nodeType"] !== 'END') {
            if (!validatedField) {
                setValidatedNodeAB(true)
                return false;
            }
            nodeData["data"]["label"] = `${nodeName}`;
            nodeData["data"]["nodeType"] = (nodeType.value !== undefined) ? `${nodeType.value}` : '';
            nodeData["data"]["nodeName"] = `${nodeName}`;
            nodeData["data"]["subFlowId"] = `${subFlowId}`;
            nodeData["data"]["functionRef"] = `${functionRef}`;
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
        props.function.saveNode(nodeData)
    }

    const validatedField = () => {
        if (props.nodeData["data"]["nodeType"] !== 'END') {
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



    return (
        <>
            <Modal
                size="lg"
                show={props.showModalNode}
                onHide={props.function.onCloseModalNode}
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
                                <Select
                                    options={nodeTypeOption}
                                    placeholder="Select Node type"
                                    isSearchable={false}
                                    value={nodeType || {}}
                                    onChange={e => { setNodeType(e); openCollapse(e); }}
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
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Function Ref"
                                                    value={functionRef || ''}
                                                    onChange={e => setFunctionRef(e.target.value)}
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
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Subflow"
                                                    value={subFlowId || ''}
                                                    onChange={e => setSubFlow(e.target.value)}
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
                    <Button variant="outline-secondary" onClick={props.function.onCloseModalNode}>
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


