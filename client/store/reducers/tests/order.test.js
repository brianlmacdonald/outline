'use strict';
import test from 'ava';
import { List, Map, fromJS } from 'immutable';

const id1 = Map({id: 1});
const id2 = Map({id: 2});
const id3 = Map({id: 3});
const id4 = Map({id: 4});
const id5 = Map({id: 5});
const id6 = Map({id: 6});

test('ORDER - playing around with List', t => {
  const emptyList = List([]);
  const popList = List([id4, id1, id5, id2, id6, id3]);
  const sortedEmpty = emptyList.sortBy(a => a.get('id'));
  const sortedPop = popList.sortBy(a => a.get('id'));
  t.deepEqual(emptyList, sortedEmpty);
  t.deepEqual(sortedPop.get('0').get('id'), 1);
  t.deepEqual(sortedPop.get('5').get('id'), 6);
});
