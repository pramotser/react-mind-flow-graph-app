import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Collapse, Card } from 'react-bootstrap'
import Select from 'react-select'
import { nodeTypeOption } from '../../config/DataConfig'
import { getNodeTypeObject, getColorNodeType } from '../../util/Util'
import './NodeModal.css'

function ModalNode(props) {

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState({})
    const [subFlowId, setSubFlow] = useState("")
    const [functionRef, setFunctionRef] = useState("")
    const [functionRefParam, setFunctionRefParam] = useState("")
    const [defaultParam, setDefaultParam] = useState("")


    const [openCollapseFunction, setOpenCollapseFunction] = useState(false);
    const [openCollapseSubFlow, setOpenCollapseSubFlow] = useState(false);
    const [openCollapseDecision, setOpenCollapseDecision] = useState(false);
    const [nodeData, setNodeData] = useState({})

    const [modalNodeTypeEnd, setModalNodeTypeEnd] = useState(false)
    const [resultParam, setResultParam] = useState("")
    const [remark, setRemark] = useState("")

    const [backgroundColor, setBackGroundColor] = useState("")
    const [textColor, setTextColor] = useState("")

    useEffect(() => {
        setNodeData(JSON.parse(JSON.stringify(props.nodeData || {})))
        if (Object.keys(props.nodeData).length !== 0) {
            setModalNodeTypeEnd(props.nodeData["data"]["nodeType"] === 'END')
            if (props.nodeData["data"]["nodeType"] !== 'END') {
                let nodeType = getNodeTypeObject(props.nodeData["data"]["nodeType"])
                setNodeName(props.nodeData["data"]["nodeName"])
                setNodeType(nodeType)
                openCollapse(nodeType[0])
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

    const onSubmit = () => {
        if (props.nodeData["data"]["nodeType"] !== 'END') {
            nodeData["data"]["label"] = `${nodeName}`;
            nodeData["data"]["nodeType"] = (nodeType.value !== undefined) ? `${nodeType.value}` : '';
            nodeData["data"]["nodeName"] = `${nodeName}`;
            nodeData["data"]["subFlowId"] = `${subFlowId}`;
            nodeData["data"]["functionRef"] = `${functionRef}`;
            nodeData["data"]["functionRefParam"] = `${functionRefParam}`;
            nodeData["data"]["defaultParam"] = `${defaultParam}`;
        } else {
            nodeData["data"]["result"] = (resultParam) ? `${resultParam}` : ''
            nodeData["data"]["remark"] = (remark) ? `${remark}` : ''
        }
        props.saveNode(nodeData)
    }

    const onDelete = () => {
        props.deleteNode(props.nodeData.id)
    }

    return (
        <>
            <Modal
                size="lg"
                show={props.showModalNode}
                onHide={props.onCloseModalNode}
                backdrop="static"
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: backgroundColor }} closeButton>
                    <Modal.Title style={{ color: textColor }}>{(modalNodeTypeEnd) ? 'Set Result' : 'Edit Node'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form hidden={(modalNodeTypeEnd)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Node Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Node Name"
                                value={nodeName || ''}
                                onChange={e => setNodeName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Node Type</Form.Label>
                            <Select
                                options={nodeTypeOption}
                                placeholder="Select Node type"
                                isSearchable={false}
                                value={nodeType || {}}
                                onChange={e => { setNodeType(e); openCollapse(e); }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Collapse in={openCollapseDecision} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Default Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Default Param"
                                                value={defaultParam || ''}
                                                onChange={e => setDefaultParam(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                            <Collapse in={openCollapseFunction} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Function Ref</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Function Ref"
                                                value={functionRef || ''}
                                                onChange={e => setFunctionRef(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Function Ref Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Function Ref Param"
                                                value={functionRefParam || ''}
                                                onChange={e => setFunctionRefParam(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                            <Collapse in={openCollapseSubFlow} dimension="height">
                                <div id="example-collapse-text">
                                    <Card body >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Subflow</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Subflow"
                                                value={subFlowId || ''}
                                                onChange={e => setSubFlow(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Default Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Default Param"
                                                value={defaultParam || ''}
                                                onChange={e => setDefaultParam(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                        </Form.Group>
                    </Form>
                    <Form hidden={(!modalNodeTypeEnd)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Result</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Result"
                                value={resultParam || ''}
                                onChange={e => setResultParam(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Remark</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Remark"
                                value={remark || ''}
                                onChange={e => setRemark(e.target.value)}
                            />
                        </Form.Group>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button variant="outline-secondary" onClick={props.onCloseModalNode}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNode;


