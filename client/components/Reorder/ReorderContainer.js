'use strict';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from 'APP/client/components/Reorder/ReorderCard'
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import update from 'immutability-helper';
import { List } from 'immutable';
import { updateOrder } from 'APP/client/store/reducers/order';
import {
  CLASS_NAME_OBJ
} from 'APP/client/components/HierarchyControl/CardTypes';
import acceptedDrop from 'APP/client/components/Reorder/CardConstants';
import { changeParent } from 'APP/client/store/actions/changeParent';

const getItemType = (props) => {
	return props.type;
}

const cardTarget = {
	drop() {},
}

function collect(connect, monitor) {
  return {
		connectDropTarget: connect.dropTarget(),
  };
}

class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
		this.findCard = this.findCard.bind(this)
		const { handleOrder, type, thumbs } = props;
		const startingOrder = { type, list: thumbs }
		handleOrder(startingOrder);
		this.state = {
			thumbs: thumbs
		}
	}

	static getDerivedStateFromProps(nextProps, state){
    if (nextProps.thumbs.size !== state.thumbs.size) {
      nextProps.handleOrder({type: nextProps.type, list: nextProps.thumbs});
      return {
        thumbs: nextProps.thumbs
      };
    }
    return null;
  }

	moveCard(id, atIndex) {
		const { type, handleOrder, order } = this.props;
		const { card, index } = this.findCard(id)
		const reordered = order.get(type).delete(index).insert(atIndex, card)
		const updateObj = { type, list: reordered };
		handleOrder(updateObj);
	}

	findCard(id) {
		const { order, type } = this.props
		const cards = order.get(type);
		const card = cards.find(c => c.get('id') === id);
		
		return {
			card,
			index: cards.indexOf(card),
		}
	}

	render() {
		const { connectDropTarget, type, order, index } = this.props;
		const cards = order.get(type) || List([]);
		return connectDropTarget(
				<div id={`${type}-reorder-container`} className='subContainer'>
				{cards.map((card, idx) => (
					<div key={idx} id={`reorder-${type}-${idx}`}><Card
						accepts={acceptedDrop[type]}
						canDrag={type !== 'PROJECT_TYPE'}
						{...this.props}
						card={card}
						key={card.get('id')}
						id={card.get('id')}
						text={card.get('body')}
						moveCard={this.moveCard}
						findCard={this.findCard}
					/>
					</div>
				))}
				</div>
		)
	}
}

const mapDispatch = dispatch => ({
	handleOrder(updateObj){
		dispatch(updateOrder(updateObj))
	},
	handleChangeParent(updateObj){
		dispatch(changeParent(updateObj))
	}
});

const ContainerTarget = DropTarget((props) => {return props.type}, cardTarget, collect)(Container);
const ContainerContext = DragDropContext(HTML5Backend)(ContainerTarget);
export default connect(null, mapDispatch)(LoaderHOC('thumbs')(ContainerContext));
