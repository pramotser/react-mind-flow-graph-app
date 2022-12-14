import "./form-search-flow.scss";
import React from 'react';

import { useState } from "react";

import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import { getFlowByCondition, getFlowList } from "../../services/decision-service";

import { tempDataFlow } from '../../assets/data/datasource'

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
    const navigate = useNavigate()
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')


    const [dataSearch, setDataSearch] = useState([])

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
