import React, {
    // Fragment,
    useState,
    useCallback
} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    // ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './Decision-flow.css'

const flowKey = 'example-flow';


const initialNodes = [
    // { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
    // { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];

const initialEdges = [
    // { id: 'e1-2', source: '1', target: '2' }
];

const flow_id = 170;
const Decision = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const generateFloeNodeID = () => `${flow_id.toString() + nodes.length.toString().padStart(3, '0')}`
    // const generateFloeEdgeID = (running) => `${flow_id.toString() + running.toString().padStart(4, '0')}`

    const [nodeName, setNodeName] = useState("")
    const [nodeType, setNodeType] = useState("")
    const [subFlowId, setSubFlow] = useState(null)
    const [functionRef, setFunctionRef] = useState(null)
    const [functionRefParam, setFunctionRefParam] = useState(null)
    const [defaultParam, setDefaultParam] = useState(null)
    const [step, setStep] = useState(null)


    const onAdd = () => {
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
                position: { x: 0, y: 0 },
            })
        );
    };

    const onExport = () => {
        const flow = rfInstance.toObject();
        const nodes = flow.nodes;
        const edges = flow.edges;
        console.log("Node React Flow : ", nodes)
        console.log("Edge React Flow : ", edges)
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
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
        >
            <div className="save__controls">
                <button onClick={onSave}>save</button>
                <button onClick={onRestore}>restore</button>

                <button onClick={onExport}>Export Json</button>
                <button onClick={onAdd}>Add node</button>
                <br />
                <div>
                    <label>Node name : </label>
                    <input type="text"
                        onChange={e => setNodeName(e.target.value)}
                        name="nodeName" />
                    <br />
                    <label>Node type : </label>
                    <input type="text"
                        onChange={e => setNodeType(e.target.value)}
                        name="nodeType" />
                    <br />
                    <label>Subflow : </label>
                    <input type="text"
                        onChange={e => setSubFlow(e.target.value)}
                        name="subflow" />
                    <br />
                    <label>Function Ref : </label>
                    <input type="text"
                        onChange={e => setFunctionRef(e.target.value)}
                        name="functionRef" />
                    <br />

                    <label>Function Ref Param : </label>
                    <input type="text"
                        onChange={e => setFunctionRefParam(e.target.value)}
                        name="functionRefParam" />
                    <br />
                    <label>Default Param : </label>
                    <input type="text"
                        onChange={e => setDefaultParam(e.target.value)}
                        name="defaultParam" />
                    <br />
                    <label>Step ( NEXT / END / OUT ) : </label>
                    <input type="text"
                        onChange={e => setStep(e.target.value)}
                        name="step" />
                </div>
            </div>
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <Decision />
    </ReactFlowProvider>
);

