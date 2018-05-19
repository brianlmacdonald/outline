'use strict';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './ReorderCard.jsx'
import ItemTypes from './ItemTypes'
import flow from 'lodash/flow';
import { List } from 'immutable';
import throttle from 'lodash/throttle'
import {
  CLASS_NAME_OBJ
} from '../HierarchyControl/CardTypes';

const cardTarget = {
	drop() {},
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.moveCard = throttle(this.moveCard.bind(this), 250);
		this.findCard = throttle(this.findCard.bind(this), 250);
		this.state = {
			cards: List([]),
		}
	}

	componentDidMount(){
		console.log('cdm');
		const { thumbs } = this.props;
		this.setState({
			cards: thumbs
		})
	}

	moveCard(id, atIndex) {
		const { card, index } = this.findCard(id)
		const newOrder = this.state.cards.delete(index).insert(atIndex, card);
		this.setState({
			cards: newOrder
		});
	}

	findCard(id) {
		const { cards } = this.state
		const card = cards.find(c => c.get('id') === id);
		
		return {
			card,
			index: cards.indexOf(card),
		}
	}

	render() {
		const { connectDropTarget, type, children } = this.props;
		const { cards } = this.state;
		
		return connectDropTarget(
			<div className={CLASS_NAME_OBJ[type]}>
				<div className={'container'}>
				{cards.map(card => (
					<Card
						card={card}
						key={card.get('id')}
						id={card.get('id')}
						text={card.get('body')}
						moveCard={this.moveCard}
						findCard={this.findCard}
					/>
				))}
				</div>
				<div>
					{children}
				</div>
			</div>
		)
	}
}

const ContainerTarget = DropTarget(ItemTypes.CARD, cardTarget, collect)(Container);
const ContainerContext = DragDropContext(HTML5Backend)(ContainerTarget);
export default ContainerContext;
