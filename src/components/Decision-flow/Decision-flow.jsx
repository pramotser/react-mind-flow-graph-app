
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    MiniMap,
    Background,
    MarkerType,
} from 'reactflow';
import Swal from 'sweetalert2'
import 'reactflow/dist/style.css';
import './Decision-Flow.css'
import * as BiIcons from 'react-icons/bi'
import { Button } from "react-bootstrap";

import ModalNode from '../modal/node/NodeModal';
import ButtonEdge from '../customize/button/ButtonEdge';
import ExportModal from '../modal/export/ExportModal'
import Sidebar from '../layout/Sidebar';

import '../../index.css';
import CustomNode from '../customize/node/CustomNode';

let idRunning = 0;
const edgeTypes = {
    buttonedge: ButtonEdge
};
const nodeTypes = {
    custom: CustomNode,
};

const tbMFlow = {
    flowId: 619,
    flowName: 'Test Program PLNW_TENOR_72 MaxTenor',
    resultParam: 'maxTenor'
}

const DecisionFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge({
        ...params, type: 'buttonedge', markerEnd: { type: MarkerType.ArrowClosed, }, style: { strokeWidth: 2 },
        data: {
            function: {
                saveEdgeParam: saveEdgeParam,
                deleteEdge: deleteEdge,
            }
        }
    }, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const nodeId = event.dataTransfer.getData('application/nodeId');
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
                zoom: 0.5
            });
            let lable;
            if (type === "input") {
                lable = 'Start'
            } else if (type === 'default') {
                lable = 'New Node'
            } else {
                lable = 'End'
            }
            const newNode = {
                id: `${nodeId}`,
                type: "custom",
                position,
                data: {
                    label: `${lable}`,
                    nodeType: `${((type === "input") ? "START" : (type === "output") ? "END" : "")}`,
                    flowNodeId: `${tbMFlow.flowId}`,
                    flowId: `${nodeId}`,
                    nodeName: "",
                    subFlowId: "",
                    functionRef: "",
                    functionRefParam: "",
                    defaultParam: "",
                    result:'',
                    remark:''
                },
            };
            setNodes((nds) => nds.concat(newNode));
        },
    );

    const generateFloeNodeID = () => `${tbMFlow.flowId.toString()}${(idRunning++).toString().padStart(3, '0')}`;
    const [openModalNode, setOpenModalNode] = useState(false);
    const [nodeData, setNodeData] = useState({})
    const onCloseModalNode = () => {
        setOpenModalNode(false);
    }

    const onNodeClick = useCallback((event, node) => {
        if (node.data.nodeType !== "START") {
            setNodeData(node)
            setOpenModalNode(true);
        }
    }, [])

    const saveNode = useCallback((node) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === node.id) {
                    n = node
                }
                return n;
            })
        );
        setOpenModalNode(false);
    }, 
    )

    const deleteNode = (nodeId) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId))
        setEdges((edges) => edges.filter((edge) => (edge.source !== nodeId && edge.target !== nodeId)))
        setOpenModalNode(false);
    }

    // Modal Export
    const [jsonData, setJsonData] = useState("")
    const [openModalExport, setOpenModalExport] = useState(false);
    const onExportModal = () => {
        setJsonData(JSON.stringify(reactFlowInstance.toObject()));
        setOpenModalExport(true);
    }

    const onCloseModalExport = () => {
        setOpenModalExport(false);
    }

    // Modal Edge
    const saveEdgeParam = useCallback((edgeId, edgeParam) => {
        setEdges((eds) =>
            eds.map((e) => {
                if (e.id === edgeId) {
                    e.data.edgeParam = edgeParam
                }
                return e;
            })
        );

    }, [setEdges, reactFlowInstance])

    const deleteEdge = (edgeId) => {
        setEdges((edges) => edges.filter((edge) => edge.id !== edgeId))
    }

    const SessionKey = `Session-${tbMFlow.flowId}`;
    const onSaveSession = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(SessionKey, JSON.stringify(flow));
            Swal.fire('Saved!', '', 'success')
        }

    }, [reactFlowInstance]);

    const onRestoreSession = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(SessionKey));
            if (flow) {
                setNodes(flow.nodes || []);
                setEdges(flow.edges.map((e) => {
                    e.data = {
                        function: {
                            saveEdgeParam: saveEdgeParam,
                            deleteEdge: deleteEdge,
                        },
                        edgeParam: e.data.edgeParam || []
                    }
                    return e;
                }));

            }
        };
        restoreFlow();
    }, [setNodes]);
    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <Sidebar generateFloeNodeID={generateFloeNodeID} />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onNodeClick={onNodeClick}
                        onEdgesChange={onEdgesChange}
                        edgeTypes={edgeTypes}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        deleteKeyCode={null}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <div className="save__controls">
                            <Button variant="success" onClick={onExportModal}>
                                <BiIcons.BiExport /> Export JSON
                            </Button>
                            <Button variant="primary" onClick={onSaveSession}>
                                Save Session
                            </Button>
                            <Button variant="warning" onClick={onRestoreSession}>
                                <BiIcons.BiHistory /> Restore Session
                            </Button>

                        </div>
                        <MiniMap />
                        <Controls />
                        <Background color="#aaa" gap={16} />
                        <ModalNode
                            onCloseModalNode={onCloseModalNode}
                            saveNode={saveNode}
                            deleteNode={deleteNode}
                            showModalNode={openModalNode}
                            nodeData={nodeData}
                        />

                        <ExportModal
                            showModalExport={openModalExport}
                            onCloseModalExport={onCloseModalExport}
                            jsonData={jsonData}
                        />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DecisionFlow;
