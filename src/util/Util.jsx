import { Config, } from '../config/config'
import { format } from 'date-fns'

export const isNullOrUndefined = (value) => value === undefined || value == null || value.length <= 0;

export const setLoading = (loading) => loading;

export const convertFormatDate = (date, formatDate) => date !== null && date !== undefined ? format(new Date(date), formatDate) : undefined;

function getColorNodeType(nodeType) {
    if (nodeType === Config.NodeType.START) {
        return {
            color: "#664d03",
            backgroundColor: "#fff3cd",
            borderColor: "#ffecb5",
        }
    } else if (nodeType === Config.NodeType.END) {
        return {
            color: "#055160",
            backgroundColor: "#cff4fc",
            borderColor: "#b6eff",
        }
    } else if (nodeType === Config.NodeType.FUNCTION) {
        return {
            color: "#084298",
            backgroundColor: "#cfe2ff",
            borderColor: "#b6d4fe",
        }
    } else if (nodeType === Config.NodeType.DECISION) {
        return {
            color: "#0f5132",
            backgroundColor: "#d1e7dd",
            borderColor: "#badbcc",
        }
    } else if (nodeType === Config.NodeType.SUBFLOW) {
        return {
            color: "#842029",
            backgroundColor: "#f8d7da",
            borderColor: "#f5c2c7",
        }
    }
    else {
        return {
            color: "#141619",
            backgroundColor: "#d3d3d4",
            borderColor: "#bcbebf",
        }
    }
}

function getStyleHeaderNode(nodeType) {
    if (nodeType === Config.NodeType.START) {
        return {
            backgroundColor: '#fff3cd',
            color: '#664d03',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #ffecb5',
            borderRadius: '10px 10px 10px 10px',
        }
    } else if (nodeType === Config.NodeType.END) {
        return {
            backgroundColor: '#cff4fc',
            color: '#055160',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #b6effb',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }
    } else if (nodeType === Config.NodeType.FUNCTION) {
        return {
            backgroundColor: '#cfe2ff',
            color: '#084298',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #b6d4fe',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }
    } else if (nodeType === Config.NodeType.DECISION) {
        return {
            backgroundColor: '#d1e7dd',
            color: '#0f5132',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #badbcc',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }
    } else if (nodeType === Config.NodeType.SUBFLOW) {
        return {
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #f5c2c7',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }
    }
    else {
        return {
            backgroundColor: '#d3d3d4',
            color: '#141619',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid #bcbebf',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        }
    }
}
////  migate
export const getNodeTypeObject = (nodeType) => (Config.NodeTypeOption.filter((nto) => nto.value === nodeType))

export const getEdgeConditionOptionObject = (edgeCondition) => (Config.EdgeConditionOption.filter((eco) => eco.value === edgeCondition))

export const getEdgeParamConditionOptionObject = (edgeParamCondition) => (Config.EdgeParamConditionOption.filter((epco) => epco.value === edgeParamCondition))

export { getColorNodeType, getStyleHeaderNode }