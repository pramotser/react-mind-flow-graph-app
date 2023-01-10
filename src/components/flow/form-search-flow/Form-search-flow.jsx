import "./form-search-flow.scss";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap'
import * as AiIcons from 'react-icons/ai'
// import Select from 'react-select'

import { getFlowByCondition } from "../../../services/decision-service";
import { getDropdownByType } from "../../../services/util-service";
import { Config } from "../../../config/config";
import Swal from "sweetalert2";
import SelectSingle from "../../tools/select-options/single/Single";
// import SelectCreatable from "../../tools/select-options/creatable/Creatable";

const FormSearchFlow = (props) => {
    const navigate = useNavigate()
    const [optionFlowName, setOptionFlowName] = useState([])
    const [flowName, setFlowName] = useState([])

    useEffect(() => {
        props.setLoadingPages(true)
        getDropdownByType(Config.DropdownType.FLOW_LIST, Config.ActiveFlag.Y).then(res => {
            if (res.responseCode === 200) {
                setOptionFlowName(res.responseObject)
                getFlowByCondition(null).then(res => {
                    if (res.responseObject.length > 0) {
                        props.search(res.responseObject);
                    } else {
                        props.search([])
                    }
                    props.setLoadingPages(false)
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: `Error!`,
                    text: `${res.responseDecription}!`,
                    showCancelButton: false,
                })
                props.setLoadingPages(false)
            }
        })
    }, [])

    const handleOnChangeSelectFlowName = (object) => {
        setFlowName(object);
        // setFlowId(object.data.flowId)
    }

    const handleButtonSearchFlow = () => {
        props.setLoadingPages(true)
        getFlowByCondition((flowName.value !== undefined) ? flowName.value : null).then(response => {
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
        // setFlowId('')
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
        navigate('create', { state: { mode: Config.Mode.ADD.value } });
    };

    return (
        <>
            <div className="sub-title-content">Search Flow</div>
            <div className="text-right" >
                <Button variant="outline-info" onClick={navigateToFlowCreate}><AiIcons.AiOutlinePlusCircle /> Add</Button>
            </div>
            <Form >

                {/* <Form.Group as={Row} className="mb-4">
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
                </Form.Group> */}
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Flow Name :
                    </Form.Label>
                    <Col md={4}>
                        {/* < SelectCreatable
                            options={optionFlowName}
                            placeholder="Select Flow Name"
                            isSearchable={true}
                            isClearable={false}
                            value={flowName || {}}
                            onChange={handleOnChangeSelectFlowName}
                        /> */}
                        <SelectSingle
                            options={optionFlowName}
                            placeholder="Select Flow Name"
                            isSearchable={true}
                            value={flowName || {}}
                            onChange={handleOnChangeSelectFlowName}
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
