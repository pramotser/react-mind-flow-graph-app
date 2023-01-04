export async function getFlowByCondition(flowName) {
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

export async function createFlow(createFlow) {
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

export async function updateFlow(flow) {
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
export async function deleteFlow(flow) {
    try {
        return fetch('/NAOS/FlowManagementService/flow/deleteFlow',
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

export async function testGet() {
    try {
        return fetch('http://10.202.104.25/NAOS/DecisionFunctionService/Param/naosNCBChecking',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                },
                method: 'POST',
            })
            .then(res => res.json())
            .then((response) => {
                return response
            })
    } catch (error) {
        return []
    }
}