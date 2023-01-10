import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Config } from '../../../config/config';
// import { getStyleHeaderNode } from '../../decision/util/Util'
import { getStyleHeaderNode } from '../../../util/Util';

import './node-custom.scss'

function NodeCustom({ id, data }) {
    const customNodeHeaderStyle = getStyleHeaderNode(data.nodeType);
    return (
        <>
            <Handle type="target" hidden={(data.nodeType === Config.NodeType.START)} position={Position.Top} />
            <div className="custom-node__header" style={customNodeHeaderStyle}>
                <strong>
                    {(data.nodeType === '') ? 'New Node' : (data.nodeType === Config.NodeType.END) ? 'Result' : data.nodeType}
                </strong>
            </div>
            <div className="custom-node__body" hidden={(data.nodeType !== Config.NodeType.END)}>
                <strong>Result: </strong>{((data.result === '') ? '' : data.result)}
                <br />
                <strong>Remark: </strong>{((data.remark === '') ? '' : data.remark)}
            </div>
            <div className="custom-node__body" hidden={(data.nodeType === Config.NodeType.START || data.nodeType === Config.NodeType.END)}>
                <strong>Node Name: </strong>{data.nodeName}
            </div>
            <Handle type="source" hidden={(data.nodeType === Config.NodeType.END)} position={Position.Bottom} />
        </>
    );
}
export default memo(NodeCustom);
