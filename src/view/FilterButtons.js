import React from 'react';
import PropTypes from 'prop-types';

import './FilterButtons.sass';

class FilterButtons extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
  }


  state = {
    
  };

  render() {

  const { options } = this.props;

    return (
      <div id={"filters"}>
      {this.props.options}
          <ul>
            <li className={"filter active"}><a href={"#"}>All rockets</a></li>
            <li className={"filter"}><a href={"#"}>Falcon9</a></li>
            <li className={"filter"}><a href={"#"}>Falcon Heavy</a></li>
            <li className={"filter"}><a href={"#"}>Dragon</a></li>
          </ul>
      </div>
    );
  }
}

export default FilterButtons;
