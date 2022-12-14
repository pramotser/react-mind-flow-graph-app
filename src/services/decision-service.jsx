import { tempDataFlow, tempDataResultParam } from "../assets/data/datasource"

export async function getResultParamList() {
    try {
        return tempDataResultParam;
    } catch (error) {
        return []
    }
}

export async function getFlowList() {
    try {
        return tempDataFlow;
    } catch (error) {
        return []
    }
}


export async function getFlowByCondition(flowName) {
    try {
        return (flowName === '') ? tempDataFlow : tempDataFlow.filter((flow) => flow.flowName.toLowerCase().includes(flowName.toLowerCase()));
    } catch (error) {
        return []
    }
}