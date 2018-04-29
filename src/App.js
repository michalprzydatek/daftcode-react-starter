import { hot } from 'react-hot-loader';
import * as React from 'react';

import './styles/theme.sass';

import launch from './assets/launch.json';
import launchSite from './assets/launch_site.json';
import rocket from './assets/rocket.json';
import LaunchDetails from 'view/LaunchDetails';

//launch={launch}
  //      launchSite={launchSite}
    //    rocket={rocket}

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <LaunchDetails   />
      </main>
    );
  }
}
