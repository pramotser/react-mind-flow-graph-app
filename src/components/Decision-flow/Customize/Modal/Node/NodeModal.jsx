import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Collapse, Card } from 'react-bootstrap'
import Select from 'react-select'
import { nodeTypeOption } from '../../../../Config/DataConfig'
import { getNodeTypeObject } from '../../../../Util/Util'
import './NodeModal.css'

function ModalNode(props) {
    const [modeNodeModal, setNodeModel] = useState("")

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState("")
    const [subFlowId, setSubFlow] = useState("")
    const [functionRef, setFunctionRef] = useState("")
    const [functionRefParam, setFunctionRefParam] = useState("")
    const [defaultParam, setDefaultParam] = useState("")
    // const [step, setStep] = useState("")

    const [openCollapseFunction, setOpenCollapseFunction] = useState(false);
    const [openCollapseSubFlow, setOpenCollapseSubFlow] = useState(false);
    const [openCollapseDecision, setOpenCollapseDecision] = useState(false);

    useEffect(() => {
        setNodeModel(props.modeNodeModal)
        initialForm()
        if (props.modeNodeModal === 'Edit') {
            if (props.nodeModel !== undefined) {
                setNodeName(props.nodeModel["nodeName"])
                setNodeType(getNodeTypeObject(props.nodeModel["nodeType"]))
                openCollapse(props.nodeModel["nodeType"])
                setSubFlow(props.nodeModel["subFlowId"])
                setFunctionRef(props.nodeModel["functionRef"])
                setFunctionRefParam(props.nodeModel["functionRefParam"])
                setDefaultParam(props.nodeModel["defaultParam"])
                // setStep(getStepObject(props.nodeModel["step"]))
            }
        }
    }, [props])

    const initialForm = () => {
        setNodeName("")
        setNodeType("")
        setSubFlow("")
        setFunctionRef("")
        setFunctionRefParam("")
        setDefaultParam("")
        // setStep("")
        openCollapse("")
    }



    const openCollapse = (nodeType) => {
        setSubFlow("")
        setFunctionRef("")
        setFunctionRefParam("")
        setDefaultParam("")
        setOpenCollapseFunction((nodeType === 'FUNCTION'))
        setOpenCollapseSubFlow((nodeType === 'SUBFLOW'))
        setOpenCollapseDecision((nodeType === 'DECISION'))
    }

    const onSubmit = () => {
        var nodeId = (modeNodeModal === 'Add') ? props.generateFloeNodeID() : props.nodeModel.id
        props.saveNode(modeNodeModal, {
            id: nodeId,
            data: {
                label: `${nodeName}`,
            },
            position: { x: 0, y: 0 },
            flowNodeId: Number.parseInt(nodeId),
            flowId: props.flowId,
            nodeType: `${nodeType.value}`,
            nodeName: `${nodeName}`,
            subFlowId: `${subFlowId}`,
            functionRef: `${functionRef}`,
            functionRefParam: `${functionRefParam}`,
            defaultParam: `${defaultParam}`,
            // step: `${step.value}`,
        })
    }

    const onDelete = () => {
        props.deleteNode(props.nodeModel.id)
    }

    return (
        <>
            <Modal
                size="lg"
                show={props.showModalNode}
                onHide={props.onCloseModalNode}
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{(props.modeNodeModal === 'Add') ? 'New' : 'Edit'} Node</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Node Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Node Name"
                                value={nodeName}
                                onChange={e => setNodeName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Node Type</Form.Label>
                            <Select
                                options={nodeTypeOption}
                                placeholder="Select Node type"
                                isSearchable={false}
                                value={nodeType}
                                onChange={e => { setNodeType(e); openCollapse(e.value); }} />
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
                                                value={defaultParam}
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
                                                value={functionRef}
                                                onChange={e => setFunctionRef(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Function Ref Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Function Ref Param"
                                                value={functionRefParam}
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
                                                value={subFlowId}
                                                onChange={e => setSubFlow(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Default Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Default Param"
                                                value={defaultParam}
                                                onChange={e => setDefaultParam(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Card>
                                </div>
                            </Collapse>
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Step Node</Form.Label>
                            <Select
                                options={stepOption}
                                placeholder="Step Node"
                                isSearchable={false}
                                value={step}
                                onChange={e => setStep(e)}
                            />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onCloseModalNode}>
                        Close
                    </Button>
                    <Button variant="primary" hidden={(props.modeNodeModal === 'Edit')} onClick={onSubmit}>
                        Save
                    </Button>
                    <Button variant="success" hidden={(props.modeNodeModal === 'Add')} onClick={onSubmit}>
                        Edit
                    </Button>
                    <Button variant="danger" hidden={(props.modeNodeModal === 'Add')} onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNode;


