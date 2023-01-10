import React, { useState, useCallback } from "react";
import { getBezierPath, useStore } from 'reactflow'

import EdgeModal from '../../modal/edge/Edge-modal'

import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'

import './edge-custom.scss';
import { useEffect } from "react";
import { Config } from "../../../config/config";
import Swal from "sweetalert2";
import { getDropdownByType } from "../../../services/util-service";

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
	const {
		saveEdgeParam,
		deleteEdge,
		setLoadingPages
	} = data.function;
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});
	const sourceNodeDetail = useStore(
		useCallback((store) => store.nodeInternals.get(source), [source])
	);
	const edgeConnectTarget = useStore(
		useCallback((store) => store.edges.filter((edge) => edge.target === target))
	);
	const targetNodeDetail = useStore(
		useCallback((store) => store.nodeInternals.get(target), [target])
	);

	useEffect(() => {
		if (Config.NodeType.END === targetNodeDetail['data']['nodeType']) {
			if (edgeConnectTarget.length > 1) {
				Swal.fire({
					icon: 'warning',
					title: 'Duplicate result node!',
					text: 'Result Nodes cannot be used together.',
					showCancelButton: false,
				}).then(() => {
					deleteEdge(id)
				})
			}
		}
	}, [])



	const [openModalEdge, setOpenModalEdge] = useState(false);
	const [idEdge, setIdEdge] = useState('');
	const onEdgeClick = (evt, id) => {
		setIdEdge(id)
		setOpenModalEdge(true);
	};

	const onCloseModalEdge = () => {
		setOpenModalEdge(false);
	}

	const onSaveEdgeParam = (edgeParam) => {
		saveEdgeParam(id, edgeParam)
		setOpenModalEdge(false);
	}

	const onDeleteEdge = (edgeId) => {
		deleteEdge(edgeId)
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
					setLoadingPages={setLoadingPages}
					cModal={onCloseModalEdge}
					onSaveEdgeParam={onSaveEdgeParam}
					onDeleteEdge={onDeleteEdge}
					showModalEdge={openModalEdge}
					idEdge={idEdge}
					nodeStart={data.nodeStart}
					edgeParam={data.edgeParam}
					sourceNode={source}
					sourceNodeDetail={sourceNodeDetail}
					targetNode={target}
				/>
			</div>
		</>
	);
}