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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


//Modal
import NodeCustom from '../../reactflow/node-custom/Node-custom';
import EdgeCustom from '../../reactflow/edge-custom/Edge-custom'
import NodeModal from '../../modal/node/Node-modal';
import ExportModal from '../../modal/export/Export-modal';

//Component other
import FormDecisionControl from '../form-decision-control/Form-decision-control';
// import ConnectionLine from '../../reactflow/connection-line/connectionLine';

//Util and Config
import { isNullOrUndefined } from '../../../util/Util';
import { ActiveFlag, DropdownType, NodeType } from '../../../config/config';
import { getDropdownByType } from '../../../services/util-service';

let nodeIdRunning = 0;
const edgeTypes = {
    buttonedge: EdgeCustom
};
const nodeTypes = {
    custom: NodeCustom,
};
let nodeStart = null;

const Decision = (props) => {
    const navigate = useNavigate()
    const SessionKey = `Session-${props.location.state.data.flowId}`
    const { setLoadingPages, location } = props;


    const [flowMain, setFlowMain] = useState({})
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({
        ...params, type: 'buttonedge', markerEnd: { type: MarkerType.ArrowClosed, }, style: { strokeWidth: 2 },
        data: {
            function: {
                saveEdgeParam: saveEdgeParam,
                deleteEdge: deleteEdge,
                setLoadingPages: setLoadingPages
            },
            nodeStart: nodeStart,
        },
    }, eds)), []);


    const [dropdownFlowList, setDropdownFlowList] = useState([])


    useEffect(() => {
        getDropdownByType(DropdownType.FLOW_LIST, ActiveFlag.Y).then(resFlowList => {
            setDropdownFlowList(resFlowList.responseObject)
        })
        setFlowMain(location.state.data)
        localStorage.removeItem(SessionKey)
        if (!isNullOrUndefined(location.state.data.decisionFlow)) {
            const flow = JSON.parse(location.state.data.decisionFlow);
            if (flow) {
                let filterNodeStart = flow.nodes.filter(
                    (node) => node.data.nodeType.indexOf(NodeType.START) !== -1
                );
                nodeStart = filterNodeStart[0].id;
                setNodes(flow.nodes || []);
                setEdges(flow.edges.map((e) => {
                    e.data = {
                        function: {
                            saveEdgeParam: saveEdgeParam,
                            deleteEdge: deleteEdge,
                            setLoadingPages: setLoadingPages
                        },
                        nodeStart: nodeStart,
                        edgeParam: e.data.edgeParam || []
                    }
                    return e;
                }));
                let arrayNodeID = flow.nodes.map((n) => { return Number.parseInt(n.id) });
                nodeIdRunning = Math.max(...arrayNodeID)
                nodeIdRunning++
                localStorage.setItem(SessionKey, location.state.data.decisionFlow);
            }
        }
    }, [])

    // const generateFloeNodeID = () => `${flowMain.flowId.toString()}${(idRunning++).toString().padStart(3, '0')}`;
    const generateFloeNodeID = () => `${(nodeIdRunning++).toString()}`;

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
                nodeType = NodeType.START
            } else if (type === 'default') {
                lable = 'New Node'
                nodeType = ''
            } else {
                lable = 'Result Node'
                nodeType = NodeType.END
            }

            const newNode = {
                id: `${nodeId}`,
                type: "custom",
                position,
                data: {
                    label: `${lable}`,
                    nodeType: `${nodeType}`,
                    flowNodeId: `${nodeId}`,
                    flowId: `${flowMain.flowId}`,
                    nodeName: '',
                    subFlowId: '',
                    functionRef: '',
                    functionRefParam: '',
                    defaultParam: '',
                    result: '',
                    remark: ''
                },
            };
            if ((newNode.data.nodeType === NodeType.START) && nodes.filter((node) => node.data.nodeType === NodeType.START).length > 0) {
                Swal.fire(
                    'Node Start Duplicate?',
                    'Unable to create duplicate startup node.',
                    'warning'
                )
                nodeIdRunning--;
            } else {
                if ((newNode.data.nodeType === NodeType.START)) {
                    nodeStart = nodeId
                }
                setNodes((nds) => nds.concat(newNode));
                if (newNode.data.nodeType !== NodeType.START) {
                    setNodeData(newNode)
                    setOpenModalNode(true);
                }
            }
        },
    );
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Modal Node
    const [openModalNode, setOpenModalNode] = useState(false);
    const [nodeData, setNodeData] = useState({})
    const onCloseModalNode = () => {
        setOpenModalNode(false);
    }

    const onNodeClick = useCallback((event, node) => {
        if (node.data.nodeType !== NodeType.START) {
            setNodeData(node)
            setOpenModalNode(true);
        }
    }, [])

    const saveNode = useCallback((node, flagDeleteEdge) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === node.id) {
                    n = node
                }
                return n;
            })
        );
        setOpenModalNode(false);
        if (flagDeleteEdge)
            setEdges((edges) => edges.filter((edge) => edge.source !== node.id))
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
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const onSaveSession = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(SessionKey, JSON.stringify(flow));
            Swal.fire('Saved Seesion', '', 'success')
        }
    }

    const onSaveDecision = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            location.state.data.decisionFlow = JSON.stringify(flow);
            navigate('/flow-management/edit', { state: location.state });
        }
    }

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

    const navigateToCreateFlow = () => {
        navigate('/flow-management/edit', { state: location.state });
    }
    // const onEdgeUpdate = useCallback(
    //     (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    //     []
    // );

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
                        // connectionLineComponent={ConnectionLine}
                        fitView
                    >
                        <FormDecisionControl
                            function={{
                                generateFloeNodeID: generateFloeNodeID,
                                onExportModal: onExportModal,
                                onSaveSession: onSaveSession,
                                onRestoreSession: onRestoreSession,
                                navigateToCreateFlow: navigateToCreateFlow,
                                onSaveDecision: onSaveDecision
                            }}
                            flow={location.state.data} />
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
                            data={
                                {
                                    subFlowOptions: dropdownFlowList
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
