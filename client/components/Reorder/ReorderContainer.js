'use strict';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { CardDragDrop as Card } from 'APP/client/components/Reorder/ReorderCard'
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import update from 'immutability-helper';
import { List } from 'immutable';
import {
  CLASS_NAME_OBJ
} from 'APP/client/components/HierarchyControl/CardTypes';
import acceptedDrop from 'APP/client/components/Reorder/CardConstants';

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
		const { handleOrder, type, thumbs, navigator } = props;
		const startingOrder = { type, list: thumbs }
		handleOrder(startingOrder);
		this.state = {
			thumbs: thumbs,
			navigator: navigator
		}
	}

	static getDerivedStateFromProps(nextProps, state){
    if (nextProps.thumbs.size !== state.thumbs.size || nextProps.navigator !== state.navigator) {
      nextProps.handleOrder({type: nextProps.type, list: nextProps.thumbs});
      return {
				thumbs: nextProps.thumbs,
				navigator: nextProps.navigator
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
		console.log('rendered');
		const { 
			connectDropTarget,
			handleChangeParent,
			handleOrder,
			type,
			order,
			index,
			user,
			navigator,
			handleNavigation,
			handleHotSeat,
			parent 
		} = this.props;
		const cards = order.get(type) || List([]);
		console.log('parent', parent);
		return connectDropTarget(
				<div id={`${type}-reorder-container`} className='subContainer'>
				{cards.map((card, idx) => {
					console.log(card);
					return (
					<div key={idx} id={`reorder-${type}-${idx}`}>
						<Card
							type={card.get('type')}
							accepts={acceptedDrop[type]}
							canDrag={type !== 'PROJECT_TYPE'}
							userId={user.get('id')}
							parent={parent}
							body={card.get('body')}
							title={card.get('title')}
							key={card.get('id')}
							id={card.get('id')}
							handleChangeParent={handleChangeParent}
							handleOrder={handleOrder}
							handleHotSeat={handleHotSeat}
							handleNavigation={handleNavigation}
							currentNavId={navigator.get(type)}
							projectId={navigator.get('PROJECT_TYPE')}
							moveCard={this.moveCard}
							findCard={this.findCard}
						/>
					</div>
				)})}
				</div>
		)
	}
}

const ContainerTarget = DropTarget((props) => {return props.type}, cardTarget, collect)(Container);
const ContainerContext = DragDropContext(HTML5Backend)(ContainerTarget);
const LoadingReorderContainer = LoaderHOC('thumbs')(ContainerContext);
export default LoadingReorderContainer;
