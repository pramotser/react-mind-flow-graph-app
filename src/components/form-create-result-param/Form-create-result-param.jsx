import "./form-create-result-param.scss";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap'

import * as AiIcons from 'react-icons/ai'
import Swal from "sweetalert2";

import { isNullOrUndefined } from "../../util/Util";
import {
    mode
} from '../../config/config'
import { createResultParam, updateResultParam } from "../../services/result-param-service";



const FormCreateResultParam = (props) => {
    const navigate = useNavigate()
    const [modePage] = useState(props.location.state.mode)

    const [validated, setValidated] = useState(false)
    const [resultParamCode, setResultParamCode] = useState('')
    const [resultParamName, setResultParamName] = useState('')
    const [isActive, setIsActive] = useState(true)


    useEffect(() => {
        props.setLoadingPages(true)
        // getDropdownByType(DropdownType.RESULT_PARAM_LIST).then(res => {
        //     setResultParamOption(res.responseObject);
        initialForm()
        if (modePage !== mode.add.value) {
            console.log(props)
            setDataToForm(props.location.state)
        }
        props.setLoadingPages(false)
        // });
    }, [])

    const initialForm = () => {
        setResultParamCode('')
        setResultParamName('')
        setIsActive(true)
        setValidated(false)
    }

    const setDataToForm = (state) => {
        setResultParamCode(state.data.resultParamCode)
        setResultParamName(state.data.resultParamName)
        setIsActive((state.data.isActive === 'Y'))
    }

    const onBtnClearForm = () => {
        props.setLoadingPages(true)
        initialForm();
        if (modePage !== mode.add.value) {
            setDataToForm(props.location.state)
        }
        props.setLoadingPages(false)
    }

    const onBtnCancel = () => {
        navigate('/result-param-management');
    }

    const validateForm = () => {
        setValidated(true)
        if (isNullOrUndefined(resultParamCode) || isNullOrUndefined(resultParamName)) {
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
            let resultParam = {
                resultParamCode: `${resultParamCode}`,
                resultParamName: `${resultParamName}`,
                isActive: `${(isActive === true) ? 'Y' : 'N '}`,
            }
            props.setLoadingPages(false)

            Swal.fire({
                icon: 'info',
                title: `${'Do you want to save' + ((modePage === mode.edit.value) ? ' the changes?' : '?')}`,
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    props.setLoadingPages(true)
                    if (modePage !== mode.edit.value) {
                        createResultParam(resultParam).then(res => {
                            props.setLoadingPages(false)
                            if (res.responseCode === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: `Success`,
                                    text: `${res.responseDecription}`,
                                    showCancelButton: false,
                                }).then(() => {
                                    navigate('/result-param-management');
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Error!`,
                                    text: `${res.responseDecription}`,
                                    showCancelButton: false,
                                });
                            }
                        })
                    } else {
                        updateResultParam(resultParam).then(res => {
                            props.setLoadingPages(false)
                            if (res.responseCode === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: `Success`,
                                    text: `${res.responseDecription}`,
                                    showCancelButton: false,
                                }).then(() => {
                                    navigate('/result-param-management');
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Error!`,
                                    text: `${res.responseDecription}`,
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
    return (
        <>
            <div className="sub-title-content">Result Param</div>
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
                        Result Param Code :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="resultParamCode"
                            placeholder="Result Param Code"
                            value={resultParamCode}
                            onChange={e => setResultParamCode(e.target.value)}
                            disabled={(modePage === mode.edit.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Result Param Code.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label className="text-right" column md={4} >
                        Result Param Name :
                    </Form.Label>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="resultParamName"
                            placeholder="Result Param Name"
                            value={resultParamName}
                            onChange={e => setResultParamName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Result Param Name.
                        </Form.Control.Feedback>
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

export default FormCreateResultParam;
