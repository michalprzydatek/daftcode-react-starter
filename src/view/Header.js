import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/space_x_logo_bw_centered.png';

import './Header.sass';

class Header extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  state = {
    welcomeText: 'Hello'
  };

  render() {
    const { welcomeText } = this.state;
    const { username } = this.props;

    return (
      <div id={"header"}>
          <div className="header__btn-back">go back</div>
          <img src={logo} alt={"logo"} className={"header__logo"} /> 
      </div>
    );
  }
}

export default Header;
