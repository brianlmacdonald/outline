'use strict';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'ava';
import React from 'react';
import configureStore from 'redux-mock-store';
const store = configureStore()

import { Login, Signup } from '../index.jsx';
configure({ adapter: new Adapter()});

test('CLIENT - User exists', t => {
  const wrapper = shallow(<Signup store={store} />).dive().exists();
  t.is(wrapper, true);
});
