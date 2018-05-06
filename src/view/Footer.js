import React from 'react';
import PropTypes from 'prop-types';

import './Footer.sass';

class Footer extends React.Component {
  static propTypes = {

  }


  render() {

    return (
      <div id={"footer"}>
        <div className={"footer__menu"}>
          <span>Follow spacex:</span>
          <ul>
            <li><a href="#" target="_blank">Twitter</a></li>
            <li><a href="#" target="_blank">Youtube</a></li>
            <li><a href="#" target="_blank">Flickr</a></li>
            <li><a href="#" target="_blank">Instagram</a></li>
          </ul>
        </div>
        <div className="company">
            2018 Space Exploration technologies corp.
          </div>
      </div>
    );
  }
}

export default Footer;
