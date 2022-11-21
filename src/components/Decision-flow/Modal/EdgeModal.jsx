import { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap'
import Select from 'react-select'
import {edgeTypeOption , edgeConditionOption , edgeParamConditionOption} from '../../config/DataConfig'

function ModalEdge(props) {
    console.log(props.showModalEdge);
    const [edgeCondition, setEdgeCondition] = useState("")
    const [edgeType, setEdgeType] = useState("")
    const [edgeParam, setEdgeParam] = useState("")
    const [edgeParamCondition, setEdgeParamCondition] = useState("")
    const [edgeParamCompare, setEdgeParamCompare] = useState("")
    const [edgeResult, setEdgeResult] = useState("")

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
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Edge Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Node Name"
                                value={props.idEdge}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Edge Condition</th>
                                        <th>Edge Type</th>
                                        <th>Edge Param</th>
                                        <th>Edge Param Condition</th>
                                        <th>Edge Param Compare</th>
                                        <th>Edge Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Select
                                                options={edgeConditionOption}
                                                placeholder="Edge Condition"
                                                isSearchable={false}
                                                value={edgeCondition}
                                                onChange={e => setEdgeCondition(e.value)}
                                            />
                                        </td>
                                        <td>
                                            <Select
                                                options={edgeTypeOption}
                                                placeholder="Edge Type"
                                                isSearchable={false}
                                                value={edgeType}
                                                onChange={e => setEdgeType(e.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Edge Param"
                                                value={edgeParam}
                                                onChange={e => setEdgeParam(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Select
                                                options={edgeParamConditionOption}
                                                placeholder="Edge Param Condition"
                                                isSearchable={false}
                                                value={edgeParamCondition}
                                                onChange={e => setEdgeParamCondition(e.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Edge Param Compare"
                                                value={edgeParamCompare}
                                                onChange={e => setEdgeParamCompare(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Edge Result"
                                                value={edgeResult}
                                                onChange={e => setEdgeResult(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.cModal}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEdge;


