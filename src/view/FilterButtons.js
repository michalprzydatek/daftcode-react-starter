import React from 'react';
import PropTypes from 'prop-types';

import './FilterButtons.sass';

class FilterButtons extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    allOptions: PropTypes.array,
    onChange: PropTypes.func
  };


  state = {
    
  };

  render() {
    const { options, allOptions } = this.props;
    const { onChange } = this.props;

    return (
      <div id={"filters"}>
          <ul onChange="this.props.onChange" >
            {this.props.allOptions}
            {this.props.options}
          </ul>
      </div>
    );
  }
}

export default FilterButtons;
