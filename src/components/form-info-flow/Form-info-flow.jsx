import "./form-info-flow.scss";
import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import Select from 'react-select'

import { getFlowByCondition } from "../../services/decision-service";
import { getDropdownFlowName } from "../../services/util-service";

const FormInfoFlow = (props) => {
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState('')

    useEffect(() => {
        props.setLoadingPages(true)
        console.log(props)
        setFlowId(props.location.state.flowId)
        setFlowName(props.location.state.flowName)
        setResultParam(props.location.state.resultParam)
        props.setLoadingPages(false)
    }, [])

    return (
        <>
            <div className="sub-title-content">Flow Decription</div>
            <Form >
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Flow ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="flowId"
                            placeholder="Flow ID"
                            value={flowId}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Flow Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="flowName"
                            placeholder="Flow Name"
                            value={flowName}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Result Param</Form.Label>
                        <Form.Control
                            type="text"
                            name="resultParam"
                            placeholder="Result Param"
                            value={resultParam}
                            disabled={true}
                        />
                    </Form.Group>
                </Row>
            </Form>
        </>
    );
};

export default FormInfoFlow;
