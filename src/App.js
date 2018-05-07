import { hot } from 'react-hot-loader';
import * as React from 'react';
import './styles/theme.sass';

import Header from './view/Header';
import LauncherDetails from './view/LauncherDetails';
import Footer from './view/Footer';

import launch from './assets/launch.json';
import launchSite from './assets/launch_site.json';
import rocket from './assets/rocket.json';

import { format, formatDistance, formatRelative, subDays } from 'date-fns';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Header username="DaftCoder" />
        <LauncherDetails
          launch={launch}
          rocket={rocket}
          launchSite={launchSite}
        />
        <Footer username="DaftCoder" />

      </main>
    );
  }
}

export default hot(module)(App);
