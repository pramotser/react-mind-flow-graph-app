import "./form-search-result-param.scss";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap'
import * as AiIcons from 'react-icons/ai'
// import Select from 'react-select'

import { getResultParamListByCondition } from "../../../services/result-param-service";
import { getDropdownByType } from "../../../services/util-service";
import { Config } from "../../../config/config";
import Swal from "sweetalert2";
import SelectSingle from "../../tools/select-options/single/Single";

const FormSearchResultParam = (props) => {
    const navigate = useNavigate()
    const [optionResultParam, setOptionResultParam] = useState([])
    const [resultParamCode, setResultParamCode] = useState('')
    const [resultParamName, setResultParamName] = useState([])

    useEffect(() => {
        props.setLoadingPages(true)
        getDropdownByType(Config.DropdownType.RESULT_PARAM_LIST, Config.ActiveFlag.N).then(res => {
            if (res.responseCode === 200) {
                setOptionResultParam(res.responseObject)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: `Error!`,
                    text: `${res.responseDecription}`,
                    showCancelButton: false,
                })
            }
        })
        getResultParamListByCondition(null).then(res => {
            if (res.responseObject.length > 0) {
                props.search(res.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }, [])

    const handleOnChangeSelectResultParamName = (object) => {
        setResultParamName(object)
        setResultParamCode(object.data.resultParamCode)
    }

    const handleButtonSearch = () => {
        props.setLoadingPages(true)
        getResultParamListByCondition((resultParamName.value !== undefined) ? resultParamName.data.resultParamName : '').then(response => {
            if (response.responseObject.length > 0) {
                props.search(response.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }

    const handleButtonClearFormSearch = () => {
        props.setLoadingPages(true)
        setResultParamCode('')
        setResultParamName([])
        getResultParamListByCondition(null).then(response => {
            if (response.responseObject.length > 0) {
                props.search(response.responseObject);
            } else {
                props.search([])
            }
            props.setLoadingPages(false)
        })
    }

    const navigateToResultParamCreate = () => {
        props.setLoadingPages(true)
        navigate('create', { state: { mode: Config.Mode.ADD.value } });
    };

    return (
        <>
            <div className="sub-title-content">Search Result Param</div>
            <div className="text-right" >
                <Button variant="outline-info" onClick={navigateToResultParamCreate}><AiIcons.AiOutlinePlusCircle /> Add</Button>
            </div>
            <Form >
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Result Code :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="resultParamCode"
                            placeholder="Result Param Code"
                            value={resultParamCode}
                            onChange={e => setResultParamCode(e.target.value)}
                            disabled
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Result Param Name :
                    </Form.Label>
                    <Col md={4}>
                        {/* <Select
                            options={optionResultParam}
                            placeholder="Select Result Param Name"
                            isSearchable={true}
                            value={resultParamName || {}}
                            onChange={e => { setResultParamName(e); handleOnChangeSelectResultParamName(e); }}
                        /> */}
                        <SelectSingle
                            options={optionResultParam}
                            placeholder="Select Result Param Name"
                            isSearchable={true}
                            value={resultParamName || {}}
                            onChange={handleOnChangeSelectResultParamName}
                        />
                    </Col>
                </Form.Group>
                <div className="text-center">
                    <Button
                        className="btn-search"
                        variant="outline-warning"
                        onClick={handleButtonSearch}
                    >
                        <AiIcons.AiOutlineSearch /> Search
                    </Button>
                    <Button
                        className="btn-clear"
                        variant="outline-secondary"
                        onClick={handleButtonClearFormSearch}
                    >
                        <AiIcons.AiOutlineClear /> Clear
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default FormSearchResultParam;
