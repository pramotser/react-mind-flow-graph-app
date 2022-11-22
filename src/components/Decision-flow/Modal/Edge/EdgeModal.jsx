import { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap'
import Select from 'react-select'
import { edgeTypeOption, edgeConditionOption, edgeParamConditionOption } from '../../../config/DataConfig'
import { getEdgeConditionOptionObject, getEdgeTypeOptionObject, getEdgeParamConditionOptionObject } from '../../../Util/Util'

import './EdgeModal.css'

function ModalEdge(props) {
    const [edgeParamData, setEdgeParamData] = useState([])

    const generateEdgeParam = () => `${edgeParamData.length.toString().padStart(3, '0')}`

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
        setEdgeParamData(
            (e) => e.concat({
                edgeId: props.idEdge,
                edgeParamId: generateEdgeParam(),
                edgeCondition: [],
                edgeType: [],
                edgeParam: "",
                edgeParamCondition: [],
                edgeParamCompare: "",
                edgeValueCompare: ""
            })
        )
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
                        <Form.Group className="mb-3">
                            <Form.Label>Edge Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Node Name"
                                value={props.idEdge}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ textAlign: 'right' }}>
                            <Button variant="info" onClick={onAddCondition}>
                                + Add
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="container">
                                <Table responsive="true" className='max-height'>
                                    <thead>
                                        <tr>
                                            <th>Edge Condition</th>
                                            <th>Edge Type</th>
                                            <th>Edge Param</th>
                                            <th>Edge Param Condition</th>
                                            <th>Edge Param Compare</th>
                                            <th>Edge Value Compare</th>
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


