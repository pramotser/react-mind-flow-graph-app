export async function getDropdownByType(dropdownType) {
    try {
        return fetch('/NAOS/FlowManagementService/dropdown/getList',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dropdown_type': dropdownType
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