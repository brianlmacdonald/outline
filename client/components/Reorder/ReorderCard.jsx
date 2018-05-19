import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import '../Thumbnail/Thumbnail.css';

const draggedStyler = (bool) => {
  if (bool) return 'thumbnail dragging';
  else return 'thumbnail';
};

const getItemType = (props) => {
	return props.type;
}

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
    const body = card.get('body');
    const title = card.get('title');
    const id = card.get('id');
    const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
    const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;

		return connectDragSource(
			connectDropTarget(
				<div title={body} className={draggedStyler(isDragging)} key={id + 'd'}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev || ''}</p>
        </div>
			),
		)
	}
}

const CardDrag = DragSource((props) => {return props.type}, cardSource, dragCollect)(Card);
const CardDrop = DropTarget((props) => {return props.type}, cardTarget, dropCollect)(CardDrag);
export default CardDrop;
