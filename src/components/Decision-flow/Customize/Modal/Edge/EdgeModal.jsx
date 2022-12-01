import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Row } from 'react-bootstrap'
import Select from 'react-select'
import { edgeTypeOption, edgeConditionOption, edgeParamConditionOption } from '../../../../Config/DataConfig'
import { getEdgeConditionOptionObject, getEdgeTypeOptionObject, getEdgeParamConditionOptionObject } from '../../../../Util/Util'
import * as BsIcons from 'react-icons/bs'
import * as BiIcons from 'react-icons/bi'

import './EdgeModal.css'

function ModalEdge(props) {
    const [edgeParamData, setEdgeParamData] = useState([])

    const generateEdgeParam = () => `${edgeParamData.length.toString().padStart(3, '0')}`
    useEffect(() => {
        console.log(props.edgeParam)
        setEdgeParamData(JSON.parse(JSON.stringify(props.edgeParam || [])))
    }, [props])

    const onChangeEdgeParam = (edgeParamId, field, value) => {
        setEdgeParamData((nds) =>
            nds.map((n) => {
                if (n.edgeParamId === edgeParamId) {
                    n[field] = value
                }
                return n;
            })
        );
    }

    const onAddCondition = () => {
        var edgeParam = {
            edgeId: props.idEdge,
            edgeParamId: generateEdgeParam(),
            edgeCondition: [],
            edgeType: [],
            edgeParam: "",
            edgeParamCondition: [],
            edgeParamCompare: "",
            edgeValueCompare: ""
        };
        setEdgeParamData(
            (e) => e.concat(edgeParam)
        )
    }

    const onDeleteEdgeParam = (edgeParamId) => {
        setEdgeParamData((ep) => ep.filter((edgeParam) => edgeParam.edgeParamId !== edgeParamId))
    }

    const onSave = () => {
        props.onSaveEdgeParam(edgeParamData);
    }
    
    return (
        <>
            <Modal
                size="xl"
                show={props.showModalEdge}
                onHide={props.cModal}
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Condition Edge</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body-edge'>
                    <Form className='max-height'>
                        <Row>
                            <Form.Group>
                                <Form.Label>Edge Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Node Name"
                                    value={props.idEdge}
                                    disabled
                                />
                                <br></br>
                            </Form.Group>
                            <Form.Group style={{ textAlign: 'right' }}>
                                <Button variant="info" onClick={onAddCondition}>
                                    <BiIcons.BiPlusCircle /> Add
                                </Button>
                            </Form.Group>
                        </Row>
                        <br></br>
                        <Form.Group>
                            <div className='body-table'>
                                <Table responsive="true" className='table-fixed'>
                                    <thead>
                                        <tr>
                                            <th>Edge Condition</th>
                                            <th>Edge Type</th>
                                            <th>Edge Param</th>
                                            <th>Edge Param Condition</th>
                                            <th>Edge Param Compare</th>
                                            <th>Edge Value Compare</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            edgeParamData && edgeParamData.map((item) => (
                                                <tr key={item.edgeParamId}>
                                                    <td>
                                                        <Select
                                                            options={edgeConditionOption}
                                                            placeholder="Edge Condition"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeConditionOptionObject(item.edgeCondition)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeCondition", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            options={edgeTypeOption}
                                                            placeholder="Edge Type"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeTypeOptionObject(item.edgeType)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeType", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Param"
                                                            defaultValue={item.edgeParam}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParam", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            options={edgeParamConditionOption}
                                                            placeholder="Edge Param Condition"
                                                            isSearchable={false}
                                                            defaultValue={getEdgeParamConditionOptionObject(item.edgeParamCondition)}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParamCondition", e.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Param Compare"
                                                            defaultValue={item.edgeParamCompare}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeParamCompare", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Edge Value Compare"
                                                            defaultValue={item.edgeValueCompare}
                                                            onChange={e => onChangeEdgeParam(item.edgeParamId, "edgeValueCompare", e.target.value)}
                                                        />
                                                    </td>

                                                    <td>
                                                        <Button variant="danger"
                                                            onClick={e => onDeleteEdgeParam(item.edgeParamId)}
                                                        >
                                                            <BsIcons.BsTrash /> Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEdge;


