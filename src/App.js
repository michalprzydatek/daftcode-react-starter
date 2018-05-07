import { hot } from 'react-hot-loader';
import * as React from 'react';
import './styles/theme.sass';

import LauncherDetails from './view/LauncherDetails';
import Header from './view/Header';
import Footer from './view/Footer';

import launch from './assets/launch.json';
import launchSite from './assets/launch_site.json';
import rocket from './assets/rocket.json';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Header username="DaftCoder" />
        <LauncherDetails
          launch={launch}
          rocket={rocket}
          launchSite={launchSite}
          from={1000000}
        />
        <Footer username="DaftCoder" />

      </main>
    );
  }
}

export default hot(module)(App);
