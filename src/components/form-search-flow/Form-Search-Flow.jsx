import "./form-search-flow.scss";
import React from 'react';

import { useState } from "react";

import { Button, Form, Row, Col } from 'react-bootstrap'


const testSearch = [
    {
        flowId: 2,
        flowName: "Product Program",
        resultParam: "productProgram",
        startFlowId: 200,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
    {
        flowId: 3,
        flowName: "Line Assignment New Customer",
        resultParam: "lineAssignment",
        startFlowId: 300,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
    {
        flowId: 4,
        flowName: "Contract Staff Checking",
        resultParam: "contractStaff",
        startFlowId: 400,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
    {
        flowId: 5,
        flowName: "Max Tenor From RecommendLimit",
        resultParam: "maxTenor",
        startFlowId: 500,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
    {
        flowId: 6,
        flowName: "Payment History Checking",
        resultParam: "paymentHistoryChecking",
        startFlowId: 600,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
    {
        flowId: 7,
        flowName: "NCB Aging Result",
        resultParam: "ncbAging",
        startFlowId: 700,
        isActive: "Y",
        createDate: "2020-08-17 15:44:55.000000",
        createUser: "SYSTEM",
        updateDate: "2020-08-17 15:44:55.000000",
        updateUser: "SYSTEM"
    },
]

const FormSearchFlow = (props) => {
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')

    const handleButtonSearchFlow = () => {
        props.search(testSearch)
    }

    const handleButtonClearFormSearchFlow = () => {
        setFlowId('')
        setFlowName('')
    }

    return (
        <>
            <div className="listTitle">Search Flow</div>
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
                        Search
                    </Button>
                    <Button
                        className="btn-clear"
                        variant="outline-secondary"
                        onClick={handleButtonClearFormSearchFlow}
                    >
                        Clear
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default FormSearchFlow;
