import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { getStyleHeaderNode } from '../../../util/Util'

import './CustomNode.css'

function CustomNode({ id, data }) {
    const customNodeHeaderStyle = getStyleHeaderNode(data.nodeType);
    // let nodeType = getNodeTypeObject(data.nodeType);
    return (
        <>
            <Handle type="target" hidden={(data.nodeType === 'START')} position={Position.Top} />
            <div className="custom-node__header" style={customNodeHeaderStyle}>
                <strong>
                    {(data.nodeType !== 'START' && data.nodeType !== 'END') ? 'New Node' : data.nodeType}
                </strong>
            </div>
            <div className="custom-node__body" hidden={(data.nodeType !== 'END')}>
                <strong>Result: </strong>{((data.result === '') ? '' : data.result)}
                <br />
                <strong>Remark:</strong>{((data.remark === '') ? '' : data.remark)}
            </div>
            <div className="custom-node__body" hidden={(data.nodeType === 'START' || data.nodeType === 'END')}>
                <strong>Node Name: </strong>{data.nodeName}
            </div>
            <Handle type="source" hidden={(data.nodeType === 'END')} position={Position.Bottom} />
        </>
    );
}
export default memo(CustomNode);
