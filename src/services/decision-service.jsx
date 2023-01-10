import ApiConfig from "../config/api-config.json";

export async function getFlowByCondition(flowId) {
    try {
        return fetch(ApiConfig.Service.FlowManagementService.MainPath + '/flow/getFlowListByCondition',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    flowId: flowId,
                })
            })
            .then(res => res.json())
            .then(data => {
                return data
            })
    } catch (error) {
        return []
    }
}

export async function createFlow(createFlow) {
    try {
        return fetch(ApiConfig.Service.FlowManagementService.MainPath + '/flow/createFlow',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(createFlow)
            })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
    } catch (error) {
        return []
    }
}

export async function updateFlow(flow) {
    try {
        return fetch(ApiConfig.Service.FlowManagementService.MainPath + '/flow/updateFlow',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(flow)
            })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
    } catch (error) {
        return []
    }
}
export async function deleteFlow(flow) {
    try {
        return fetch(ApiConfig.Service.FlowManagementService.MainPath + '/flow/deleteFlow',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify(flow)
            })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
    } catch (error) {
        return []
    }
}