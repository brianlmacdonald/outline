import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes';
import 'APP/client/components/Thumbnail/Thumbnail.css';

const draggedStyler = (bool) => {
  if (bool) return 'dragging ';
  else return '';
};

const selectedStyler = (id, activeId) => {
  if (id === activeId) return 'box index-card selected';
  else return 'box index-card unselected';
};

const cardSource = {
	beginDrag(props, monitor) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
			type: props.type,
			parent: props.parent,
			card: props.card
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem();
		const didDrop = monitor.didDrop()
		const changeParentRequest =  monitor.getDropResult();

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex);
		}

		if (changeParentRequest && changeParentRequest.id) {
			if(window.confirm(`Change the parent to ${CLASS_NAME_OBJ[changeParentRequest.type]} titled: '${changeParentRequest.title}'`))
			props.handleChangeParent({
				type: props.type,
				id: droppedId,
				newParentId: changeParentRequest.id,
				projectId: props.projectId,
				userId: props.userId
			})
		}
	},
	canDrag(props, monitor){
		return props.canDrag;
	}
}

const hotSource = {
	beginDrag(props, monitor) {
		return {
			id: props.id,
			type: props.type,
			parent: props.parent,
			card: props.card
		}
	},
	endDrag(props, monitor) {
		const didDrop = monitor.didDrop()
		const changeParentRequest =  monitor.getDropResult();
		const { id: droppedId } = monitor.getItem();

		if (changeParentRequest && changeParentRequest.id) {
			if (window.confirm(`Change the parent to ${CLASS_NAME_OBJ[changeParentRequest.type]} titled: '${changeParentRequest.title}'`))
			props.handleChangeParent({
				type: props.card.get('type'),
				id: droppedId,
				newParentId: changeParentRequest.id,
				projectId: props.projectId,
				userId: props.userId
			})
		}
	},
	canDrag(props, monitor){
		return props.canDrag;
	}
}

const cardTarget = {
	canDrop(props, monitor) {
		return props.accepts[1] === monitor.getItem().card.get('type');
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
		const item = monitor.getItem();

		if (props.id !== item.parent.id) {
			return {id: props.id, type: props.type, title: props.title};
		}
	}
};

const hotTarget = {
	canDrop(props, monitor) {
		return monitor.getItem().type !== 'ACT_TYPE';
	},
	drop(props, monitor) {
		const item = monitor.getItem();
		props.handleHotSeat(item.card);
	}
} 

function dragCollect(connect, monitor){
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

function dropCollect(connect){
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
		body: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		userId: PropTypes.any.isRequired,
		moveCard: PropTypes.func.isRequired,
		findCard: PropTypes.func.isRequired,
		handleChangeParent: PropTypes.func.isRequired,
		handleOrder: PropTypes.func.isRequired,
		handleNavigation: PropTypes.func.isRequired,
		handleHotSeat: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
	}

	render() {
		const {
			body,
			title,
			id,
			type,
			isDragging,
			connectDragSource,
			connectDropTarget,
			handleNavigation,
			handleHotSeat,
			userId,
			currentNavId,
			key,
			projectId
		} = this.props

    const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
		const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
		const selected = selectedStyler(id, currentNavId);
		const dragged = draggedStyler(isDragging);

		return connectDragSource(
			connectDropTarget(
				<div title={body}
					onDoubleClick={() => handleNavigation({id, userId})}
					className={dragged + selected}
					key={key + 'd'}>
          <h4 key={key + 'h4'}>{titlePrev}</h4>
          <p key={key + 'p'}>{bodyPrev || ''}</p>
        </div>
			),
		)
	}
}

const CardDrag = DragSource((props) => {return props.type}, cardSource, dragCollect)(Card);
export const CardDragDrop = DropTarget((props) => {return props.accepts}, cardTarget, dropCollect)(CardDrag);

const HotDrag = DragSource((props) => {return props.type}, hotSource, dragCollect)(Card);
export const HotDragDrop = DropTarget((props) => {return props.accepts}, hotTarget, dropCollect)(HotDrag);
