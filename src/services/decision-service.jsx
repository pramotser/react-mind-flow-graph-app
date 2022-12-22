async function getFlowByCondition(flowName) {
    try {
        return fetch('/NAOS/FlowManagementService/flow/getFlowListByCondition',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    flowName: flowName,
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

async function createFlow(createFlow) {
    try {
        return fetch('/NAOS/FlowManagementService/flow/createFlow',
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

async function updateFlow(flow) {
    try {
        return fetch('/NAOS/FlowManagementService/flow/updateFlow',
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


export {
    getFlowByCondition,
    createFlow,
    updateFlow
}