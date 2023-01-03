export async function getDropdownByType(dropdownType, showCode) {
    try {
        return fetch('/NAOS/FlowManagementService/dropdown/getList',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dropdown_type': dropdownType,
                    'show_code': showCode
                },
            })
            .then(res => res.json())
            .then(response => {
                return response
            })
    } catch (error) {
        return []
    }
}