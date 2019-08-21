import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import GlobalStyle from '../../global-style';

import { makeSelectLocation, makeSelectFoo } from 'Redux/modules/test';

const AppWrapper = styled.div``;

const App = () => {
  // const location = useSelector(makeSelectLocation());
  // const test = useSelector(makeSelectFoo(), shallowEqual);
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - React App" defaultTitle="React App">
        <meta name="description" content="My react boilerplate" />
      </Helmet>
        {'asdsa'}
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
