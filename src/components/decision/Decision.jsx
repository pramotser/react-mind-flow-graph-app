import './decision.scss'
import 'reactflow/dist/style.css';
import React, { useState, useRef, useCallback, useEffect } from 'react';
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

// import ButtonEdge from './customize/button/ButtonEdge';

import NodeCustom from '../reactflow/node-custom/Node-custom';
import EdgeCustom from '../reactflow/edge-custom/Edge-custom'

import NodeModal from '../modal/node/Node-modal';
import ExportModal from '../modal/export/Export-modal';
import FormDecisionControl from '../form-decision-control/Form-decision-control';
import { useNavigate } from 'react-router-dom';

let idRunning = 0;
const edgeTypes = {
    buttonedge: EdgeCustom
};
const nodeTypes = {
    custom: NodeCustom,
};

const Decision = (props) => {
    const navigate = useNavigate()
    const [flowMain, setFlowMain] = useState({})
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const SessionKey = `Session-${props.location.state.data.flowId}`
    const onConnect = useCallback((params) => setEdges((eds) => addEdge({
        ...params, type: 'buttonedge', markerEnd: { type: MarkerType.ArrowClosed, }, style: { strokeWidth: 2 },
        data: {
            function: {
                saveEdgeParam: saveEdgeParam,
                deleteEdge: deleteEdge,
            },
        },
    }, eds)), []);

    useEffect(() => {
        setFlowMain(props.location.state.data)
        localStorage.removeItem(SessionKey)
    }, [])

    const generateFloeNodeID = () => `${flowMain.flowId.toString()}${(idRunning++).toString().padStart(3, '0')}`;

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
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
                zoom: 0.2
            });
            let lable;
            let nodeType;

            if (type === "input") {
                lable = 'Start'
                nodeType = 'START'
            } else if (type === 'default') {
                lable = 'New Node'
                nodeType = ''
            } else {
                lable = 'Result Node'
                nodeType = 'END'
            }

            const newNode = {
                id: `${nodeId}`,
                type: "custom",
                position,
                data: {
                    label: `${lable}`,
                    // nodeType: `${((type === "input") ? "START" : (type === "output") ? "END" : "")}`,
                    nodeType: `${nodeType}`,
                    flowNodeId: `${flowMain.flowId}`,
                    flowId: `${nodeId}`,
                    nodeName: '',
                    subFlowId: '',
                    functionRef: '',
                    functionRefParam: '',
                    defaultParam: '',
                    result: '',
                    remark: ''
                },
            };
            if ((newNode.data.nodeType === "START") && nodes.filter((node) => node.data.nodeType === 'START').length > 0) {
                Swal.fire(
                    'Node Start Duplicate?',
                    'Unable to create duplicate startup node.',
                    'warning'
                )
                idRunning--;
            } else {
                setNodes((nds) => nds.concat(newNode));
                // if (newNode.data.nodeType !== "START") {
                //     setNodeData(newNode)
                //     setOpenModalNode(true);
                // }
            }
        },
    );
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
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


    const onSaveSession = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(SessionKey, JSON.stringify(flow));
            Swal.fire('Saved Seesion', '', 'success')
        }

    }

    // const onSaveSession = useCallback(() => {
    //     setSessionKey(SessionKey)
    //     if (reactFlowInstance) {
    //         const flow = reactFlowInstance.toObject();
    //         localStorage.setItem(sessionKey, JSON.stringify(flow));
    //         Swal.fire('Saved Seesion', '', 'success')
    //     }
    // }, [reactFlowInstance]);

    const onRestoreSession = () => {
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
    }
    // const onRestoreSession = useCallback(() => {
    //     const restoreFlow = async () => {
    //         const flow = JSON.parse(localStorage.getItem(SessionKey));
    //         if (flow) {
    //             setNodes(flow.nodes || []);
    //             setEdges(flow.edges.map((e) => {
    //                 e.data = {
    //                     function: {
    //                         saveEdgeParam: saveEdgeParam,
    //                         deleteEdge: deleteEdge,
    //                     },
    //                     edgeParam: e.data.edgeParam || []
    //                 }
    //                 return e;
    //             }));

    //         }
    //     };
    //     restoreFlow();
    // }, [setNodes]);

    const navigateToCreateFlow = () => {
        navigate('/flow-management/edit', { state: props.location.state });
    }
    

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        onInit={setReactFlowInstance}
                        nodes={nodes}
                        nodeTypes={nodeTypes}
                        edges={edges}


                        edgeTypes={edgeTypes}
                        onConnect={onConnect}
                        onNodesChange={onNodesChange}
                        onNodeClick={onNodeClick}
                        onEdgesChange={onEdgesChange}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        deleteKeyCode={null}
                        fitView
                    >
                        <FormDecisionControl
                            function={{
                                generateFloeNodeID: generateFloeNodeID,
                                onExportModal: onExportModal,
                                onSaveSession: onSaveSession,
                                onRestoreSession: onRestoreSession,
                                navigateToCreateFlow:navigateToCreateFlow
                            }}
                            flow={props.location.state.data} />
                        <MiniMap />
                        <Controls />
                        <Background color="#aaa" gap={16} />
                        <NodeModal
                            showModalNode={openModalNode}
                            nodeData={nodeData}
                            function={
                                {
                                    saveNode: saveNode,
                                    deleteNode: deleteNode,
                                    onCloseModalNode: onCloseModalNode,
                                }
                            }
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

export default Decision;
