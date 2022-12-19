import "./form-search-flow.scss";
import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import Select from 'react-select'

import { getFlowByCondition } from "../../services/decision-service";
import { getDropdownFlowName } from "../../services/util-service";

const FormSearchFlow = (props) => {
    const navigate = useNavigate()
    const [optionFlowName, setOptionFlowName] = useState([])
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState([])

    useEffect(() => {
        props.setLoadingPages(true)
        getDropdownFlowName().then(response => {
            setOptionFlowName(response)
        })
        getFlowByCondition("").then(response => {
            if (response.responseObject.length > 0) {
                props.search(response.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }, [])

    const handleOnChangeSelectFlowName = (object) => {
        setFlowId(object.data.flowId)
    }

    const handleButtonSearchFlow = () => {
        props.setLoadingPages(true)
        getFlowByCondition((flowName.value !== undefined) ? flowName.value : '').then(response => {
            if (response.responseObject.length > 0) {
                props.search(response.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }

    const handleButtonClearFormSearchFlow = () => {
        props.setLoadingPages(true)
        setFlowId('')
        setFlowName([])
        getFlowByCondition("").then(response => {
            if (response.responseObject.length > 0) {
                props.search(response.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }

    const navigateToFlowCreate = () => {
        props.setLoadingPages(true)
        navigate('create', { state: { mode: 'add' } });
    };

    return (
        <>
            <div className="sub-title-content">Search Flow</div>
            <div className="text-right" >
                <Button variant="outline-info" onClick={navigateToFlowCreate}><AiIcons.AiOutlinePlusCircle /> Add</Button>
            </div>
            <Form >
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
                            disabled
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Flow Name :
                    </Form.Label>
                    <Col md={4}>
                        <Select
                            options={optionFlowName}
                            placeholder="Select Flow Name"
                            isSearchable={true}
                            value={flowName || {}}
                            onChange={e => { setFlowName(e); handleOnChangeSelectFlowName(e); }}
                        />
                    </Col>
                </Form.Group>
                <div className="text-center">
                    <Button
                        className="btn-search"
                        variant="outline-warning"
                        onClick={handleButtonSearchFlow}
                    >
                        <AiIcons.AiOutlineSearch /> Search
                    </Button>
                    <Button
                        className="btn-clear"
                        variant="outline-secondary"
                        onClick={handleButtonClearFormSearchFlow}
                    >
                        <AiIcons.AiOutlineClear /> Clear
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default FormSearchFlow;
