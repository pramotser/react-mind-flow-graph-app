// import { createProxyMiddleware } from "http-proxy-middleware";
// module.exports = function (app) {
//     app.use(
//         '/NAOS/FlowManagementService',
//         createProxyMiddleware({
//             target: 'http://localhost:8080',
//             changeOrigin: true,
//         })
//     );
//     app.use(
//         '/NAOS/DecisionFunctionService',
//         createProxyMiddleware({
//             target: 'http://10.202.104.25',
//             changeOrigin: true,
//         })
//     );
// }
// import ApiConfig from './config/api-config' assert {type: 'json'};

const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        '/NAOS/FlowManagementService',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/NAOS/DecisionFunctionService',
        createProxyMiddleware({
            target: 'http://10.202.104.25',
            changeOrigin: true,
        })
    );
};