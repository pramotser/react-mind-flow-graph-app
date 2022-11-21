// Import Libary
import React, { useState, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    MiniMap,
    Controls,
    Background,
    MarkerType,
} from 'reactflow';
import Select from 'react-select'
import { Form, Button, Modal, Card, Collapse } from "react-bootstrap";


// Import Cascading Style Sheets 
import 'reactflow/dist/style.css';
import './Decision-flow.css'

// import CustomNode from './CustomNode/CustomNode';
import { initialNodes, initialEdges } from './initialElements'
import ButtonEdge from './ButtonEdge/ButtonEdge';
import ExportModal from './Modal/ExportModal'
import ModalNode from  './Modal/NodeModal'

const flow_id = 170;

const FlowSessionKey = `Session-${flow_id}`;

const edgeTypes = {
    buttonedge: ButtonEdge,
};

const Decision = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'buttonedge', markerEnd: { type: MarkerType.ArrowClosed, }, style: { strokeWidth: 2 } }, eds)),
        [setEdges]
    );

    const generateFloeNodeID = () => `${flow_id.toString() + nodes.length.toString().padStart(3, '0')}`
    // const generateFloeEdgeID = (running) => `${flow_id.toString() + running.toString().padStart(4, '0')}`

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState("")
    const [subFlowId, setSubFlow] = useState("")
    const [functionRef, setFunctionRef] = useState("")
    const [functionRefParam, setFunctionRefParam] = useState("")
    const [defaultParam, setDefaultParam] = useState("")
    const [step, setStep] = useState("")

    const nodeTypeOption = [
        { value: 'DECISION', label: 'Decision' },
        { value: 'FUNCTION', label: 'Function' },
        { value: 'SUBFLOW', label: 'Subflow' }
    ]
    const stepOption = [
        { value: 'NEXT', label: 'Next' },
        { value: 'OUT', label: 'Out' },
        { value: 'END', label: 'End' }
    ]
    const [show, setShow] = useState(false);
    const [openCollapseFunction, setOpenCollapseFunction] = useState(false);
    const [openCollapseSubFlow, setOpenCollapseSubFlow] = useState(false);
    const [openCollapseDecision, setOpenCollapseDecision] = useState(false);

    const openCollapse = (nodeType) => {
        setSubFlow("")
        setFunctionRef("")
        setFunctionRefParam("")
        setDefaultParam("")
        setStep("")
        setOpenCollapseFunction((nodeType === 'FUNCTION'))
        setOpenCollapseSubFlow((nodeType === 'SUBFLOW'))
        setOpenCollapseDecision((nodeType === 'DECISION'))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setOpenCollapseFunction(false)
        setOpenCollapseSubFlow(false)
        setOpenCollapseDecision(false)
    };
    const onSubmit = () => {
        setNodes((e) =>
            e.concat({
                id: generateFloeNodeID(),
                data: {
                    label: `${nodeName}`,
                    flowNodeId: Number.parseInt(generateFloeNodeID()),
                    flowId: flow_id,
                    nodeType: `${nodeType}`,
                    nodeName: `${nodeName}`,
                    subFlowId: `${subFlowId}`,
                    functionRef: `${functionRef}`,
                    functionRefParam: `${functionRefParam}`,
                    defaultParam: `${defaultParam}`,
                    step: `${step}`

                },
                // type: 'custom',
                position: { x: 0, y: 0 },
            })
        );
        setShow(false);
        resetObjectNode()
    };

    const returnJsonData = () => `${JSON.stringify(rfInstance.toObject())}`

    const resetObjectNode = () => {
        setNodeName("")
        setNodeType("")
        setSubFlow("")
        setFunctionRef("")
        setFunctionRefParam("")
        setDefaultParam("")
        setStep("")
    }

    const onExport = () => {
        const flow = rfInstance.toObject();
        console.log(flow)
        // const nodes = flow.nodes;
        // const edges = flow.edges;
        // console.log("Node React Flow : ", nodes)
        // console.log("Edge React Flow : ", edges)
        // const flowNodeList = []
        // const flowEdgeList = []

        // nodes.map((node) => {
        //     // if (node.data.step !== "END" && node.data.step !== "OUT") {
        //         var rowFlowNode = {
        //             flowNodeId: node.data.flowNodeId,
        //             flowId: node.data.flowId,
        //             nodeType: node.data.nodeType,
        //             nodeName: node.data.nodeName,
        //             subFlowId: node.data.subFlowId,
        //             functionRef: node.data.functionRef,
        //             functionRefParam: node.data.functionRefParam,
        //             defaultParam: node.data.defaultParam,
        //         }
        //         flowNodeList.push(rowFlowNode)
        //     // }
        // })

        // edges.map((edge , index) => {
        //     var stepNode = nodes.filter(
        //         (node) => node.data.flowNodeId === Number.parseInt(edge.target)
        //     )[0].data.step;
        //     var rowFlowEdge = {
        //         flowEdgeId: Number.parseInt(generateFloeEdgeID(index)),
        //         step: stepNode,
        //         flowNodeId: edge.source,
        //         flowEdgeResult: edge.target
        //     }
        //     flowEdgeList.push(rowFlowEdge)
        // })

        // console.log('Node : ', flowNodeList)
        // console.log('Edge : ', flowEdgeList)
    }

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(FlowSessionKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(FlowSessionKey));
            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };
        restoreFlow();
    }, [setNodes, setViewport]);


    const [openModalNode, setOpenModalNode] = useState(false);
    const [nodeIdForModal , setNodeIdForModal] = useState("")
    const [nodeModel , setNodeModel] = useState({})
    const onCloseModalNode = () => {
        setOpenModalNode(false);
    }
    const onNodeClick = (event, node) => {
        console.log('click node', node.id)
        if (node) {
            setNodeModel(node)
            setNodeIdForModal(node.id)
            setOpenModalNode(true);
            // setTypeNode(node.typeNode);
        }
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            edgeTypes={edgeTypes}
            fitView
            onNodeClick={onNodeClick}
            attributionPosition="top-right"
        >
            <div className="save__controls">
                <Button variant="primary" onClick={handleShow}>
                    Add Node
                </Button>
                <Modal
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-lg-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New Node</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Node Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Node Name"
                                    value={nodeName}
                                    onChange={e => setNodeName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Node Type</Form.Label>
                                <Select
                                    options={nodeTypeOption}
                                    placeholder="Select Node type"
                                    isSearchable={false}
                                    onChange={e => { setNodeType(e.value); openCollapse(e.value); }} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Collapse in={openCollapseDecision} dimension="height">
                                    <div id="example-collapse-text">
                                        <Card body >
                                            <Form.Group className="mb-3">
                                                <Form.Label>Default Param</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Default Param"
                                                    value={defaultParam}
                                                    onChange={e => setDefaultParam(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Card>
                                    </div>
                                </Collapse>
                                <Collapse in={openCollapseFunction} dimension="height">
                                    <div id="example-collapse-text">
                                        <Card body >
                                            <Form.Group className="mb-3">
                                                <Form.Label>Function Ref</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Function Ref"
                                                    value={functionRef}
                                                    onChange={e => setFunctionRef(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Function Ref Param</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Function Ref Param"
                                                    value={functionRefParam}
                                                    onChange={e => setFunctionRefParam(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Card>
                                    </div>
                                </Collapse>
                                <Collapse in={openCollapseSubFlow} dimension="height">
                                    <div id="example-collapse-text">
                                        <Card body >
                                            <Form.Group className="mb-3">
                                                <Form.Label>Subflow</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Subflow"
                                                    value={subFlowId}
                                                    onChange={e => setSubFlow(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Default Param</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Default Param"
                                                    value={defaultParam}
                                                    onChange={e => setDefaultParam(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Card>
                                    </div>
                                </Collapse>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Step Node</Form.Label>
                                <Select
                                    options={stepOption}
                                    placeholder="Step Node"
                                    isSearchable={false}
                                    onChange={e => setStep(e.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" onClick={onExport}>
                    Export JSON
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Seesion
                </Button>
                <Button variant="primary" onClick={onRestore}>
                    Restore
                </Button>
                {/* <ExportModal exportJson={returnJsonData} /> */}
            </div>
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />

            <ModalNode cModal={onCloseModalNode} showModalNode={openModalNode} idNode={nodeIdForModal} nodeModel={nodeModel} />
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <Decision />
    </ReactFlowProvider>
);
