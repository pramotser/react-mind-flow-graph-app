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
