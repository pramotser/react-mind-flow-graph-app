export const initialNodes = [
    {
        width: 180,
        height: 33,
        id: '',
        type: "custom",
        position: {
            x: 1000,
            y: 1000
        },
        data: {
            label: "Start",
            nodeType: "START",
            flowNodeId: '',
            flowId: "",
            nodeName: "",
            subFlowId: "",
            functionRef: "",
            functionRefParam: "",
            defaultParam: "",
            result: "",
            remark: ""
        },
        positionAbsolute: {
            x: 1000,
            y: 1000
        }
    }
];

export const initialEdges = [

];


export const nodeTypeOption = [
    { value: 'DECISION', label: 'Decision' },
    { value: 'FUNCTION', label: 'Function' },
    { value: 'SUBFLOW', label: 'Subflow' }
]
export const stepOption = [
    { value: 'NEXT', label: 'Next' },
    { value: 'OUT', label: 'Out' },
    { value: 'END', label: 'End' }
]

export const edgeConditionOption = [
    { value: 'OR', label: 'Or' },
    { value: 'AND', label: 'And' }
]
export const edgeTypeOption = [
    { value: 'STRING', label: 'String' },
    { value: 'DOUBLE', label: 'Double' }
]
export const edgeParamConditionOption =
    [
        { value: 'EQUALS', label: 'EQUALS' },
        { value: '<=', label: 'Double :<=' },
        { value: '<', label: '<' },
        { value: 'NOTEQUALS', label: 'NOTEQUALS' },
        { value: '>=', label: '>=' },
        { value: 'LIKE', label: 'LIKE' },
        { value: '>', label: '>' },
        { value: 'ISNULL', label: 'ISNULL' },
        { value: '==', label: '==' },
        { value: 'ISNOTNULL', label: 'ISNOTNULL' },
        { value: 'CONTAIN', label: 'CONTAIN' },
    ]
export const edgeParamConditionOptionNew = [
    { value: "ISNOTNULL", label: "ISNOTNULL", data: { type: "STRING" } },
    { value: "ISNULL", label: "ISNULL", data: { type: "STRING" } },
    { value: "EQUALS", label: "EQUALS", data: { type: "STRING" } },
    { value: "NOTEQUALS", label: "NOTEQUALS", data: { type: "STRING" } },
    { value: "CONTAIN", label: "CONTAIN", data: { type: "STRING" } },
    { value: "LIKE", label: "LIKE", data: { type: "STRING" } },
    { value: "==", label: "==", data: { type: "DOUBLE" } },
    { value: ">", label: ">", data: { type: "DOUBLE" } },
    { value: ">=", label: ">=", data: { type: "DOUBLE" } },
    { value: "<", label: "<", data: { type: "DOUBLE" } },
    { value: "<=", label: "<=", data: { type: "DOUBLE" } },
    { value: "between", label: "between", data: { type: "DOUBLE" } },
    { value: "notbetween", label: "notbetween", data: { type: "DOUBLE" } }
]


export const mode = {
    add: {
        value: "ADD",
        label: "Add"
    },
    edit: {
        value: "EDIT",
        label: "Edit"
    },
    view: {
        value: "VIEW",
        label: "View"
    },
    delete: {
        value: "DELETE",
        label: "Eelete"
    },
}

export const formatDate = 'dd/MM/yyyy'
export const formatDatetime = 'dd/MM/yyyy HH:mm'

export const DropdownType = {
    FLOW_LIST: "FLOW_LIST",
    RESULT_PARAM_LIST: "RESULT_PARAM_LIST",
}