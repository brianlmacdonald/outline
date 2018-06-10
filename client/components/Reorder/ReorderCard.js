import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { DragSource, DropTarget, DropTargetMonitor } from 'react-dnd'
import 'APP/client/components/Thumbnail/Thumbnail.css';
import validTypes from 'APP/client/components/Reorder/CardConstants';


const draggedStyler = (bool) => {
  if (bool) return 'dragging ';
  else return '';
};

const selectedStyler = (id, activeId) => {
  if (id === activeId) return 'thumbnail selected';
  else return 'thumbnail unSelected';
};

const cardSource = {
	beginDrag(props, monitor) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
			type: props.type,
			parent: props.parent,
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()
		const changeParentRequest =  monitor.getDropResult();

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex);
		}

		if (changeParentRequest.id) {
			if(window.confirm(`Move ${props.type} to ${changeParentRequest.type}`))
			props.handleChangeParent({
				type: props.type,
				id: droppedId,
				newParentId: changeParentRequest.id,
				projectId: props.navigator.get('PROJECT_TYPE'),
				userId: props.user.get('id')
			})
		}
	},

	canDrag(props, monitor) {
		return props.canDrag;
	},

}

const cardTarget = {
	canDrop(props, monitor) {
		if (props.type !== monitor.getItem().type) return true;
		else return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (props.type === monitor.getItem().type) {
			if (draggedId !== overId) {
				const { index: overIndex } = props.findCard(overId)
				props.moveCard(draggedId, overIndex)
			}
		} 
	},
	drop(props, monitor) {
		if (props.id !== monitor.getItem().parent.id) {
			return {id: props.id, type: props.type};
		}
	}
} 

function dragCollect(connect, monitor){
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

function dropCollect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
		findCard: PropTypes.func.isRequired,
		canDrag: PropTypes.bool.isRequired
	}

	render() {
		const {
			navigator,
			type,
			card,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
    const body = card.get('body');
    const title = card.get('title');
    const id = card.get('id');
    const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
		const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
		const selected = selectedStyler(id, navigator.get(type));
		const dragged = draggedStyler(isDragging);

		return connectDragSource(
			connectDropTarget(
				<div title={body}
					className={dragged + selected}
					key={id + 'd'}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev || ''}</p>
        </div>
			),
		)
	}
}

const CardDrag = DragSource((props) => {return props.type}, cardSource, dragCollect)(Card);
const CardDrop = DropTarget((props) => {return props.accepts}, cardTarget, dropCollect)(CardDrag);
export default CardDrop;
