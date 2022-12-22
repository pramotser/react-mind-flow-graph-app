import "./form-decision-control.scss";
import React, { useState, useEffect } from 'react';
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import { Form, Accordion, Button } from 'react-bootstrap'

const FormDecisionControl = (props) => {
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState('')

    useEffect(() => {
        initialFormInfoFlow()
    }, [])

    const initialFormInfoFlow = () => {
        setFlowId(props.flow.flowId)
        setFlowName(props.flow.flowName)
        setResultParam(props.flow.resultParam)
    }

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/nodeId', props.function.generateFloeNodeID())
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <>
            <div className="content-in-flow">
                <div className="content-wrapper">
                    <div className="content">
                        <div className="title-content" >
                            <h1>Decision Flow</h1>
                        </div>
                        <br />
                        <Accordion defaultActiveKey={['0']} >
                            <Accordion.Item eventKey="0" >
                                <Accordion.Header >
                                    <div className="title-content">
                                        Flow Description
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form >
                                        <Form.Group controlId="validationCustom01">
                                            <Form.Label>Flow ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="flowId"
                                                placeholder="Flow ID"
                                                value={flowId}
                                                disabled={true}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom01">
                                            <Form.Label>Flow Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="flowName"
                                                placeholder="Flow Name"
                                                value={flowName}
                                                disabled={true}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="validationCustomUsername">
                                            <Form.Label>Result Param</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="resultParam"
                                                placeholder="Result Param"
                                                value={resultParam}
                                                disabled={true}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1' >
                                <Accordion.Header >
                                    <div className="title-content">
                                        Decision Type
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="dndnode input node-start" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                                        <strong>Start</strong>
                                    </div>
                                    <div className="dndnode node-new" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                                        <strong>Node</strong>
                                    </div>
                                    <div className="dndnode output node-end" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                                        <strong>Result Node</strong>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <br />
                        <Form.Group controlId="validationCustom01">
                            <Button variant="outline-success" onClick={props.function.onExportModal}>
                                <BiIcons.BiExport /> Export JSON
                            </Button>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="validationCustom01">
                            <Button
                                // className="btn-search"
                                variant="outline-primary"
                                onClick={props.function.onSaveSession}>
                                <AiIcons.AiOutlineCheck /> Save Draft
                            </Button>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="validationCustom01">
                            <Button
                                // className="btn-search"
                                variant="outline-warning"
                                onClick={props.function.onRestoreSession}>
                                <BiIcons.BiHistory /> Restore
                            </Button>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="validationCustom01">
                            <Button
                                variant="outline-danger"
                                onClick={props.function.navigateToCreateFlow}>
                                <AiIcons.AiOutlineClose /> Cancel
                            </Button>
                        </Form.Group>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormDecisionControl;
