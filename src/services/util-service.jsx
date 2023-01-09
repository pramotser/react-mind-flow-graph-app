import ApiConfig from "../config/api-config.json"
import { ActiveFlag, HeaderCallAPI, MethodType } from "../config/config"
import { isNullOrUndefined } from "../util/Util"

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

export async function getParamListByFunctionRef(functionRefName, flagShowCode) {
    try {
        return fetch(ApiConfig.Service.DecisionFunctionService.MainPath + '/Param/' + functionRefName,
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
                return {
                    responseObject: response.returnJsonParamList.map((jsonParam) => {
                        return {
                            value: jsonParam.flowNodeEdgeParam, label: (isNullOrUndefined(flagShowCode) && flagShowCode === ActiveFlag.Y)
                                ? jsonParam.flowNodeEdgeParam + " : " + jsonParam.flowNodeEdgeParam
                                : jsonParam.flowNodeEdgeParam, data: {
                                    universalFieldType: jsonParam.flowNodeEdgeType
                                }
                        };
                    })
                }
            })
    } catch (error) {
        return []
    }
}
