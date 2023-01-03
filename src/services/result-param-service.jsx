export async function getResultParamListByCondition(resultParamName) {
    try {
        return fetch('/NAOS/FlowManagementService/resultParam/getResulParamByCondition',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    resultParamName: resultParamName,
                })
            })
            .then(res => res.json())
            .then(response => {
                return response
            })
    } catch (error) {
        return []
    }
}
export async function createResultParam(resultParam) {
    try {
        return fetch('/NAOS/FlowManagementService/resultParam/createResultParam',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(resultParam)
            })
            .then(res => res.json())
            .then((response) => {
                return response;
            })
    } catch (error) {
        return []
    }
}

export async function deleteResultParam(resultParamCode) {
    try {
        return fetch('/NAOS/FlowManagementService/resultParam/deleteResultParam',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify({
                    resultParamCode: resultParamCode,
                })
            })
            .then(res => res.json())
            .then((response) => {
                return response;
            })
    } catch (error) {
        return []
    }
}

export async function updateResultParam(resultParam) {
    try {
        return fetch('/NAOS/FlowManagementService/resultParam/updateResultParam',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(resultParam)
            })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
    } catch (error) {
        return []
    }
}