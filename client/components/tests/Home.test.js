'use strict';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'ava';
import React from 'react';

import {Home} from '../index.jsx';

configure({ adapter: new Adapter()});

test('CLIENT - Home exists', t => {
  const wrapped = shallow(<Home />);
  t.is(typeof wrapped, 'object');
});
