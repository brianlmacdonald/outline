'use strict';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { CardDragDrop as Card, HotDragDrop } from 'APP/client/components/Reorder/ReorderCard'
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import update from 'immutability-helper';
import { List } from 'immutable';
import {
  CLASS_NAME_OBJ
} from 'APP/client/components/HierarchyControl/CardTypes';
import acceptedDrop from 'APP/client/components/Reorder/CardConstants';
import 'APP/client/components/Container/Container.css'

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
			parent,
			draft
		} = this.props;
		const cards = order.get(type) || List([]);

		if (type === 'PROJECT_TYPE') {
			return connectDropTarget(
				<div id={`hot-seat-reorder-container`} className='hot-seat-container column'>
				<div id={`reorder-hot-seat`}>
					<HotDragDrop
						card={draft}
						type={'HOT_SEAT'}
						accepts={acceptedDrop[type]}
						canDrag={!!draft.get('type')}
						userId={user.get('id')}
						parent={parent || {}}
						body={draft.get('body') || 'to access nested parent'}
						title={draft.get('title') || 'drag card here'}
						key={draft.get('id') || user.get('id')}
						id={draft.get('id') || user.get('id')}
						handleChangeParent={handleChangeParent}
						handleOrder={handleOrder}
						handleHotSeat={handleHotSeat}
						handleNavigation={handleNavigation}
						currentNavId={navigator.get(type)}
						projectId={navigator.get('PROJECT_TYPE') || user.get('id')}
						moveCard={this.moveCard}
						findCard={this.findCard}
					/>
					</div>
		  	</div>)

		}
	 
		return connectDropTarget(
				<div id={`${type}-reorder-container`} className='column columns sub-container'>
				{cards.map((card, idx) => {
					return (
					<div key={idx} id={`reorder-${type}-${idx}`} className='column'>
						<Card
							card={card}
							type={card.get('type')}
							accepts={acceptedDrop[type]}
							canDrag={true}
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
