
async function getDropdownFlowName() {
    try {
        return fetch('/NAOS/FlowManagementService/dropdown/flowList',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(response => {
                return response.responseObject
            })
    } catch (error) {
        return []
    }
}


async function getDropdownResultParam() {
    try {
        return fetch('/NAOS/FlowManagementService/dropdown/resultParamList',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                return response.responseObject
            })
    } catch (error) {
        return []
    }
}

export {
    getDropdownFlowName,
    getDropdownResultParam
}