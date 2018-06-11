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

		if (changeParentRequest && changeParentRequest.id) {
			if(window.confirm(`Change the parent to ${CLASS_NAME_OBJ[changeParentRequest.type]} titled: '${changeParentRequest.title}'`))
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
		return props.accepts[1] === monitor.getItem().type;
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
			return {id: props.id, type: props.type, title: props.card.get('title')};
		}
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
