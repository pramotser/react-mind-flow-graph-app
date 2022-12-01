import {
    nodeTypeOption,
    stepOption,
    edgeConditionOption,
    edgeTypeOption,
    edgeParamConditionOption
} from '../config/DataConfig'
export const getNodeTypeObject = (nodeType) => (nodeTypeOption.filter((nto) => nto.value === nodeType))

export const getStepObject = (step) => (stepOption.filter((so) => so.value === step))

export const getEdgeConditionOptionObject = (edgeCondition) => (edgeConditionOption.filter((eco) => eco.value === edgeCondition))

export const getEdgeTypeOptionObject = (edgeType) => (edgeTypeOption.filter((eto) => eto.value === edgeType))

export const getEdgeParamConditionOptionObject = (edgeParamCondition) => (edgeParamConditionOption.filter((epco) => epco.value === edgeParamCondition))