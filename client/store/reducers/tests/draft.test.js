'use strict';

import test from 'ava';
import draft, {
  createNewDraftCard,
  draftSaved,
  changeBody
} from '../draft';
import { Map } from 'immutable';

const defaultTest = Map({
  id: 1,
  type: 'TEST',
});

test('REDUCER - draft exists', t => {
  t.deepEqual(typeof draft, 'function');
  const testState = draft(undefined, createNewDraftCard(defaultTest));
  t.deepEqual(testState.get('id'), 1);
  t.deepEqual(draft(testState, draftSaved()).get('id'), null);
  t.deepEqual(draft(testState, changeBody('hi')).get('body'),'hi');
});
