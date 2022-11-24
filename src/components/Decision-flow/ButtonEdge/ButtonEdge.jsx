import React, { useState } from "react";
import { getBezierPath } from 'reactflow';
import ModalEdge from '../Modal/Edge/EdgeModal'

import * as BiIcons from 'react-icons/bi'

import './ButtonEdge.css';

const foreignObjectSize = 40;

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
	source,
	target,
	data,
}) {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});


	const [openModal, setOpenModal] = useState(false);
	const [idEdge, setIdEdge] = useState('');
	const onEdgeClick = (evt, id) => {
		setIdEdge(id)
		setOpenModal(true);
	};

	const onCloseModalEdge = () => {
		console.log(data)
		setOpenModal(false);
	}

	const onSaveEdgeParam = (edgeParam) =>{
		data.functionName(id,edgeParam)
		setOpenModal(false);
	}

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<foreignObject
				width={foreignObjectSize}
				height={foreignObjectSize}
				x={labelX - foreignObjectSize / 2}
				y={labelY - foreignObjectSize / 2}
				className="edgebutton-foreignobject"
				requiredExtensions="http://www.w3.org/1999/xhtml"
			>
				<button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
					<BiIcons.BiEdit />
				</button>
			</foreignObject>
			<div>
				<ModalEdge
					cModal={onCloseModalEdge}
					onSaveEdgeParam={onSaveEdgeParam}
					showModalEdge={openModal}
					idEdge={idEdge}
					edgeParam={data.edgeParam}
					sourceNode={source}
					targetNode={target}
				/>
			</div>
		</>
	);
}