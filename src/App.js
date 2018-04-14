import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Count from './view/Count';

import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="DaftCoder" />
        <Count from={30} to={10} />

      </main>
    );
  }
}

export default hot(module)(App);
