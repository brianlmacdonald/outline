'use strict';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'ava';
import React from 'react';

import {UserAuth} from '../index.jsx';

configure({ adapter: new Adapter()});

test('CLIENT - User exists', t => {
  const wrapper = shallow(<UserAuth />);
  t.is(typeof wrapper, 'object');
});
