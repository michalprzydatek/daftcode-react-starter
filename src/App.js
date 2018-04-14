import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Count from './view/Count';
//import Countdown from './view/Countdown/Countdown';

import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="DaftCoder" />
        <Count from={30} />

      </main>
    );
  }
}

export default hot(module)(App);
