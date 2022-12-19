import "./form-create-flow.scss";
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'

import { getDropdownResultParam } from "../../services/util-service";
import { createFlow, updateFlow } from "../../services/decision-service";
import { isEmpty } from "../../util/Util";
import Swal from "sweetalert2";

const FormCreateFlow = (props) => {

    const [mode] = useState(props.location.state.mode)

    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [resultParamOption, setResultParamOption] = useState([])
    const [flowId, setFlowId] = useState('')
    const [flowName, setFlowName] = useState('')
    const [resultParam, setResultParam] = useState([])
    const [isActive, setIsActive] = useState(true)
    const [validateOptionResult, setValidateOptionResult] = useState(false)

    useEffect(() => {
        getDropdownResultParam()
            .then(responseObject => {
                initialFormCreate(responseObject)
            });
    }, [])

    const initialFormCreate = (resultParamList) => {
        setResultParamOption(resultParamList);
        if (mode === 'edit') {
            const filteredResultParamList = resultParamList.filter(
                (resultParam) => resultParam.value.indexOf(props.location.state.data.resultParam) !== -1
            );
            setFlowId(props.location.state.data.flowId)
            setFlowName(props.location.state.data.flowName)
            setResultParam(filteredResultParamList[0])
            setIsActive((props.location.state.data.isActive === 'Y'))
        } else {
            setFlowId('')
            setFlowName('')
            setResultParam([])
            setIsActive(true)
        }
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
            Swal.fire({
                icon: 'info',
                title: `${'Do you want to save' + ((mode === 'edit') ? ' the changes?' : '?')}`,
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (mode === 'edit') {
                        Swal.fire('Coming soon', '', 'info')
                        updateFlow(flow).then(responseObject => {
                            Swal.fire({
                                icon: 'success',
                                title: `Saved!`,
                                text: 'Data has been saved successfully',
                                showCancelButton: false,
                            }).then((result) => {
                                navigateToFlowManagement()
                            })
                        });
                    } else {
                        createFlow(flow).then(responseObject => {
                            Swal.fire({
                                icon: 'success',
                                title: `Saved!`,
                                text: 'Data has been saved successfully',
                                showCancelButton: false,
                            }).then((result) => {
                                navigateToFlowManagement()
                            })
                        });
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        } else {
            if (resultParam.value !== undefined) {
                setValidateOptionResult(true)
            } else {
                setValidateOptionResult(false)
            }
        }

    }

    const handleButtonClearFormCreateFlow = () => {
        setValidated(false)
        initialFormCreate(resultParamOption)
    }

    const navigateToFlowManagement = () => {
        navigate('/flow-management');
    };

    const navigateToDecision = () => {
        navigate('decision', { state: { flowId: flowId, flowName: flowName, resultParam: resultParam.value } });
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
                            disabled={(mode === 'edit')}
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
                        <div className="invalid-customer">
                            {validateOptionResult ? 'Please provide a valid result param.' : ""}
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" hidden={!(mode === 'edit')}>
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
