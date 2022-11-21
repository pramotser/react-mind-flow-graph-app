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