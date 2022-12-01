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
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import * as BiIcons from 'react-icons/bi'

import 'reactflow/dist/style.css';
import './Decision-flow.css'

import { initialNodes, initialEdges } from '../Config/DataConfig'
import ButtonEdge from './Customize/ButtonEdge/ButtonEdge';
import ExportModal from './Customize/Modal/Export/ExportModal'
import ModalNode from './Customize/Modal/Node/NodeModal'

const flow_id = 170;

const FlowSessionKey = `Session-${flow_id}`;

const edgeTypes = {
    buttonedge: ButtonEdge
};

const Decision = () => {
    const generateFloeNodeID = () => `${flow_id.toString() + nodes.length.toString().padStart(3, '0')}`
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    const onConnect =
        (params) => setEdges((eds) => addEdge({
            ...params, type: 'buttonedge', markerEnd: { type: MarkerType.ArrowClosed, }, style: { strokeWidth: 2 },
            data: {
                functionName: saveEdgeParam,
            }
        }, eds));

    const onSave = useCallback(() => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showConfirmButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: '#8CD4F5',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if (rfInstance) {
                    const flow = rfInstance.toObject();
                    localStorage.setItem(FlowSessionKey, JSON.stringify(flow));
                    Swal.fire('Saved!', '', 'success')
                }
            } else {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(FlowSessionKey));
            if (flow) {
                // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                console.log(flow.edges)
                setNodes(flow.nodes || []);
                setEdges(flow.edges.map((e) => {
                    // var edgeParam = (e.edgeParam) ? flow.edges.filter((edge) => edge.id === e.id).edgeParam : []
                    e.data = {
                        functionName: saveEdgeParam,
                        edgeParam: e.data.edgeParam || []
                    }
                    return e;
                }));

            }
        };
        restoreFlow();
    }, [setNodes, setViewport]);

    // Modal Node
    const [modeNodeModal, setModeNodeModal] = useState("")
    const [openModalNode, setOpenModalNode] = useState(false);
    const [nodeModel, setNodeModel] = useState({})

    const onAddNodeClick = () => {
        setModeNodeModal("Add")
        setOpenModalNode(true);
    }

    const onNodeClick = (event, node) => {
        setModeNodeModal("Edit")
        if (node) {
            setNodeModel(node)
            setOpenModalNode(true);
        }
    };

    const onCloseModalNode = () => {
        setOpenModalNode(false);
    }

    const saveNode = (mode, node) => {
        if (mode === "Add") {
            console.log(node)
            setNodes((e) =>
                e.concat(node)
            );
        } else {
            setNodes((nds) =>
                nds.map((n) => {
                    if (n.id === node.id) {
                        n = node
                    }
                    return n;
                })
            );
        }
        setOpenModalNode(false);
    }

    const deleteNode = (nodeId) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId))
        setOpenModalNode(false);
    }

    // Modal Export
    const [jsonData, setJsonData] = useState("")
    const [openModalExport, setOpenModalExport] = useState(false);
    const onExportModal = () => {
        setJsonData(JSON.stringify(rfInstance.toObject()));
        setOpenModalExport(true);

        // const nodes = flow.nodes;
        // const edges = flow.edges;
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
    }

    const onCloseModalExport = () => {
        setOpenModalExport(false);
    }

    // Modal Edge Custom
    const saveEdgeParam = (edgeId, edgeParam) => {
        setEdges((eds) =>
            eds.map((e) => {
                if (e.id === edgeId) {
                    e.data.edgeParam = edgeParam
                }
                return e;
            })
        );

    }



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
                <Button variant="primary" onClick={onAddNodeClick}>
                    <BiIcons.BiPlusCircle /> Add Node
                </Button>
                <Button variant="primary" onClick={onExportModal}>
                    <BiIcons.BiExport /> Export JSON
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Seesion
                </Button>
                <Button variant="primary" onClick={onRestore}>
                    <BiIcons.BiHistory /> Restore
                </Button>

            </div>
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
            <ModalNode
                onCloseModalNode={onCloseModalNode}
                generateFloeNodeID={generateFloeNodeID}
                saveNode={saveNode}
                deleteNode={deleteNode}
                showModalNode={openModalNode}
                flowId={flow_id}
                nodeModel={nodeModel}
                modeNodeModal={modeNodeModal}
            />
            <ExportModal
                showModalExport={openModalExport}
                onCloseModalExport={onCloseModalExport}
                jsonData={jsonData}
            />
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <Decision />
    </ReactFlowProvider>
);
