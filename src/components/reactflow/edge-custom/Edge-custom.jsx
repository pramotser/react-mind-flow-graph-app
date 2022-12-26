import React, { useState } from "react";
import { getBezierPath } from 'reactflow';
// import ModalEdge from '../../modal/edge/Edge-modal'


import EdgeModal from '../../modal/edge/Edge-modal'

import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'

import './edge-custom.scss';

const foreignObjectSize = 40;

export default function EdgeCustom({
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

	const [openModalEdge, setOpenModalEdge] = useState(false);
	const [idEdge, setIdEdge] = useState('');
	const onEdgeClick = (evt, id) => {
		// console.log('data.nodeStart : ',data.nodeStart)
		// console.log('source : ',source)
		// console.log('Number.parseInt(source) === Number.parseInt(data.nodeStart) :' ,Number.parseInt(source) === Number.parseInt(data.nodeStart))
		setIdEdge(id)
		setOpenModalEdge(true);
	};

	const onCloseModalEdge = () => {
		setOpenModalEdge(false);
	}

	const onSaveEdgeParam = (edgeParam) => {
		data.function.saveEdgeParam(id, edgeParam)
		setOpenModalEdge(false);
	}

	const onDeleteEdge = (edgeId) => {
		data.function.deleteEdge(edgeId)
		setOpenModalEdge(false);
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
				{
					(Number.parseInt(source) === Number.parseInt(data.nodeStart)) ?
						<button
							className='edgebutton'
							onClick={(event) => onDeleteEdge(id)}
						>
							<AiIcons.AiOutlineClose />
						</button>
						:
						<button
							className="edgebutton"
							onClick={(event) => onEdgeClick(event, id)}
						>
							<BiIcons.BiEdit />
						</button>
				}
			</foreignObject>
			<div>
				<EdgeModal
					cModal={onCloseModalEdge}
					onSaveEdgeParam={onSaveEdgeParam}
					onDeleteEdge={onDeleteEdge}
					showModalEdge={openModalEdge}
					idEdge={idEdge}
					edgeParam={data.edgeParam}
					sourceNode={source}
					targetNode={target}
				/>
			</div>
		</>
	);
}