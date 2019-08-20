import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../../global-style';

const AppWrapper = styled.div`
`;

const App = () => {
  return (
  <AppWrapper>
    <Helmet
      titleTemplate="%s - React App"
      defaultTitle="React App"
    >
      <meta name="description" content="My react boilerplate" />
    </Helmet>
    {'dsad'}
    <GlobalStyle />
  </AppWrapper>);
};

export default App;
