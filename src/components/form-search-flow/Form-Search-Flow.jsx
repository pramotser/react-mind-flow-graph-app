import "./form-search-flow.scss";
import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'

import { getFlowByCondition, getFlowList } from "../../services/decision-service";


const FormSearchFlow = (props) => {
    const navigate = useNavigate()
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')

    const handleButtonSearchFlow = () => {
        getFlowByCondition(flowName).then(flowList => {
            if (flowList.length > 0) {
                props.search(flowList);
            } else {
                props.search([])
            }

        })
    }

    const handleButtonClearFormSearchFlow = () => {
        getFlowList()
            .then(flowList => {
                setFlowId('')
                setFlowName('')
                props.search(flowList);
            });


    }
    const navigateToFlowCreate = () => {
        navigate('create');
    };

    
    return (
        <>
            <div className="sub-title-content">Search Flow</div>
            <div className="text-right">
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
