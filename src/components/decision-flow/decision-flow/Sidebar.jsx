import React from 'react';

export default (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/nodeId', props.generateFloeNodeID())
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input node-start" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        <strong>Start</strong>
      </div>
      <div className="dndnode node-new" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <strong>Node</strong>
      </div>
      <div className="dndnode output node-end" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        <strong>Result Node</strong>
      </div>
    </aside>
  );
};
