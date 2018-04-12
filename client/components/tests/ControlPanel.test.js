import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import test from 'ava';
import React from 'react';

configure({ adapter: new Adapter()});

import { ControlPanel } from '../index.jsx';

test('CLIENT - ControlPanel exists', t => {
  const wrapped = shallow(<ControlPanel />);
  t.is(typeof wrapped, 'object');
});

