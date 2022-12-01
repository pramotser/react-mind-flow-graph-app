import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Collapse, Card } from 'react-bootstrap'
import Select from 'react-select'
import { nodeTypeOption } from '../../../config/DataConfig'
import { getNodeTypeObject } from '../../../util/Util'
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

    useEffect(() => {
        setNodeData(JSON.parse(JSON.stringify(props.nodeData || {})))
        if (Object.keys(props.nodeData).length !== 0) {
            let nodeType = getNodeTypeObject(props.nodeData["nodeType"])
            setModalNodeTypeEnd(props.nodeData["nodeType"] === 'END')
            setNodeName(props.nodeData["nodeName"])
            setNodeType(nodeType)
            openCollapse(nodeType[0])
            setSubFlow(props.nodeData["subFlowId"])
            setFunctionRef(props.nodeData["functionRef"])
            setFunctionRefParam(props.nodeData["functionRefParam"])
            setDefaultParam(props.nodeData["defaultParam"])
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
        }
    }

    const onSubmit = () => {
        if (props.nodeData["nodeType"] !== 'END') {
            nodeData["data"]["label"] = `${nodeName}`;
            nodeData["nodeType"] = (nodeType) ? `${nodeType.value}` : null;
            nodeData["nodeName"] = `${nodeName}`;
            nodeData["subFlowId"] = `${subFlowId}`;
            nodeData["functionRef"] = `${functionRef}`;
            nodeData["functionRefParam"] = `${functionRefParam}`;
            nodeData["defaultParam"] = `${defaultParam}`;
        } else {
            nodeData["result"] = `${resultParam}`
            nodeData["remark"] = `${remark}`
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
                <Modal.Header closeButton>
                    <Modal.Title>{(modalNodeTypeEnd) ? 'Set Result' : 'Edit Node'}</Modal.Title>
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
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={props.onCloseModalNode}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNode;


