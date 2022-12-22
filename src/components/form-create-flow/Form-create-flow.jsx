import "./form-create-flow.scss";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import * as AiIcons from 'react-icons/ai'
import Swal from "sweetalert2";

import DatepickerCustom from "../datepicker/Datepicker";

import { isEmpty } from "../../util/Util";
import { formatDatetime, mode } from '../../config/config'
import { getDropdownResultParam } from "../../services/util-service";
import { createFlow, updateFlow } from "../../services/decision-service";


const FormCreateFlow = (props) => {
    const navigate = useNavigate()
    const [modePage] = useState(props.location.state.mode)

    const [validated, setValidated] = useState(false)
    const [validateOptionResult, setValidateOptionResult] = useState(false)
    const [resultParamOption, setResultParamOption] = useState([])
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState([])
    const [isActive, setIsActive] = useState(true)

    const [effectiveDate, setEffectiveDate] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        props.setLoadingPages(true)
        getDropdownResultParam()
            .then(responseObject => {
                setResultParamOption(responseObject);
                initialForm()
                if (modePage !== mode.add.value) {
                    setDataToForm(props.location.state.data, responseObject)
                }
                props.setLoadingPages(false)
            });
    }, [])

    const initialForm = () => {
        setFlowId('')
        setFlowName('')
        setResultParam([])
        setIsActive(true)
        setEffectiveDate(false)
        setStartDate('')
        setEndDate('')
    }

    const setDataToForm = (flow, rpOption) => {
        const filteredResultParamList = rpOption.filter(
            (resultParam) => resultParam.value.indexOf(flow.resultParam) !== -1
        );
        setFlowId(flow.flowId)
        setFlowName(flow.flowName)
        setResultParam(filteredResultParamList[0])
        setIsActive((flow.isActive === 'Y'))
    }

    const onBtnClearForm = () => {
        props.setLoadingPages(true)
        initialForm();
        setValidated(false)
        setValidateOptionResult(false)
        if (modePage !== mode.add.value) {
            setDataToForm(props.location.state.data, resultParamOption)
        }
        props.setLoadingPages(false)
    }

    const onBtnCancel = () => {
        navigate('/flow-management');
    }
    const onBtnDecision = () => {
        navigate('decision', { state: props.location.state });
    };

    const validateForm = () => {
        setValidated(true)
        setValidateOptionResult((resultParam.value === undefined))
        if (isEmpty(flowId) || isEmpty(flowName) || resultParam.value === undefined) {
            return false
        }
        if (effectiveDate && isEmpty(startDate)) {
            return false
        }
        return true


    }

    const onBtnSave = (event) => {
        props.setLoadingPages(true)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (validateForm()) {
            let flow = {
                flowId: `${flowId}`,
                flowName: `${flowName}`,
                resultParam: `${resultParam.value}`,
                isActive: `${(isActive === true) ? 'Y' : 'N '}`
            }
            props.setLoadingPages(false)
            Swal.fire({
                icon: 'info',
                title: `${'Do you want to save' + ((modePage === mode.edit.value) ? ' the changes?' : '?')}`,
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                props.setLoadingPages(true)
                if (result.isConfirmed) {
                    if (modePage !== mode.edit.value) {
                        createFlow(flow).then(responseObject => {
                            props.setLoadingPages(false)
                            if (responseObject.responseCode === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: `Success!`,
                                    text: 'Data has been saved successfully',
                                    showCancelButton: false,
                                }).then(() => {
                                    navigate('/flow-management');
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Error!`,
                                    text: `${responseObject.responseDecription}!`,
                                    showCancelButton: false,
                                });
                            }
                        });
                    } else {
                        updateFlow(flow).then(responseObject => {
                            props.setLoadingPages(false)
                            if (responseObject.responseCode === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: `Success!`,
                                    text: 'Data has been saved successfully',
                                    showCancelButton: false,
                                }).then(() => {
                                    navigate('/flow-management');
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Error!`,
                                    text: `${responseObject.responseDecription}!`,
                                    showCancelButton: false,
                                });
                            }
                        });
                    }
                }
            });
        } else {
            props.setLoadingPages(false)
        }
    }
    const onChangeEffective = (checkbox) => {
        setEffectiveDate(checkbox);
        setStartDate('')
        setEndDate('')
    }
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
                            checked={isActive}
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
                            disabled={(modePage === mode.edit.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Flow ID.
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
                            Please provide a valid Flow Name.
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
                        <div style={{
                            width: '100%',
                            marginTop: '0.25rem',
                            fontSize: '.875em',
                            color: '#dc3545'
                        }}>
                            {validateOptionResult ? 'Please provide a valid result param.' : ""}
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Effective Date :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Check
                            type={'checkbox'}
                            id={`default-checkbox`}
                            label={`Active Date`}
                            checked={effectiveDate}
                            onChange={e => onChangeEffective(e.target.checked)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" hidden={(effectiveDate !== true)}>
                    <Form.Label className="text-right" column md={4} >
                        Start Date :
                    </Form.Label>
                    <Col md={2} className='text-left'>
                        <DatepickerCustom
                            selected={startDate}
                            dateFormat={formatDatetime}
                            maxDate={endDate}
                            placeholderText={'Start Date'}
                            onChange={setStartDate}
                            required={true}
                            showTimeInput={true}
                        />
                    </Col>
                    <Form.Label className="text-right" column md={1} >
                        End Date :
                    </Form.Label>
                    <Col md={2}>
                        <DatepickerCustom
                            selected={endDate}
                            dateFormat={formatDatetime}
                            minDate={startDate}
                            placeholderText={'End Date'}
                            onChange={setEndDate}
                            required={false}
                            showTimeInput={true}
                            disabled={(isEmpty(startDate))}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" hidden={(modePage !== mode.edit.value)}>
                    <Form.Label className="text-right" column md={4} >
                        Decision Flow:
                    </Form.Label>
                    <Col md={4}>
                        <Button
                            className="btn-search"
                            variant="outline-success"
                            onClick={onBtnDecision}
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
                            onClick={onBtnSave}
                        >
                            <AiIcons.AiOutlineCheck /> Save
                        </Button>
                        <Button
                            className="btn-clear"
                            variant="outline-secondary"
                            onClick={onBtnClearForm}
                        >
                            <AiIcons.AiOutlineClear /> Clear
                        </Button>
                        <Button
                            className="btn-clear"
                            variant="outline-danger"
                            onClick={onBtnCancel}
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
