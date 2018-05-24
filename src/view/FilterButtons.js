import React from 'react';

import './FilterButtons.sass';

class FilterButtons extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
};

handleClick(value, event) {
  this.props.onChange(value);
}

render() {
    const filterButtons = this.props.options.map(option =>
      <li><a href='#' className={'filterButtons__button'} onClick={this.handleClick(option,'e')} > { option } </a> </li>
    );

    return (
      <div id={"filters"}>
          <ul>
          <li className={"active"} onClick={(x)=>{this.handleClick(' ',e)}}><a href={"#"}>All rockets</a></li>
            {filterButtons}
          </ul>
      </div>
    );
  }
}

export default FilterButtons;
