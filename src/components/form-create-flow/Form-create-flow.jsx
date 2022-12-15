import "./form-create-flow.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import Swal from "sweetalert2";

import { getResultParamList } from "../../services/decision-service";
import { isEmpty } from "../../util/Util";

const FormCreateFlow = (props) => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [resultParamOption, setResultParamOption] = useState([])
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState([])
    const [isActive, setIsActive] = useState(null)
    const [validateOptionResult, setValidateOptionResult] = useState(false)

    useEffect(() => {
        getResultParamList()
            .then(resultParamList => {
                initialFormCreate(resultParamList)
            });

    }, [])

    const initialFormCreate = (resultParamList) => {
        setFlowId('')
        setFlowName('')
        setIsActive(true)
        setResultParamOption(resultParamList);
    }

    const handleButtonSaveFlow = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
        if (!isEmpty(flowId) && !isEmpty(flowName) && resultParam.value !== undefined) {
            setValidateOptionResult(false)
            let flow = {
                flowId: `${flowId}`,
                flowName: `${flowName}`,
                resultParam: `${resultParam.value}`,
                isActive: `${(isActive === true) ? 'Y' : 'N '}`
            }
            console.log('Flow : ', flow)
            Swal.fire(
                'coming soon..',
                '',
                'warning'
            )
        } else {
            
            console.log((resultParam.value === undefined))
            if (resultParam.value !== undefined) {
                setValidateOptionResult(true)
            } else {
                setValidateOptionResult(false)
            }
        }

    }

    const handleButtonClearFormCreateFlow = () => {
        setValidated(false)
        setFlowId('')
        setFlowName('')
        setResultParam([])
    }

    const navigateToFlowManagement = () => {
        navigate('/flow-management');
    };

    const navigateToDecision = () => {
        navigate('decision');
    };

    return (
        <>
            <div className="sub-title-content">Flow</div>
            <Form noValidate validated={validated}>
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
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid flow id.
                        </Form.Control.Feedback>
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
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid flow name.
                        </Form.Control.Feedback>
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
                            onChange={e => setResultParam(e)}
                        />
                        <div className="invalid-customer">
                            {validateOptionResult ? 'Please provide a valid result param.' : ""}
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Decision Flow:
                    </Form.Label>
                    <Col md={4}>
                        <Button
                            className="btn-search"
                            variant="outline-success"
                            onClick={navigateToDecision}
                        >
                            <AiIcons.AiOutlinePartition /> Deicison
                        </Button>
                    </Col>
                </Form.Group>
                <hr />
                <Form.Group as={Row}>
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
                </Form.Group>
            </Form>
        </>
    );
};

export default FormCreateFlow;
