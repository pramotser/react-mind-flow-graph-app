export const initialNodes = [
    {
        width: 180,
        height: 33,
        id: "619000",
        type: "custom",
        position: {
            x: 250,
            y: 5
        },
        data: {
            label: "Start",
            nodeType: "START",
            flowNodeId: "619",
            flowId: "619000",
            nodeName: "",
            subFlowId: "",
            functionRef: "",
            functionRefParam: "",
            defaultParam: "",
            result: "",
            remark: ""
        },
        positionAbsolute: {
            x: 250,
            y: 5

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
        { value: '<=', label: '<=' },
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