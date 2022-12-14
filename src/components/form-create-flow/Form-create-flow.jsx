import "./form-create-flow.scss";
import React, { useEffect } from 'react';

import { useState } from "react";

import { Button, Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { getResultParamList } from "../../services/decision-service";
import * as AiIcons from 'react-icons/ai'

const FormCreateFlow = (props) => {
    const navigate = useNavigate()
    const [resultParamOption, setResultParamOption] = useState([])
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState([])
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        getResultParamList()
            .then(resultParam => {
                setFlowId('')
                setFlowName('')
                setResultParamOption(resultParam);
            });

    }, [])

    const handleButtonSaveFlow = () => {
        let flow = {
            flowId: `${flowId}`,
            flowName: `${flowName}`,
            resultParam: `${resultParam.value}`,
            isActive: `${(isActive === true) ? 'Y' : 'N '}`
        }
        console.log('Flow : ', flow)
    }

    const handleButtonClearFormCreateFlow = () => {
        setFlowId('')
        setFlowName('')
        setResultParam([])
    }

    const navigateToFlowManagement = () => {
        navigate('/flow-management');
    };

    return (
        <>
            <div className="sub-title-content">Flow</div>
            <Form >
                <Form.Group as={Row} className="mb-12">
                    <Col md={12}>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Active"
                            defaultChecked={isActive}
                            onChange={e => setIsActive(e.target.checked)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Flow ID :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="flowId"
                            placeholder="Flow ID"
                            value={flowId}
                            onChange={e => setFlowId(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Flow Name :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="flowName"
                            placeholder="Flow Name"
                            value={flowName}
                            onChange={e => setFlowName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Result Param :
                    </Form.Label>
                    <Col md={4}>
                        <Select
                            options={resultParamOption}
                            placeholder="Select Result Param"
                            isSearchable={true}
                            value={resultParam || {}}
                            onChange={e => setResultParam(e)} />
                    </Col>
                </Form.Group>
                <div className="text-center">
                    <Button
                        className="btn-search"
                        variant="outline-primary"
                        onClick={handleButtonSaveFlow}
                    >
                        <AiIcons.AiOutlineCheck /> Save
                    </Button>
                    <Button
                        className="btn-clear"
                        variant="outline-secondary"
                        onClick={handleButtonClearFormCreateFlow}
                    >
                        <AiIcons.AiOutlineClear /> Clear
                    </Button>
                    <Button
                        className="btn-clear"
                        variant="outline-danger"
                        onClick={navigateToFlowManagement}
                    >
                        <AiIcons.AiOutlineClose /> Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default FormCreateFlow;
