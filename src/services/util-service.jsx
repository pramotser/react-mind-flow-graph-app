import ApiConfig from "../config/api-config.json"
import { HeaderCallAPI, MethodType } from "../config/config"

export async function getDropdownByType(dropdownType, flagShowCode) {
    try {
        return fetch(ApiConfig.Service.FlowManagementService.MainPath + '/dropdown/getListByCondition',
            {
                headers: HeaderCallAPI.FlowManagementService,
                method: MethodType.POST,
                body: JSON.stringify({
                    dropdownType: dropdownType,
                    flagShowCode: flagShowCode,
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

export async function testGet() {
    try {
        return fetch(ApiConfig.Service.DecisionFunctionService.MainPath + '/Param/naosNCBChecking',
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
                console.log('response :',response);
                return response
            })
    } catch (error) {
        return []
    }
}
