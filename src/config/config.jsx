export const Config = {
    NodeType: {
        DECISION: 'DECISION',
        FUNCTION: 'FUNCTION',
        SUBFLOW: 'SUBFLOW',
        START: 'START',
        END: 'END',
    },
    NodeTypeOption: [
        { value: 'DECISION', label: 'Decision' },
        { value: 'FUNCTION', label: 'Function' },
        { value: 'SUBFLOW', label: 'Subflow' }
    ],
    EdgeConditionOption: [
        { value: 'OR', label: 'Or' },
        { value: 'AND', label: 'And' }
    ],
    EdgeParamConditionOption: [
        { value: "ISNOTNULL", label: "ISNOTNULL", data: { type: "STRING" } },
        { value: "ISNULL", label: "ISNULL", data: { type: "STRING" } },
        { value: "EQUALS", label: "EQUALS", data: { type: "STRING" } },
        { value: "NOTEQUALS", label: "NOTEQUALS", data: { type: "STRING" } },
        { value: "CONTAIN", label: "CONTAIN", data: { type: "STRING" } },
        { value: "LIKE", label: "LIKE", data: { type: "STRING" } },
        { value: "==", label: "==", data: { type: "DOUBLE" } },
        { value: ">", label: ">", data: { type: "DOUBLE" } },
        { value: ">=", label: ">=", data: { type: "DOUBLE" } },
        { value: "<", label: "<", data: { type: "DOUBLE" } },
        { value: "<=", label: "<=", data: { type: "DOUBLE" } },
        { value: "between", label: "between", data: { type: "DOUBLE" } },
        { value: "notbetween", label: "notbetween", data: { type: "DOUBLE" } }
    ],
    Mode: {
        ADD: {
            value: "ADD",
            label: "Add"
        },
        EDIT: {
            value: "EDIT",
            label: "Edit"
        },
        VIEW: {
            value: "VIEW",
            label: "View"
        },
        DELETE: {
            value: "DELETE",
            label: "Eelete"
        },
    },
    FormatDate: 'dd/MM/yyyy',
    FormatDatetime: 'dd/MM/yyyy HH:mm',
    MethodType: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    FunctionRefOption: [
        { value: "naosNCBChecking", label: "naosNCBChecking" },
        { value: "naosKKDebtChecking", label: "naosKKDebtChecking" },
        { value: "naosCustomerHistory", label: "naosCustomerHistory" },
        { value: "naosBlacklistChecking", label: "naosBlacklistChecking" },
        { value: "hasKKAccrued12Aging", label: "hasKKAccrued12Aging" },
        { value: "findMinByLoanAmtCapMinAndLoanAmountCAPPercent", label: "findMinByLoanAmtCapMinAndLoanAmountCAPPercent" },
        { value: "findMinByLoanAmtCapAndMaxUnsecuredLoanLine", label: "findMinByLoanAmtCapAndMaxUnsecuredLoanLine" },
        { value: "findMaxByLoanAmtCapMinAndMaxUnsecuredLoanLine", label: "findMaxByLoanAmtCapMinAndMaxUnsecuredLoanLine" },
        { value: "check60DPD", label: "check60DPD" },
        { value: "calRecommendLimit", label: "calRecommendLimit" },
        { value: "calLoanAmtByCustEMI", label: "calLoanAmtByCustEMI" },
        { value: "calLoanAmtByCustDBR", label: "calLoanAmtByCustDBR" },
        { value: "calEstablishDateRoundDown", label: "calEstablishDateRoundDown" },
        { value: "calDBRBefore", label: "calDBRBefore" },
        { value: "calDBRAfter", label: "calDBRAfter" },
        { value: "calCarAgeSumTenorRoundUp", label: "calCarAgeSumTenorRoundUp" },
        { value: "calApprovedLimit", label: "calApprovedLimit" },
        { value: "calAggregateLimit", label: "calAggregateLimit" },
        { value: "calAgeSumTenorRoundUp", label: "calAgeSumTenorRoundUp" },
        { value: "calAgeRoundDown", label: "calAgeRoundDown" },
    ],
    DropdownType: {
        FLOW_LIST: "FLOW_LIST",
        RESULT_PARAM_LIST: "RESULT_PARAM_LIST",
        UNIVERSAL_FIELD_LIST: "UNIVERSAL_FIELD_LIST",
    },
    ActiveFlag: {
        Y: 'Y',
        N: 'N'
    },
    HeaderCallAPI: {
        FlowManagementService: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

}

// export const HeaderCallAPI = {
//     FlowManagementService: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     }
// }

// export const MethodType = {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//     DELETE: 'DELETE'
// }


// export const functionRefOption = [
//     { value: "naosNCBChecking", label: "naosNCBChecking" },
//     { value: "naosKKDebtChecking", label: "naosKKDebtChecking" },
//     { value: "naosCustomerHistory", label: "naosCustomerHistory" },
//     { value: "naosBlacklistChecking", label: "naosBlacklistChecking" },
//     { value: "hasKKAccrued12Aging", label: "hasKKAccrued12Aging" },
//     { value: "findMinByLoanAmtCapMinAndLoanAmountCAPPercent", label: "findMinByLoanAmtCapMinAndLoanAmountCAPPercent" },
//     { value: "findMinByLoanAmtCapAndMaxUnsecuredLoanLine", label: "findMinByLoanAmtCapAndMaxUnsecuredLoanLine" },
//     { value: "findMaxByLoanAmtCapMinAndMaxUnsecuredLoanLine", label: "findMaxByLoanAmtCapMinAndMaxUnsecuredLoanLine" },
//     { value: "check60DPD", label: "check60DPD" },
//     { value: "calRecommendLimit", label: "calRecommendLimit" },
//     { value: "calLoanAmtByCustEMI", label: "calLoanAmtByCustEMI" },
//     { value: "calLoanAmtByCustDBR", label: "calLoanAmtByCustDBR" },
//     { value: "calEstablishDateRoundDown", label: "calEstablishDateRoundDown" },
//     { value: "calDBRBefore", label: "calDBRBefore" },
//     { value: "calDBRAfter", label: "calDBRAfter" },
//     { value: "calCarAgeSumTenorRoundUp", label: "calCarAgeSumTenorRoundUp" },
//     { value: "calApprovedLimit", label: "calApprovedLimit" },
//     { value: "calAggregateLimit", label: "calAggregateLimit" },
//     { value: "calAgeSumTenorRoundUp", label: "calAgeSumTenorRoundUp" },
//     { value: "calAgeRoundDown", label: "calAgeRoundDown" },
// ]

// "/Param/naosNCBChecking"
// "/Param/naosKKDebtChecking"
// "/Param/naosCustomerHistory"
// "/Param/naosBlacklistChecking"
// "/Param/hasKKAccrued12Aging"
// "/Param/findMinByLoanAmtCapMinAndLoanAmountCAPPercent"
// "/Param/findMinByLoanAmtCapAndMaxUnsecuredLoanLine"
// "/Param/findMaxByLoanAmtCapMinAndMaxUnsecuredLoanLine"
// "/Param/check60DPD"
// "/Param/calRecommendLimit"
// "/Param/calLoanAmtByCustEMI"
// "/Param/calLoanAmtByCustDBR"
// "/Param/calEstablishDateRoundDown"
// "/Param/calDBRBefore"
// "/Param/calDBRAfter"
// "/Param/calCarAgeSumTenorRoundUp"
// "/Param/calApprovedLimit"
// "/Param/calAggregateLimit"
// "/Param/calAgeSumTenorRoundUp"
// "/Param/calAgeRoundDown"