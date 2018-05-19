import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Thumbnail from '../Thumbnail/Thumbnail.jsx';

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
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
	}

	render() {
		const {
			card,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props

		return connectDragSource(
			connectDropTarget(<div><Thumbnail isDragging={isDragging} card={card} /></div>),
		)
	}
}

const CardDrag = DragSource(ItemTypes.CARD, cardSource, dragCollect)(Card);
const CardDrop = DropTarget(ItemTypes.CARD, cardTarget, dropCollect)(CardDrag);
export default CardDrop;
