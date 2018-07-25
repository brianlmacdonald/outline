'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'APP/client/components/Container/Container';
import InjectContainer from 'APP/client/components/HierarchyControl/HierarchyControl';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import ThumbsContainer from 'APP/client/components/Container/ThumbsContainer';
import AddNew from 'APP/client/components/Container/AddNew';

const NavigationView = InjectContainer(Container(AddNew)(ThumbsContainer));  

const WrappedNavView = LoaderHOC('project')(NavigationView);

export default WrappedNavView;
